import store from '../store.js';
import { drawLineChart, drawCircularGauge, drawBarGauge, drawSpeedometer } from '../components/chart.js';
import { renderSiteFooter } from '../components/footer.js';

let _resizeObserver = null;
let _revealObserver = null;
let _searchIndex = null;

const metricTooltips = {
    'Median Sold Price': 'The middle sale price of all homes sold recently.',
    'Median $/Sqft': 'Price per square foot helps compare homes of different sizes.',
    'Median Days on Market': 'How long it typically takes for a home to sell.',
    'Months of Inventory': 'How many months it would take to sell all current listings at the current pace.',
    'Sold-to-List %': 'How close the final sale price is to the asking price. Over 100% means homes sell above asking.',
    'Active Listings': 'Number of homes currently for sale.',
    'Price Drops': 'Percentage of listings that reduced their asking price.',
    'Sold Above List': 'Percentage of homes that sold for more than the asking price.',
    'Median List Price': 'The middle asking price of homes currently for sale.',
    '# of Properties': 'Total number of properties in this category.',
    'Sale-to-List %': 'How close the final sale price is to the asking price.',
    'Median Days': 'Average number of days homes stay on the market.',
    'Total Volume': 'Total dollar value of all transactions.',
    'Median Sqft': 'Typical home size in square feet.',
};

function tooltipIcon(label) {
    const tip = metricTooltips[label];
    if (!tip) return '';
    return `<span class="mt-metric-tip" data-tip="${tip}">?</span>`;
}

function getMarketData() {
    return store.get('market_trends');
}

function getLocation(slug) {
    const data = getMarketData();
    if (!data || !data.locations) return null;
    return data.locations[slug] || null;
}

function buildSearchIndex() {
    const data = getMarketData();
    if (!data || !data.locations) return [];
    return Object.entries(data.locations).map(([slug, loc]) => ({
        slug,
        name: loc.name,
        type: loc.type,
        county: loc.county || '',
        state: loc.state || '',
    }));
}

function buildBreadcrumb(slug, data) {
    const crumbs = [];
    let current = slug;
    while (current) {
        const loc = data.locations[current];
        if (!loc) break;
        crumbs.unshift({ slug: current, name: loc.name });
        current = loc.parentLocation;
    }
    return crumbs;
}

function formatPrice(val) {
    if (val >= 1000000000) return '$' + (val / 1000000000).toFixed(1) + 'B';
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + val.toLocaleString('en-US');
    return '$' + val;
}

function formatNumber(val) {
    return val.toLocaleString('en-US');
}

function changeArrow(pct, label) {
    const dir = pct >= 0 ? 'up' : 'down';
    const arrow = pct >= 0 ? '\u2191' : '\u2193';
    return `<span class="mt-metric-change ${dir}">${arrow} ${Math.abs(pct).toFixed(1)}% <span class="mt-metric-change-label">${label || 'MoM'}</span></span>`;
}

function changeArrowDual(momPct, yoyPct) {
    return `<div class="mt-metric-changes">${changeArrow(momPct, 'MoM')}${yoyPct !== undefined ? changeArrow(yoyPct, 'YoY') : ''}</div>`;
}

function changeArrowCompact(pct) {
    const dir = pct >= 0 ? 'up' : 'down';
    const arrow = pct >= 0 ? '\u2191' : '\u2193';
    return `<span class="mt-value-card-change ${dir}">${arrow} ${Math.abs(pct).toFixed(1)}% MoM</span>`;
}

function buildMarketIndicators(loc, stateData) {
    const km = loc.keyMetrics;
    const skm = stateData ? stateData.keyMetrics : null;
    const indicators = [];

    // 1. Inventory Tightness
    const msi = km.monthsOfInventory.value;
    const stateMsi = skm ? skm.monthsOfInventory.value : 5;
    let invFavor = msi < 4 ? 'seller' : msi > 6 ? 'buyer' : 'neutral';
    indicators.push({
        title: 'Inventory Tightness',
        favor: invFavor,
        metric: `${msi} months of supply`,
        desc: msi < 4
            ? `well below the balanced threshold of 5 months. Florida average is ${stateMsi}.`
            : msi > 6
                ? `above the balanced threshold of 5 months. Florida average is ${stateMsi}.`
                : `near the balanced threshold of 5 months. Florida average is ${stateMsi}.`
    });

    // 2. Price Momentum
    const yoy = km.medianSoldPrice.yoyPct;
    const stateYoy = skm ? skm.medianSoldPrice.yoyPct : 0;
    let priceFavor = yoy > 3 ? 'seller' : yoy < -1 ? 'buyer' : 'neutral';
    indicators.push({
        title: 'Price Momentum',
        favor: priceFavor,
        metric: `Prices ${yoy >= 0 ? 'up' : 'down'} ${Math.abs(yoy)}% year-over-year`,
        desc: `vs. ${stateYoy >= 0 ? '+' : ''}${stateYoy}% statewide.`
    });

    // 3. Seller Leverage (Sale-to-List)
    const stl = km.soldToListPct.value;
    const stateStl = skm ? skm.soldToListPct.value : 96;
    let stlFavor = stl >= 99 ? 'seller' : stl < 96 ? 'buyer' : 'neutral';
    const stlGap = (100 - stl).toFixed(1);
    indicators.push({
        title: 'Seller Leverage',
        favor: stlFavor,
        metric: `Homes selling at ${stl}% of asking`,
        desc: stl >= 100
            ? `sellers getting above asking price. Florida average is ${stateStl}%.`
            : `buyers are negotiating ${stlGap}% below list. Florida average is ${stateStl}%.`
    });

    // 4. Bidding Activity (Sold Above List)
    if (km.soldAboveListPct) {
        const sal = km.soldAboveListPct.value;
        const stateSal = skm?.soldAboveListPct ? skm.soldAboveListPct.value : 20;
        let salFavor = sal > 25 ? 'seller' : sal < 15 ? 'buyer' : 'neutral';
        indicators.push({
            title: 'Bidding Activity',
            favor: salFavor,
            metric: `${sal}% of homes selling above list price`,
            desc: sal > stateSal
                ? `${(sal - stateSal).toFixed(1)}% above the Florida average of ${stateSal}%.`
                : `${(stateSal - sal).toFixed(1)}% below the Florida average of ${stateSal}%.`
        });
    }

    // 5. Sale Speed (DOM)
    const dom = km.medianDaysOnMarket.value;
    const stateDom = skm ? skm.medianDaysOnMarket.value : 42;
    let domFavor = dom < 30 ? 'seller' : dom > 50 ? 'buyer' : 'neutral';
    indicators.push({
        title: 'Sale Speed',
        favor: domFavor,
        metric: `${dom} median days on market`,
        desc: dom < stateDom
            ? `${stateDom - dom} days faster than the Florida average.`
            : dom > stateDom
                ? `${dom - stateDom} days slower than the Florida average.`
                : `matching the Florida average.`
    });

    // 6. Price Stability (Price Drops)
    if (km.priceDropPct) {
        const pd = km.priceDropPct.value;
        const statePd = skm?.priceDropPct ? skm.priceDropPct.value : 18;
        let pdFavor = pd < 15 ? 'seller' : pd > 25 ? 'buyer' : 'neutral';
        indicators.push({
            title: 'Price Stability',
            favor: pdFavor,
            metric: `${pd}% of listings have dropped their price`,
            desc: pd > 20
                ? `accurate initial pricing is critical in this market.`
                : `relatively few price reductions indicate strong demand.`
        });
    }

    // 7. Price Per Square Foot
    if (km.medianPricePerSqft) {
        const ppsf = km.medianPricePerSqft.value;
        const ppsfYoy = km.medianPricePerSqft.yoyPct;
        const statePpsf = skm?.medianPricePerSqft ? skm.medianPricePerSqft.value : 255;
        let ppsfFavor = ppsfYoy > 3 ? 'seller' : ppsfYoy < -1 ? 'buyer' : 'neutral';
        indicators.push({
            title: 'Value Density',
            favor: ppsfFavor,
            metric: `$${ppsf} median price per square foot`,
            desc: ppsf > statePpsf
                ? `${Math.round(((ppsf - statePpsf) / statePpsf) * 100)}% above the Florida average of $${statePpsf}.`
                : `${Math.round(((statePpsf - ppsf) / statePpsf) * 100)}% below the Florida average of $${statePpsf}.`
        });
    }

    // 8. Absorption Rate
    const sec = loc.sections;
    const newCount = sec.newListings.numProperties.value;
    const closedCount = sec.closedListings.numProperties.value;
    const absorptionRate = closedCount / newCount;
    const stateNew = stateData ? stateData.sections.newListings.numProperties.value : newCount;
    const stateClosed = stateData ? stateData.sections.closedListings.numProperties.value : closedCount;
    const stateAbsorption = stateClosed / stateNew;
    let absFavor = absorptionRate > 0.85 ? 'seller' : absorptionRate < 0.6 ? 'buyer' : 'neutral';
    indicators.push({
        title: 'Absorption Rate',
        favor: absFavor,
        metric: `${(absorptionRate * 100).toFixed(0)}% of new listings are being sold`,
        desc: absorptionRate > stateAbsorption
            ? `outpacing the Florida average of ${(stateAbsorption * 100).toFixed(0)}%. Demand is absorbing supply quickly.`
            : `below the Florida average of ${(stateAbsorption * 100).toFixed(0)}%. Inventory is accumulating.`
    });

    // 9. New Supply
    const newMom = sec.newListings.numProperties.momPct;
    const stateNewMom = stateData ? stateData.sections.newListings.numProperties.momPct : 0;
    let supplyFavor = newMom < -3 ? 'seller' : newMom > 5 ? 'buyer' : 'neutral';
    indicators.push({
        title: 'New Supply',
        favor: supplyFavor,
        metric: `New listings ${newMom >= 0 ? 'up' : 'down'} ${Math.abs(newMom)}% month-over-month`,
        desc: newMom < 0
            ? `fewer sellers entering the market, tightening supply. Florida average is ${stateNewMom >= 0 ? '+' : ''}${stateNewMom}%.`
            : `more sellers entering the market, increasing options for buyers. Florida average is ${stateNewMom >= 0 ? '+' : ''}${stateNewMom}%.`
    });

    const favorLabel = { seller: 'Favors sellers', buyer: 'Favors buyers', neutral: 'Neutral' };
    const favorClass = { seller: 'mt-indicator-seller', buyer: 'mt-indicator-buyer', neutral: 'mt-indicator-neutral' };

    return `
        <div class="mt-section mt-dot-pattern mt-dot-full mt-reveal">
            <div class="mt-section-header">
                <div class="mt-section-title">Market Signals</div>
                <div class="mt-section-subtitle">${loc.name} vs. Florida</div>
            </div>
            <div class="mt-indicators">
                ${indicators.map(ind => `
                    <div class="mt-indicator">
                        <div class="mt-indicator-header">
                            <div class="mt-indicator-title">${ind.title}</div>
                            <span class="mt-indicator-badge ${favorClass[ind.favor]}">${favorLabel[ind.favor]}</span>
                        </div>
                        <div class="mt-indicator-metric">${ind.metric}</div>
                        <div class="mt-indicator-desc">${ind.desc}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getHeroDescription(loc, lastUpdated) {
    const name = loc.name;
    const km = loc.keyMetrics;
    const type = loc.marketScore.type;
    const locType = loc.type;
    const county = loc.county || '';
    const price = formatPrice(km.medianSoldPrice.value);
    const dom = km.medianDaysOnMarket.value;
    const inv = km.monthsOfInventory.value;
    const sqft = km.medianPricePerSqft ? '$' + km.medianPricePerSqft.value : '';
    const stl = km.soldToListPct.value;
    const yoy = km.medianSoldPrice.yoyPct;

    const trend = yoy > 0 ? `up ${yoy}% year-over-year` : yoy < 0 ? `down ${Math.abs(yoy)}% year-over-year` : 'flat year-over-year';
    const condition = type === 'seller' ? 'a competitive seller\'s market where homes sell quickly' : type === 'buyer' ? 'a buyer\'s market with more negotiating room for purchasers' : 'a balanced market with fair conditions for both buyers and sellers';

    let location = name;
    if (locType === 'city' && county) location = `${name}, ${county} County`;
    else if (locType === 'county') location = `${name}, Florida`;

    let para1 = `As of ${lastUpdated}, the ${location} housing market is ${condition}. `;
    para1 += `The median home sold price in ${name} is ${price}, ${trend}. `;
    para1 += `Homes are selling in a median of ${dom} days and the sale-to-list price ratio is ${stl}%.`;

    const activeCount = loc.sections.activeListings.numProperties.value;
    let para2 = `${name} currently has ${formatNumber(activeCount)} active listings and ${inv} months of supply of inventory. `;
    if (sqft) para2 += `The median price per square foot is ${sqft}. `;
    if (km.priceDropPct) para2 += `About ${km.priceDropPct.value}% of listings have had a price reduction. `;
    if (km.soldAboveListPct) para2 += `${km.soldAboveListPct.value}% of homes sold above list price, `;
    para2 += `indicating ${type === 'seller' ? 'strong demand from buyers' : type === 'buyer' ? 'buyers have room to negotiate' : 'healthy market activity'}.`;

    let para3 = '';
    if (locType === 'city') {
        para3 = `Whether you are buying or selling a home in ${name}, FL, Beycome helps you save thousands by selling your home by yourself with a flat fee MLS listing. `;
        para3 += `Skip the traditional ${price > 500000 ? '6%' : '5-6%'} agent commission and keep more of your equity.`;
    } else if (locType === 'county') {
        para3 = `Explore individual cities within ${name} to find neighborhood-level market data. Beycome provides free market insights for every city in ${name} to help you make informed real estate decisions.`;
    } else {
        para3 = `Beycome tracks real estate market trends across all Florida counties and cities. Explore county-level data below to understand local market conditions and find opportunities to save on your next real estate transaction.`;
    }

    return `<p>${para1}</p><p>${para2}</p><p>${para3}</p>`;
}


function buildBuyOrSellInsight(loc, stateData) {
    const name = loc.name;
    const km = loc.keyMetrics;
    const type = loc.marketScore.type;
    const skm = stateData ? stateData.keyMetrics : null;
    const msi = km.monthsOfInventory.value;
    const dom = km.medianDaysOnMarket.value;
    const stl = km.soldToListPct.value;
    const yoy = km.medianSoldPrice.yoyPct;
    const price = formatPrice(km.medianSoldPrice.value);
    const stateDom = skm ? skm.medianDaysOnMarket.value : 42;

    let intro = '';
    if (type === 'seller') {
        intro = `The ${name} housing market currently favors sellers. With just ${msi} months of inventory and homes selling in a median of ${dom} days, demand is outpacing supply. If you own a home in ${name}, this is a strong market to consider selling.`;
    } else if (type === 'buyer') {
        intro = `The ${name} housing market currently offers advantages for buyers. With ${msi} months of inventory and homes sitting on the market for a median of ${dom} days, buyers have more choices and negotiating power than in previous months.`;
    } else {
        intro = `The ${name} housing market is currently balanced, with fair conditions for both buyers and sellers. With ${msi} months of inventory and a median of ${dom} days on market, neither side holds a strong advantage.`;
    }

    const buyerPoints = [];
    if (yoy > 3) {
        buyerPoints.push(`Home prices are up ${yoy}% year-over-year. Acting sooner rather than later could help you avoid further price increases.`);
    } else if (yoy < -1) {
        buyerPoints.push(`Home prices are down ${Math.abs(yoy)}% year-over-year, which means more value for your money compared to last year.`);
    } else {
        buyerPoints.push(`Home prices have remained relatively stable year-over-year, giving you time to find the right home without pressure from rapid price changes.`);
    }
    if (msi < 4) {
        buyerPoints.push(`With only ${msi} months of inventory, options are limited. Be ready to move quickly when you find a home you like.`);
    } else if (msi > 6) {
        buyerPoints.push(`With ${msi} months of inventory, there are plenty of homes to choose from. Take your time to find the right fit.`);
    } else {
        buyerPoints.push(`Inventory levels are moderate at ${msi} months of supply, giving you a reasonable selection of homes.`);
    }
    if (stl < 97) {
        buyerPoints.push(`Buyers are negotiating ${(100 - stl).toFixed(1)}% below asking price on average. There is room to negotiate a better deal.`);
    } else if (stl >= 100) {
        buyerPoints.push(`Homes are selling at or above asking price. Be prepared to make competitive offers, especially on desirable properties.`);
    } else {
        buyerPoints.push(`Homes are selling at ${stl}% of asking price, leaving a small window for negotiation.`);
    }
    if (km.soldAboveListPct && km.soldAboveListPct.value > 20) {
        buyerPoints.push(`${km.soldAboveListPct.value}% of homes sell above list price, so consider offering at or above asking on homes you love.`);
    }

    const sellerPoints = [];
    if (yoy > 0) {
        sellerPoints.push(`Home values are trending upward at ${yoy}% year-over-year. Your home is likely worth more than it was a year ago.`);
    } else if (yoy < 0) {
        sellerPoints.push(`Prices are down ${Math.abs(yoy)}% from last year. Pricing your home competitively from day one is essential.`);
    } else {
        sellerPoints.push(`Prices are holding steady year-over-year. A well-priced home will attract buyer interest.`);
    }
    if (dom < stateDom) {
        sellerPoints.push(`Homes in ${name} sell in ${dom} days, which is ${stateDom - dom} days faster than the Florida average. Well-priced homes move quickly here.`);
    } else {
        sellerPoints.push(`Homes take a median of ${dom} days to sell. Competitive pricing and good presentation will help your home sell faster.`);
    }
    if (km.priceDropPct) {
        if (km.priceDropPct.value > 20) {
            sellerPoints.push(`${km.priceDropPct.value}% of listings have had a price reduction. Price your home right from the start to avoid sitting on the market.`);
        } else {
            sellerPoints.push(`Only ${km.priceDropPct.value}% of listings have reduced their price, showing that sellers who price accurately are finding buyers.`);
        }
    }
    sellerPoints.push(`With Beycome, you can list your ${name} home on the MLS for a flat fee and skip the traditional 5-6% agent commission, keeping more of your ${price} sale.`);

    return `
        <div class="mt-section mt-reveal">
            <div class="mt-section-header">
                <h2 class="mt-section-title">Is it a good time to buy or sell in ${name}?</h2>
            </div>
            <div class="mt-insight">
                <p>${intro}</p>
                <div class="mt-insight-columns">
                    <div class="mt-insight-column">
                        <h3 class="mt-insight-heading mt-insight-heading--buyer">What this means for buyers</h3>
                        <ul class="mt-insight-list">
                            ${buyerPoints.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="mt-insight-column">
                        <h3 class="mt-insight-heading mt-insight-heading--seller">What this means for sellers</h3>
                        <ul class="mt-insight-list">
                            ${sellerPoints.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function buildPriceTrendsInsight(loc, stateData) {
    const name = loc.name;
    const km = loc.keyMetrics;
    const ev = loc.medianEstimatedValue;
    const skm = stateData ? stateData.keyMetrics : null;
    const price = km.medianSoldPrice.value;
    const yoy = km.medianSoldPrice.yoyPct;
    const mom = km.medianSoldPrice.momPct;
    const isState = loc.type === 'state';

    let para1 = `The median sold price in ${name} is ${formatPrice(price)}, `;
    if (yoy > 0) {
        para1 += `up ${yoy}% compared to last year`;
    } else if (yoy < 0) {
        para1 += `down ${Math.abs(yoy)}% compared to last year`;
    } else {
        para1 += `unchanged from last year`;
    }
    para1 += ` and ${mom >= 0 ? 'up' : 'down'} ${Math.abs(mom)}% from last month. `;
    if (yoy > 5) {
        para1 += `This strong upward trend reflects growing demand and rising property values in the area.`;
    } else if (yoy > 0) {
        para1 += `This steady appreciation indicates a healthy market with consistent buyer interest.`;
    } else if (yoy > -2) {
        para1 += `Prices have been relatively stable, which is typical of a market finding its equilibrium.`;
    } else {
        para1 += `This price adjustment may create opportunities for buyers looking to enter the ${name} market at a lower price point.`;
    }

    let para2 = '';
    if (km.medianPricePerSqft) {
        const ppsf = km.medianPricePerSqft.value;
        const statePpsf = skm?.medianPricePerSqft ? skm.medianPricePerSqft.value : 255;
        para2 = `The median price per square foot in ${name} is $${ppsf}`;
        if (!isState) {
            const diff = Math.round(((ppsf - statePpsf) / statePpsf) * 100);
            para2 += `, which is ${Math.abs(diff)}% ${diff >= 0 ? 'above' : 'below'} the Florida average of $${statePpsf}`;
        }
        para2 += '. ';
        para2 += `Price per square foot is a useful way to compare home values across different sizes and styles, helping you gauge whether a listing is priced fairly for the area.`;
    }

    let para3 = `The median estimated home value in ${name} is ${formatPrice(ev.value)}, `;
    para3 += `${ev.yoyPct >= 0 ? 'up' : 'down'} ${Math.abs(ev.yoyPct)}% over the past year. `;
    if (!isState && skm) {
        const stateYoy = skm.medianSoldPrice.yoyPct;
        if (yoy > stateYoy) {
            para3 += `${name} home prices are growing faster than the Florida average of ${stateYoy >= 0 ? '+' : ''}${stateYoy}%, suggesting stronger local demand.`;
        } else if (yoy < stateYoy) {
            para3 += `Price growth in ${name} trails the Florida average of ${stateYoy >= 0 ? '+' : ''}${stateYoy}%, which may reflect cooling demand or more inventory.`;
        } else {
            para3 += `Price trends in ${name} are tracking closely with statewide patterns.`;
        }
    }

    return `
        <div class="mt-section mt-reveal">
            <div class="mt-section-header">
                <h2 class="mt-section-title">Home price trends in ${name}</h2>
            </div>
            <div class="mt-insight">
                <p>${para1}</p>
                ${para2 ? `<p>${para2}</p>` : ''}
                <p>${para3}</p>
            </div>
        </div>
    `;
}


function buildSaleSpeedInsight(loc, stateData) {
    const name = loc.name;
    const km = loc.keyMetrics;
    const skm = stateData ? stateData.keyMetrics : null;
    const dom = km.medianDaysOnMarket.value;
    const domYoy = km.medianDaysOnMarket.yoyPct;
    const stl = km.soldToListPct.value;
    const stateDom = skm ? skm.medianDaysOnMarket.value : 42;
    const stateStl = skm ? skm.soldToListPct.value : 96;
    const type = loc.marketScore.type;
    const isState = loc.type === 'state';

    let para1 = `Homes in ${name} are selling in a median of ${dom} days`;
    if (!isState) {
        const diff = Math.abs(dom - stateDom);
        para1 += `, which is ${diff} days ${dom < stateDom ? 'faster' : dom > stateDom ? 'slower' : 'equal to'} than the Florida average of ${stateDom} days`;
    }
    para1 += '. ';
    if (domYoy < -5) {
        para1 += `The market is speeding up: homes are selling ${Math.abs(domYoy)}% faster than a year ago. Buyers should have their financing in order and be ready to make offers quickly.`;
    } else if (domYoy > 5) {
        para1 += `Homes are taking longer to sell compared to last year, giving buyers more time to evaluate their options and make informed decisions.`;
    } else {
        para1 += `The pace of sales has remained consistent over the past year, reflecting a steady level of buyer activity in ${name}.`;
    }

    let para2 = `On average, homes in ${name} sell at ${stl}% of their listing price. `;
    if (stl >= 100) {
        para2 += `This means homes are regularly selling at or above asking price, a clear sign of strong buyer competition. Sellers can feel confident in their pricing, while buyers should be prepared for bidding situations.`;
    } else if (stl >= 97) {
        const gap = (100 - stl).toFixed(1);
        para2 += `Sellers are receiving very close to their asking price, with just a ${gap}% average discount. This indicates buyers have limited room for negotiation in most transactions.`;
    } else {
        const gap = (100 - stl).toFixed(1);
        para2 += `Buyers are negotiating an average of ${gap}% below the asking price. This means there is meaningful room to negotiate, especially on homes that have been on the market for a while.`;
    }

    let para3 = '';
    if (type === 'seller') {
        para3 = `In this fast-paced ${name} market, buyers should get pre-approved for a mortgage and work with a clear budget so they can act quickly. Sellers are in a strong position, but proper pricing remains important to attract the most offers. With Beycome, sellers can list on the MLS and reach every buyer without paying a traditional listing commission.`;
    } else if (type === 'buyer') {
        para3 = `The current pace gives buyers in ${name} the advantage of time. You can compare multiple properties, request inspections, and negotiate terms without the pressure of a fast-moving market. Sellers should focus on competitive pricing and curb appeal to stand out. Beycome's flat-fee listing model helps sellers maximize their net proceeds even in a softer market.`;
    } else {
        para3 = `With balanced conditions in ${name}, both buyers and sellers can approach transactions with confidence. Buyers have enough time to do their due diligence, and sellers with well-priced homes are finding willing buyers. Selling with Beycome's flat fee means keeping more of your equity regardless of market conditions.`;
    }

    return `
        <div class="mt-section mt-reveal">
            <div class="mt-section-header">
                <h2 class="mt-section-title">How fast are homes selling in ${name}?</h2>
            </div>
            <div class="mt-insight">
                <p>${para1}</p>
                <p>${para2}</p>
                <p>${para3}</p>
            </div>
        </div>
    `;
}


function buildSupplyDemandInsight(loc, stateData) {
    const name = loc.name;
    const km = loc.keyMetrics;
    const sec = loc.sections;
    const skm = stateData ? stateData.keyMetrics : null;
    const msi = km.monthsOfInventory.value;
    const stateMsi = skm ? skm.monthsOfInventory.value : 5;
    const newCount = sec.newListings.numProperties.value;
    const closedCount = sec.closedListings.numProperties.value;
    const activeCount = sec.activeListings.numProperties.value;
    const newMom = sec.newListings.numProperties.momPct;
    const isState = loc.type === 'state';

    let para1 = `Last month, ${name} saw ${formatNumber(newCount)} new listings enter the market while ${formatNumber(closedCount)} homes closed. `;
    if (closedCount > newCount) {
        para1 += `More homes are selling than coming on the market, which means inventory is shrinking. This puts upward pressure on home prices and creates more competition among buyers.`;
    } else if (closedCount < newCount) {
        para1 += `New listings are outpacing sales, which means the inventory of available homes is growing. This is good news for buyers, as it provides more options and potentially more room to negotiate.`;
    } else {
        para1 += `New listings and closed sales are roughly in balance, which helps maintain stable inventory levels and pricing.`;
    }

    let para2 = `There are currently ${formatNumber(activeCount)} active listings in ${name}, representing ${msi} months of supply. `;
    const absorptionRate = newCount > 0 ? Math.round((closedCount / newCount) * 100) : 0;
    para2 += `About ${absorptionRate}% of new listings are being absorbed by buyers each month. `;
    if (msi < 4) {
        para2 += `Under 4 months of supply is generally considered a seller's market, and ${name} fits that description. `;
    } else if (msi > 6) {
        para2 += `Over 6 months of supply generally indicates a buyer's market, meaning buyers in ${name} have leverage. `;
    } else {
        para2 += `Between 4 and 6 months of supply is considered a balanced market, where neither buyers nor sellers have a clear advantage. `;
    }
    if (!isState) {
        para2 += `The Florida average is ${stateMsi} months.`;
    }

    let para3 = '';
    if (km.priceDropPct) {
        const pd = km.priceDropPct.value;
        if (pd > 20) {
            para3 = `Currently, ${pd}% of active listings in ${name} have reduced their price. This relatively high rate suggests some sellers are adjusting expectations to match buyer demand. If you are selling, pricing your home accurately from the start is the best way to attract offers and avoid sitting on the market. `;
        } else {
            para3 = `Only ${pd}% of listings in ${name} have had a price reduction, which shows that most sellers are pricing their homes in line with what buyers are willing to pay. `;
        }
    }
    para3 += `Whether you are buying or selling in ${name}, understanding supply and demand helps you make better decisions. Beycome's flat-fee listing model lets sellers save thousands while still reaching every buyer on the MLS.`;

    return `
        <div class="mt-section mt-reveal">
            <div class="mt-section-header">
                <h2 class="mt-section-title">Housing supply and demand in ${name}</h2>
            </div>
            <div class="mt-insight">
                <p>${para1}</p>
                <p>${para2}</p>
                <p>${para3}</p>
            </div>
            <div class="mt-section-title" style="margin-top: 32px; margin-bottom: 16px;">Months supply of inventory</div>
            <div id="mt-msi-gauge"></div>
            <p style="font-size:14px; color:var(--c-primary); margin-top:12px; line-height:1.7;">
                Under 4 months typically indicates a seller's market, 4-6 months a balanced market, and over 6 months a buyer's market.
            </p>
        </div>
    `;
}


function renderTabMetrics(section) {
    const metrics = [];
    if (section.medianListPrice) metrics.push({ label: 'Median List Price', value: formatPrice(section.medianListPrice.value), pct: section.medianListPrice.momPct });
    if (section.medianSoldPrice) metrics.push({ label: 'Median Sold Price', value: formatPrice(section.medianSoldPrice.value), pct: section.medianSoldPrice.momPct });
    if (section.numProperties) metrics.push({ label: '# of Properties', value: formatNumber(section.numProperties.value), pct: section.numProperties.momPct });
    if (section.saleToListPct) metrics.push({ label: 'Sale-to-List %', value: section.saleToListPct.value + '%', pct: section.saleToListPct.momPct });
    if (section.medianDays) metrics.push({ label: 'Median Days', value: section.medianDays.value, pct: section.medianDays.momPct });
    if (section.medianPricePerSqft) metrics.push({ label: 'Median $/Sqft', value: '$' + formatNumber(section.medianPricePerSqft.value), pct: section.medianPricePerSqft.momPct });
    if (section.totalVolume) metrics.push({ label: 'Total Volume', value: formatPrice(section.totalVolume.value), pct: section.totalVolume.momPct });
    if (section.medianLivingArea) metrics.push({ label: 'Median Sqft', value: formatNumber(section.medianLivingArea.value), pct: section.medianLivingArea.momPct });

    return metrics.map(m => `
        <div class="mt-metric-card">
            <div class="mt-metric-label">${m.label} ${tooltipIcon(m.label)}</div>
            <div class="mt-metric-value">${m.value}</div>
            ${changeArrow(m.pct)}
        </div>
    `).join('');
}

export function render(slug) {
    const data = getMarketData();
    if (!data) return '<div class="mt-page active"><div class="mt-content"><p>No market data available.</p></div></div>';

    const locationSlug = slug || 'florida';
    const loc = getLocation(locationSlug);
    if (!loc) return '<div class="mt-page active"><div class="mt-content"><p>Location not found.</p></div></div>';

    const crumbs = buildBreadcrumb(locationSlug, data);
    const luDate = new Date(data.lastUpdated);
    const lastUpdated = luDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    const km = loc.keyMetrics;
    const sec = loc.sections;
    const ev = loc.medianEstimatedValue;
    const ms = loc.monthsSupply;
    const medianPrice = km.medianSoldPrice.value;
    const stateData = data.locations['florida'];

    const breadcrumbHtml = crumbs.map((c, i) =>
        i < crumbs.length - 1
            ? `<a data-mt-nav="${c.slug}">${c.name}</a><span class="mt-breadcrumb-sep">&rsaquo;</span>`
            : `<span>${c.name}</span>`
    ).join('');

    // Tab sections
    const tabDefs = [
        { id: 'new', label: 'New Listings', key: 'newListings' },
        { id: 'active', label: 'Active', key: 'activeListings' },
        { id: 'pending', label: 'Pending', key: 'pendingListings' },
        { id: 'closed', label: 'Closed', key: 'closedListings' },
        { id: 'sold', label: 'Sold Records', key: 'soldPublicRecords' }
    ];

    const tabsHtml = tabDefs.map((t, i) =>
        `<button class="mt-tab${i === 0 ? ' active' : ''}" data-mt-tab="${t.id}">${t.label}</button>`
    ).join('');

    const tabContentsHtml = tabDefs.map((t, i) => {
        const section = loc.sections[t.key];
        if (!section) return `<div class="mt-tab-content${i === 0 ? ' active' : ''}" data-mt-tab-content="${t.id}"><p>No data available.</p></div>`;
        return `<div class="mt-tab-content${i === 0 ? ' active' : ''}" data-mt-tab-content="${t.id}">
            <div class="mt-tab-metrics">${renderTabMetrics(section)}</div>
        </div>`;
    }).join('');

    // Neighborhoods
    const neighborhoodsHtml = (loc.neighborhoods || []).map(n => `
        <a class="mt-neighborhood-card" data-mt-nav="${n.slug}">
            <div class="mt-neighborhood-name">${n.name}</div>
            <span class="mt-neighborhood-type">${n.type}</span>
            <div class="mt-neighborhood-stats">
                <div>Median Price: <strong>${formatPrice(n.medianPrice)}</strong></div>
                <div>Days on Market: <strong>${n.dom}</strong></div>
                <div>Inventory: <strong>${n.inventory} months</strong></div>
            </div>
        </a>
    `).join('');

    // FAQ
    const faqs = [
        { q: 'What does Months of Supply of Inventory mean?', a: 'Months of Supply of Inventory (MSI) measures how long it would take to sell all current listings at the current pace of sales. Under 4 months typically indicates a seller\'s market, 4-6 months a balanced market, and over 6 months a buyer\'s market.' },
        { q: 'What is the Sale-to-List Price Ratio?', a: 'The Sale-to-List Price Ratio compares the final sale price to the original listing price. A ratio above 100% means homes are selling above asking price, while below 100% means buyers are negotiating below asking. This metric helps gauge market competitiveness.' },
        { q: 'How is the Beycome Market Score calculated?', a: 'The Beycome Market Score combines multiple market indicators including months of inventory, sale-to-list ratio, median days on market, and price trends. A score of 0-33 indicates a buyer\'s market, 34-66 a balanced market, and 67-100 a seller\'s market.' },
        { q: 'What is the difference between Median List Price and Median Sold Price?', a: 'Median List Price is the middle point of all asking prices for properties currently listed. Median Sold Price is the middle point of actual sale prices for recently closed transactions. The gap between them indicates how much negotiation is happening in the market.' },
        { q: 'How often is the market data updated?', a: 'Our market data is updated monthly using the latest available data from multiple sources including MLS listings, public records, and market analytics. The "Last Updated" date at the top of the page indicates when the most recent data refresh occurred.' },
        { q: 'How can I save money when selling my home?', a: 'With Beycome, you can sell your home yourself and save thousands in commission fees. Traditional agents typically charge 5-6% of the sale price. Beycome\'s flat-fee model lets you keep more of your equity while still getting full MLS exposure and professional support.' }
    ];

    const faqsHtml = faqs.map(f => `
        <div class="mt-faq-item">
            <button class="mt-faq-question">
                <span>${f.q}</span>
                <svg class="mt-faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="mt-faq-answer">${f.a}</div>
        </div>
    `).join('');

    return `
    <div class="mt-page active">
        <!-- Header -->
        <div class="mt-header">
            <div class="mt-header-inner">
                <div class="mt-header-left">
                    <a href="#">Sell</a>
                    <a href="#">Buy</a>
                    <a href="#">Title services</a>
                </div>
                <div class="mt-header-center">
                    <a class="mt-logo" href="#/offers"><svg width="141" height="27" viewBox="0 0 141 27" fill="none" xmlns="http://www.w3.org/2000/svg" title="beycome.com"><path d="M55.5,9.8c-.4-.89-.98-1.69-1.7-2.33-.72-.64-1.57-1.12-2.49-1.4-.92-.28-1.89-.35-2.84-.21-.95.14-1.86.48-2.67,1.01-1,.64-1.84,1.52-2.45,2.55-.61,1.04-.97,2.2-1.05,3.41-.14,1.09-.05,2.2.25,3.26.3,1.06.82,2.04,1.51,2.88.63.78,1.42,1.41,2.3,1.86.89.45,1.86.7,2.84.74.99.04,1.97-.13,2.89-.51.92-.38,1.75-.95,2.44-1.67.7-.74,1.21-1.65,1.47-2.64h-3.41c-.06,0-.11.02-.16.05-.05.03-.09.08-.12.13-.28.39-.64.7-1.05.93-.41.23-.87.36-1.34.38-.85.13-1.73-.05-2.46-.51-.74-.46-1.29-1.17-1.57-2.01-.13-.41-.13-.41.28-.41h9.76c.23,0,.32-.04.35-.29.24-1.79-.04-3.6-.8-5.23h0ZM45.71,12.15c.16-.93.66-1.76,1.41-2.32.75-.56,1.68-.8,2.59-.67.83-.03,1.64.26,2.28.81.63.55,1.04,1.33,1.13,2.17h-7.41Z" fill="#070707"/><path d="M106.82,7.54c.58-.81,1.44-1.37,2.4-1.59,1.98-.38,3.78.02,4.92,1.93.12.2.17.23.32.02.58-.79,1.37-1.4,2.27-1.75.9-.36,1.88-.45,2.84-.26,2.75.33,3.98,2.2,4.38,4.58.11.72.16,1.45.15,2.18,0,2.77,0,5.53,0,8.29,0,.28-.06.36-.34.35-.86-.02-1.71-.02-2.57,0-.27,0-.35-.06-.35-.34.01-2.6.01-5.22,0-7.83.01-.76-.07-1.53-.26-2.27-.06-.28-.18-.55-.35-.79s-.38-.44-.62-.6c-.24-.15-.51-.26-.79-.31-.28-.05-.57-.04-.85.03-1.31.16-1.95.91-2.21,2.39-.12.82-.18,1.64-.17,2.46,0,2.31,0,4.62,0,6.93,0,.28-.07.34-.33.33-.86-.02-1.72-.02-2.57,0-.3,0-.39-.05-.39-.38.02-2.78,0-5.55,0-8.33,0-.55-.07-1.1-.22-1.63-.06-.3-.18-.58-.35-.83-.17-.25-.38-.47-.63-.63-.25-.17-.53-.28-.82-.33-.29-.05-.59-.05-.89.02-1.33.14-1.97.91-2.17,2.43-.1.77-.15,1.55-.15,2.32,0,2.33,0,4.67,0,7,0,.27-.05.37-.34.36-.89-.02-1.79-.02-2.68,0-.22,0-.27-.06-.27-.28,0-4.86,0-9.72,0-14.58,0-.24.07-.3.31-.3.81.01,1.62.01,2.43,0,.22,0,.29.05.28.28-.02.34,0,.69,0,1.13" fill="#070707"/><path d="M100.48,8.86c-.93-1.4-2.32-2.4-3.92-2.83-1.6-.43-3.3-.25-4.78.5-1.17.58-2.16,1.46-2.89,2.55-.73,1.1-1.16,2.37-1.25,3.69-.15,1.16-.05,2.34.29,3.45.35,1.11.93,2.14,1.7,3,.99,1.16,2.32,1.94,3.79,2.24,1.47.3,3,.09,4.34-.59,1.19-.57,2.21-1.46,2.94-2.57.74-1.11,1.16-2.41,1.24-3.75.16-2.01-.36-4.02-1.48-5.69h0ZM97.39,17.08c-.33.37-.73.67-1.18.87-.45.2-.93.31-1.42.31-.49,0-.98-.1-1.43-.3-.45-.2-.85-.5-1.19-.86-.83-.91-1.29-2.1-1.31-3.34-.01-1.24.43-2.44,1.23-3.37.36-.42.8-.74,1.3-.96.5-.21,1.04-.31,1.58-.28.54.03,1.07.19,1.54.45.47.27.88.64,1.19,1.1.67.94,1.01,2.09.95,3.25-.06,1.16-.51,2.27-1.27,3.13" fill="#070707"/><path d="M85.96,16.25c-.96,2.73-2.58,4.72-5.48,5.21-1.34.27-2.73.12-3.99-.42-1.26-.54-2.33-1.46-3.07-2.64-1.13-1.64-1.62-3.65-1.37-5.64.08-1.08.38-2.13.89-3.09.51-.95,1.2-1.79,2.05-2.45.83-.64,1.78-1.07,2.79-1.28,1.01-.21,2.06-.19,3.06.07,1,.26,1.94.74,2.73,1.41.8.67,1.44,1.52,1.87,2.48.2.42.37.87.5,1.32h-3.51c-.05,0-.1,0-.15-.03-.04-.03-.08-.07-.1-.12-.29-.65-.77-1.19-1.38-1.54-.61-.34-1.32-.48-2.01-.37-.76.04-1.48.32-2.07.82-.58.49-1,1.17-1.17,1.92-.29.83-.37,1.71-.24,2.58.14.87.49,1.68,1.02,2.37.34.46.79.83,1.3,1.07.51.24,1.08.36,1.64.33.56-.03,1.11-.2,1.6-.5.49-.3.89-.71,1.19-1.2.06-.11.14-.19.25-.25.1-.06.22-.08.34-.06,1.08.01,2.16,0,3.3,0" fill="#070707"/><path d="M57.27,6.13c1.19,0,2.35,0,3.5,0,.23,0,.26.12.31.29.92,3.02,1.84,6.04,2.76,9.06.04.12.03.27.17.36.55-1.66,1.1-3.31,1.65-4.95.5-1.5.99-3,1.49-4.49.04-.13.05-.26.26-.26,1.17.01,2.35,0,3.52,0,.06.14-.03.24-.07.35-2.51,6.51-5.02,13.01-7.53,19.52-.03.11-.09.2-.18.26s-.2.08-.3.07c-1.03-.02-2.07,0-3.11,0-.01-.1.01-.21.07-.29.77-1.97,1.53-3.93,2.31-5.9.04-.09.06-.19.06-.29,0-.1-.02-.2-.05-.29-1.59-4.37-3.17-8.74-4.74-13.12-.03-.09-.06-.18-.09-.3" fill="#070707"/><path d="M139.38,9.77c-.44-.97-1.1-1.82-1.92-2.49-.82-.66-1.78-1.12-2.81-1.34-1.03-.22-2.09-.19-3.1.09-1.01.28-1.95.79-2.73,1.5-1.13,1.01-1.95,2.33-2.38,3.8-.43,1.47-.44,3.04-.04,4.51.4,1.81,1.45,3.41,2.96,4.45,1.5,1.05,3.34,1.47,5.14,1.17,1.21-.15,2.35-.64,3.29-1.42.94-.78,1.65-1.82,2.04-3,.1-.27.03-.31-.22-.31-.99.01-1.97,0-2.96,0-.09,0-.17,0-.25.04-.08.04-.15.09-.2.16-.28.38-.63.69-1.04.92-.41.22-.86.35-1.33.37-.86.13-1.74-.05-2.48-.52-.74-.47-1.3-1.18-1.57-2.03-.09-.28-.08-.39.26-.38,1.62.02,3.24,0,4.86,0s3.29,0,4.93,0c.23,0,.32-.04.35-.29.24-1.8-.04-3.63-.81-5.26h0ZM129.63,12.14c.15-.91.63-1.72,1.35-2.28.72-.56,1.61-.82,2.51-.72.85-.06,1.7.22,2.35.78.66.56,1.08,1.35,1.18,2.22h-7.39Z" fill="#070707"/><path d="M32.3,6.06c-.88.25-1.66.76-2.26,1.46,0-2.06-.01-4.03.01-6.01,0-.36-.1-.43-.43-.42-.83.03-1.67.02-2.5,0-.29,0-.37.06-.37.37.01,3.39,0,6.77,0,10.16,0,3.11,0,6.22,0,9.33,0,.26.06.34.33.34.8-.02,1.6-.02,2.4,0,.23,0,.3-.06.29-.29-.02-.52,0-1.04,0-1.62.33.37.69.72,1.07,1.04.36.3.77.55,1.2.73,1.35.56,2.86.62,4.25.17s2.58-1.39,3.37-2.65c.69-1.09,1.14-2.32,1.32-3.6.19-1.28.11-2.59-.24-3.84-.19-.93-.56-1.8-1.1-2.57-.54-.77-1.22-1.42-2.02-1.9s-1.68-.8-2.59-.92c-.92-.12-1.85-.04-2.74.22h0ZM37.75,13.42c.08,1.24-.27,2.46-1,3.45-.39.48-.88.86-1.44,1.1s-1.17.35-1.77.3c-.61-.05-1.19-.24-1.71-.57-.52-.33-.95-.77-1.27-1.31-.46-.78-.72-1.66-.75-2.56-.03-.91.16-1.81.56-2.61.32-.7.85-1.28,1.51-1.66.66-.38,1.41-.55,2.16-.48.81.05,1.58.36,2.2.89.62.52,1.07,1.23,1.28,2.03.14.46.21.93.22,1.41" fill="#070707"/><path d="M20.19,12.72c-.55-.66-1.34-1.07-2.18-1.16-.85-.09-1.69.17-2.36.7-.06.07-.15.1-.24.11-.09,0-.18-.03-.24-.1-.61-.46-1.35-.71-2.1-.7-.75,0-1.47.25-2.05.73-.58.48-.98,1.15-1.13,1.9-.14.68-.12,1.39.04,2.06.16.68.47,1.31.91,1.84,1.1,1.38,2.49,2.49,4.08,3.23.15.09.33.14.5.13.18,0,.35-.05.5-.14.89-.46,1.74-1.01,2.52-1.63,1.13-.83,1.97-2.01,2.41-3.37.2-.61.25-1.26.14-1.9-.11-.63-.39-1.23-.79-1.72h0ZM19.39,15.43c-.24,1.13-.88,2.14-1.79,2.83-.6.52-1.26.97-1.95,1.34-.05.05-.12.07-.19.08-.07,0-.14,0-.2-.04-1.25-.62-2.34-1.53-3.19-2.65-.37-.47-.59-1.04-.65-1.63-.05-.41.02-.83.21-1.2.19-.37.49-.66.86-.84.38-.12.79-.12,1.18,0,.38.12.72.36.97.67.1.18.26.31.44.39.19.08.39.08.58.03.18-.07.33-.19.43-.35.18-.24.42-.44.68-.59.27-.14.56-.23.86-.25.27,0,.53.05.77.16s.46.28.62.5c.17.21.29.46.35.73.06.27.06.54,0,.81" fill="#ff9b77"/><path d="M.16,14.92c0-1.84,0-3.69,0-5.53,0-.17.03-.34.1-.5.07-.16.18-.29.31-.4C3.67,5.86,6.77,3.23,9.88.59c.56-.48.87-.48,1.43-.01,3.11,2.64,6.22,5.28,9.33,7.93.1.06.19.15.25.25.07.1.11.21.13.33.02.12.01.24-.02.36-.03.12-.09.22-.16.32s-.17.17-.28.22c-.11.05-.22.08-.34.08-.12,0-.23-.02-.34-.07-.11-.05-.2-.12-.28-.21-2.84-2.41-5.69-4.82-8.53-7.24-.48-.41-.47-.41-.95,0-2.63,2.24-5.27,4.47-7.9,6.7-.14.1-.26.24-.34.41-.08.16-.11.34-.1.52.02,3.08.02,6.15,0,9.23,0,.38.11.44.45.44,2.63-.01,5.26,0,7.89,0,.18-.02.36.03.51.13.15.1.26.25.32.42.06.17.06.36,0,.54-.06.17-.17.32-.32.42-.14.1-.3.14-.46.14H1c-.12,0-.23-.01-.34-.05-.11-.04-.2-.11-.28-.19-.08-.09-.14-.19-.18-.3-.04-.11-.05-.23-.04-.35v-5.67" fill="#ff9b77"/></svg></a>
                </div>
                <div class="mt-header-right">
                    <div class="mt-search-wrap">
                        <svg class="mt-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <input type="text" class="mt-search-input" id="mt-search" placeholder="Search city, county, zip or state..." autocomplete="off">
                        <div class="mt-search-results" id="mt-search-results"></div>
                    </div>
                    <a class="mt-back-link" href="#/offers">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                        Dashboard
                    </a>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="mt-content">
            <!-- Breadcrumb -->
            <div class="mt-breadcrumb">${breadcrumbHtml}</div>

            <!-- Hero -->
            <div class="mt-hero">
                <div class="mt-hero-left">
                    <h1>${loc.name} Real Estate Market</h1>
                    <div class="mt-hero-updated">Data from ${lastUpdated}</div>
                    <div class="mt-hero-desc">${getHeroDescription(loc, lastUpdated)}</div>
                </div>
                <div class="mt-hero-right">
                    <div id="mt-gauge"></div>
                </div>
            </div>

            <!-- Market Activity -->
            <div class="mt-section-title" style="margin-bottom: 16px;">Market Activity</div>
            <div class="mt-metrics-grid mt-stagger">
                <div class="mt-metric-card">
                    <div class="mt-metric-label">Median Sold Price ${tooltipIcon('Median Sold Price')}</div>
                    <div class="mt-metric-value">${formatPrice(km.medianSoldPrice.value)}</div>
                    ${changeArrowDual(km.medianSoldPrice.momPct, km.medianSoldPrice.yoyPct)}
                </div>
                ${km.medianPricePerSqft ? `<div class="mt-metric-card">
                    <div class="mt-metric-label">Median $/Sqft ${tooltipIcon('Median $/Sqft')}</div>
                    <div class="mt-metric-value">$${km.medianPricePerSqft.value}</div>
                    ${changeArrowDual(km.medianPricePerSqft.momPct, km.medianPricePerSqft.yoyPct)}
                </div>` : ''}
                <div class="mt-metric-card">
                    <div class="mt-metric-label">Median Days on Market ${tooltipIcon('Median Days on Market')}</div>
                    <div class="mt-metric-value">${km.medianDaysOnMarket.value}</div>
                    ${changeArrowDual(km.medianDaysOnMarket.momPct, km.medianDaysOnMarket.yoyPct)}
                </div>
                <div class="mt-metric-card">
                    <div class="mt-metric-label">Months of Inventory ${tooltipIcon('Months of Inventory')}</div>
                    <div class="mt-metric-value">${km.monthsOfInventory.value}</div>
                    ${changeArrowDual(km.monthsOfInventory.momPct, km.monthsOfInventory.yoyPct)}
                </div>
                <div class="mt-metric-card">
                    <div class="mt-metric-label">Sold-to-List % ${tooltipIcon('Sold-to-List %')}</div>
                    <div class="mt-metric-value">${km.soldToListPct.value}%</div>
                    ${changeArrowDual(km.soldToListPct.momPct, km.soldToListPct.yoyPct)}
                </div>
                <div class="mt-metric-card">
                    <div class="mt-metric-label">Active Listings ${tooltipIcon('Active Listings')}</div>
                    <div class="mt-metric-value">${formatNumber(sec.activeListings.numProperties.value)}</div>
                    ${changeArrowDual(sec.activeListings.numProperties.momPct)}
                </div>
                ${km.priceDropPct ? `<div class="mt-metric-card">
                    <div class="mt-metric-label">Price Drops ${tooltipIcon('Price Drops')}</div>
                    <div class="mt-metric-value">${km.priceDropPct.value}%</div>
                    ${changeArrowDual(km.priceDropPct.momPct, km.priceDropPct.yoyPct)}
                </div>` : ''}
                ${km.soldAboveListPct ? `<div class="mt-metric-card">
                    <div class="mt-metric-label">Sold Above List ${tooltipIcon('Sold Above List')}</div>
                    <div class="mt-metric-value">${km.soldAboveListPct.value}%</div>
                    ${changeArrowDual(km.soldAboveListPct.momPct, km.soldAboveListPct.yoyPct)}
                </div>` : ''}
            </div>

            <!-- Is It a Good Time to Buy or Sell? -->
            ${buildBuyOrSellInsight(loc, stateData)}

            <!-- Median Estimated Property Value -->
            <div class="mt-section mt-reveal">
                <div class="mt-section-header">
                    <div></div>
                    <div class="mt-time-toggle" id="mt-time-toggle">
                        <button class="mt-time-btn" data-range="12">1 Year</button>
                        <button class="mt-time-btn" data-range="24">2 Years</button>
                        <button class="mt-time-btn active" data-range="36">3 Years</button>
                        <button class="mt-time-btn" data-range="0">All</button>
                    </div>
                </div>
                <div class="mt-chart-wrap" id="mt-chart-container">
                    <canvas id="mt-value-chart"></canvas>
                </div>
                <div class="mt-chart-legend" id="mt-chart-legend"></div>
            </div>

            <!-- Home Price Trends -->
            ${buildPriceTrendsInsight(loc, stateData)}

            <!-- Market Signals -->
            ${buildMarketIndicators(loc, stateData)}

            <!-- How Fast Are Homes Selling? -->
            ${buildSaleSpeedInsight(loc, stateData)}

            <!-- Market Activity Tabs -->
            <div class="mt-section mt-reveal">
                <div class="mt-tabs">${tabsHtml}</div>
                ${tabContentsHtml}
            </div>

            <!-- Housing Supply and Demand -->
            ${buildSupplyDemandInsight(loc, stateData)}

            <!-- Savings Calculator -->
            <div class="mt-savings-section mt-reveal">
                <div class="mt-dot-grid" style="top:0;left:15%;">
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                </div>
                <div class="mt-dot-grid" style="bottom:-30px;right:15%;">
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                    <p><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span></p>
                </div>
                <div class="mt-savings-hero">
                    <h2 class="mt-savings-headline">How much could Beycome help you save when selling your ${loc.name} home?</h2>
                    <p class="mt-savings-subline">By choosing Beycome, a ${loc.name} homeowner could save approximately <strong>${formatPrice(Math.round(medianPrice * 0.03) - 399)}</strong> compared to paying a standard 3% listing commission on a <strong>${formatPrice(medianPrice)}</strong> home.</p>
                    <div class="mt-savings-toggle">
                        <button class="mt-savings-toggle-btn active" data-mode="selling">Selling</button>
                        <button class="mt-savings-toggle-btn" data-mode="buying">Buying</button>
                    </div>
                </div>
                <div class="mt-savings-card-wrap">
                    <div class="mt-savings-layout">
                        <div class="mt-savings-left">
                            <div class="mt-savings-input-wrap">
                                <label for="mt-home-value" id="mt-savings-price-label">Your selling price:</label>
                                <div class="mt-savings-price-display">
                                    <span class="mt-savings-input-prefix">$</span><input type="text" class="mt-savings-input" id="mt-home-value" value="${medianPrice.toLocaleString('en-US')}" inputmode="numeric">
                                </div>
                                <input type="range" class="mt-savings-slider" id="mt-home-slider" min="50000" max="5000000" step="5000" value="${medianPrice}">
                            </div>
                            <p class="mt-savings-assumption" id="mt-savings-assumption">Assuming a 6% listing agent commission.</p>
                        </div>
                        <div class="mt-savings-right">
                            <div class="mt-savings-bars">
                                <div class="mt-savings-bar-group beycome">
                                    <div class="mt-savings-bar-label"><span class="mt-savings-bar-value" id="mt-savings-amount">${formatPrice(Math.round(medianPrice * 0.06) - 399)}</span><span class="mt-savings-bar-name">beycome saving*</span></div>
                                    <div class="mt-savings-bar" id="mt-bar-beycome" style="height: 200px;"></div>
                                </div>
                                <div class="mt-savings-bar-group traditional">
                                    <div class="mt-savings-bar-label"><span class="mt-savings-bar-value" id="mt-cost-traditional">$0</span><span class="mt-savings-bar-name">Traditional agent</span></div>
                                    <div class="mt-savings-bar" id="mt-bar-traditional" style="height: 4px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-savings-bottom">
                        <a class="mt-savings-cta" href="#/submit-property">Start Saving Today</a>
                        <p class="mt-savings-disclaimer">*Saving are contingent upon the transaction amount, prevailing market conditions, and subject to an assuming typical total listing commission of 6%.</p>
                    </div>
                </div>
            </div>

            <!-- Neighborhoods -->
            ${neighborhoodsHtml ? `
            <div class="mt-section mt-dot-pattern mt-dot-full mt-reveal">
                <div class="mt-section-header">
                    <div class="mt-section-title">Explore ${loc.type === 'state' ? 'Counties' : loc.type === 'county' ? 'Cities' : 'Neighborhoods'}</div>
                </div>
                <div class="mt-neighborhoods mt-stagger">${neighborhoodsHtml}</div>
            </div>` : ''}

            <!-- FAQ -->
            <div class="mt-section mt-reveal">
                <div class="mt-section-header">
                    <div class="mt-section-title">Frequently Asked Questions</div>
                </div>
                <div class="mt-faq-list">${faqsHtml}</div>
            </div>

            <!-- Disclaimer -->
            <div class="mt-data-sources">
                <div class="mt-data-sources-title">Disclaimer</div>
                <div class="mt-data-disclaimer">
                    <p>Market information and analysis presented on this page are provided for general informational and educational purposes only. They do not constitute legal, financial, investment, or real estate advice.</p>
                    <p>The data displayed may include information compiled from public records, economic databases, industry publications, and other publicly available sources. These sources may include, among others, the Redfin&reg; Data Center, Federal Reserve Economic Data (FRED), Realtor.com, the National Association of REALTORS&reg; (NAR), Zillow&reg;, and other publicly accessible datasets. While Beycome makes reasonable efforts to use reliable information and maintain accurate data, we do not guarantee the accuracy, completeness, reliability, or timeliness of the information presented.</p>
                    <p>Any market estimates, trends, projections, or historical comparisons shown on this page are derived from statistical models and aggregated datasets. These figures are intended for general market insight only and should not be interpreted as forecasts or guarantees of future market performance. Real estate markets can change frequently due to economic conditions, regulatory changes, interest rates, supply and demand dynamics, and other factors beyond our control.</p>
                    <p>Users should independently verify all information and perform their own due diligence before making any real estate, financial, or investment decisions. Beycome, its affiliates, and related entities shall not be liable for any losses, damages, or decisions made in reliance on the information provided.</p>
                    <p>This page may reference data originating from third-party public sources. Beycome does not control these sources and cannot ensure the continued availability or accuracy of such external information.</p>
                    <p>All information is provided "as is" without warranties of any kind. Unless otherwise indicated, the most recent dataset referenced reflects information available as of ${lastUpdated} and is typically updated on a monthly basis.</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        ${renderSiteFooter()}
    </div>
    `;
}

export function init(slug) {
    const data = getMarketData();
    if (!data) return;

    const locationSlug = slug || 'florida';
    const loc = getLocation(locationSlug);
    if (!loc) return;

    // Background: fetch fresh data from static JSON for next page load
    store.fetchMarketData().catch(() => {});

    // Build search index
    _searchIndex = buildSearchIndex();

    // Draw speedometer gauge
    drawSpeedometer('mt-gauge', loc.marketScore.value, {
        label: loc.marketScore.label,
        type: loc.marketScore.type
    });

    // Draw MSI bar gauge
    drawBarGauge('mt-msi-gauge', loc.monthsSupply.value);

    // Draw value chart
    drawValueChart(loc, 36);

    // Resize observer for chart
    const chartContainer = document.getElementById('mt-chart-container');
    if (chartContainer && typeof ResizeObserver !== 'undefined') {
        _resizeObserver = new ResizeObserver(() => {
            drawValueChart(loc, getCurrentRange());
        });
        _resizeObserver.observe(chartContainer);
    }

    // Time range toggle
    document.getElementById('mt-time-toggle')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.mt-time-btn');
        if (!btn) return;
        document.querySelectorAll('#mt-time-toggle .mt-time-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const range = parseInt(btn.dataset.range) || 0;
        drawValueChart(loc, range);
    });

    // Tabs
    document.querySelectorAll('.mt-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const id = tab.dataset.mtTab;
            document.querySelectorAll('.mt-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.mt-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const content = document.querySelector(`[data-mt-tab-content="${id}"]`);
            if (content) content.classList.add('active');
        });
    });

    // FAQ accordion
    document.querySelectorAll('.mt-faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.mt-faq-item').classList.toggle('open');
        });
    });

    // Search
    const searchInput = document.getElementById('mt-search');
    const searchResults = document.getElementById('mt-search-results');
    let debounceTimer;

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = searchInput.value.toLowerCase().trim();
                if (query.length < 2) {
                    searchResults.classList.remove('show');
                    return;
                }
                const matches = _searchIndex.filter(item =>
                    item.name.toLowerCase().includes(query) ||
                    item.county.toLowerCase().includes(query) ||
                    item.slug.includes(query)
                ).slice(0, 8);

                if (matches.length === 0) {
                    searchResults.innerHTML = '<div style="padding:12px 16px; font-size:14px; color:var(--c-text-secondary);">No results found</div>';
                } else {
                    searchResults.innerHTML = matches.map(m => `
                        <div class="mt-search-result" data-mt-nav="${m.slug}">
                            <div>
                                <div class="mt-search-result-name">${m.name}</div>
                                <div class="mt-search-result-meta">${m.type}${m.county ? ' \u2022 ' + m.county : ''}${m.state ? ', ' + m.state : ''}</div>
                            </div>
                        </div>
                    `).join('');
                }
                searchResults.classList.add('show');
            }, 150);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length >= 2) {
                searchResults.classList.add('show');
            }
        });

        // Close search on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.mt-search-wrap')) {
                searchResults.classList.remove('show');
            }
        });
    }

    // Navigation clicks (search results, breadcrumbs, neighborhoods)
    document.addEventListener('click', (e) => {
        const navEl = e.target.closest('[data-mt-nav]');
        if (navEl) {
            e.preventDefault();
            const targetSlug = navEl.dataset.mtNav;
            window.location.hash = `/market-trends/${targetSlug}`;
        }
    });

    // Scroll-reveal animations (IntersectionObserver)
    const revealEls = document.querySelectorAll('.mt-reveal, .mt-stagger');
    if (revealEls.length && typeof IntersectionObserver !== 'undefined') {
        _revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    _revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => _revealObserver.observe(el));
    }

    // Animate counter values on hero metric cards
    const metricValueEls = document.querySelectorAll('.mt-metrics-grid .mt-metric-value');
    metricValueEls.forEach(el => {
        const text = el.textContent;
        const numMatch = text.replace(/[,$%]/g, '').match(/[\d.]+/);
        if (!numMatch) return;
        const target = parseFloat(numMatch[0]);
        const prefix = text.match(/^[^0-9]*/)[0] || '';
        const suffix = text.match(/[^0-9.]*$/)[0] || '';
        const isDecimal = text.includes('.') && !text.includes(',');
        const hasComma = text.includes(',');
        const duration = 800;
        const start = performance.now();
        el.textContent = prefix + '0' + suffix;

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            if (hasComma) {
                el.textContent = prefix + Math.round(current).toLocaleString('en-US') + suffix;
            } else if (isDecimal) {
                el.textContent = prefix + current.toFixed(1) + suffix;
            } else {
                el.textContent = prefix + Math.round(current) + suffix;
            }
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });

    // Savings calculator
    const homeValueInput = document.getElementById('mt-home-value');
    const homeSlider = document.getElementById('mt-home-slider');
    let savingsMode = 'selling'; // 'selling' or 'buying'
    let _savingsAnimFrame = null;

    function animateValue(el, from, to, duration) {
        if (_savingsAnimFrame) cancelAnimationFrame(_savingsAnimFrame);
        const start = performance.now();
        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(from + (to - from) * eased);
            el.textContent = formatPrice(current);
            if (progress < 1) _savingsAnimFrame = requestAnimationFrame(tick);
        }
        _savingsAnimFrame = requestAnimationFrame(tick);
    }

    function updateSavings(val, animate) {
        const maxBar = 200;
        const savingsEl = document.getElementById('mt-savings-amount');
        const tradEl = document.getElementById('mt-cost-traditional');
        const savingsBar = document.getElementById('mt-bar-beycome');
        const tradBar = document.getElementById('mt-bar-traditional');
        let savings;

        if (savingsMode === 'selling') {
            const traditional = Math.round(val * 0.06);
            savings = Math.max(0, traditional - 399);
            if (tradEl) tradEl.textContent = '$0';
        } else {
            // Buying: 2% credit back
            savings = Math.max(0, Math.round(val * 0.02));
            if (tradEl) tradEl.textContent = '$0';
        }

        if (savingsEl) {
            if (animate) {
                const prev = parseInt(savingsEl.textContent.replace(/[^0-9]/g, '')) || 0;
                animateValue(savingsEl, prev, savings, 400);
            } else {
                savingsEl.textContent = formatPrice(savings);
            }
        }

        // Orange bar always tall for visual impact (like beycome.com)
        // Min 140px, scales slightly with value up to maxBar
        const minBar = 140;
        const barRatio = Math.min(savings / 50000, 1);
        const barH = savings > 0 ? Math.round(minBar + barRatio * (maxBar - minBar)) : 8;
        if (savingsBar) savingsBar.style.height = barH + 'px';
        if (tradBar) tradBar.style.height = '4px';
    }

    // Selling / Buying toggle
    document.querySelectorAll('.mt-savings-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mt-savings-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            savingsMode = btn.dataset.mode;
            const label = document.getElementById('mt-savings-price-label');
            const assumption = document.getElementById('mt-savings-assumption');
            if (savingsMode === 'selling') {
                if (label) label.textContent = 'Your selling price:';
                if (assumption) assumption.textContent = 'Assuming a 6% listing agent commission.';
            } else {
                if (label) label.textContent = 'Your buying price:';
                if (assumption) assumption.textContent = 'Assuming a 3% buying agent commission.';
            }
            const val = parseInt((homeValueInput?.value || '0').replace(/[^0-9]/g, '')) || 0;
            updateSavings(val, true);
        });
    });

    if (homeValueInput) {
        homeValueInput.addEventListener('input', () => {
            const raw = homeValueInput.value.replace(/[^0-9]/g, '');
            const val = parseInt(raw) || 0;
            homeValueInput.value = val.toLocaleString('en-US');
            if (homeSlider) homeSlider.value = val;
            updateSavings(val, true);
        });
    }

    if (homeSlider) {
        homeSlider.addEventListener('input', () => {
            const val = parseInt(homeSlider.value) || 0;
            homeValueInput.value = val.toLocaleString('en-US');
            updateSavings(val, true);
        });
    }

    // Savings amount count-up animation on scroll
    const savingsEl = document.getElementById('mt-savings-amount');
    if (savingsEl && typeof IntersectionObserver !== 'undefined') {
        const savingsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                savingsObserver.disconnect();
                const text = savingsEl.textContent;
                const numMatch = text.replace(/[,$]/g, '').match(/[\d.]+/);
                if (!numMatch) return;
                const target = parseFloat(numMatch[0]);
                const duration = 1200;
                const start = performance.now();
                savingsEl.textContent = '$0';

                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(target * eased);
                    savingsEl.textContent = '$' + current.toLocaleString('en-US');
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.5 });
        savingsObserver.observe(savingsEl);
    }
}

function getCurrentRange() {
    const active = document.querySelector('#mt-time-toggle .mt-time-btn.active');
    return active ? (parseInt(active.dataset.range) || 0) : 36;
}

function drawValueChart(loc, range) {
    const history = loc.medianEstimatedValue.history || [];
    const data = range > 0 ? history.slice(-range) : history;
    if (!data.length) return;

    // Build datasets
    const colors = {
        zip: '#7d8ff7',
        city: '#FF9B77',
        county: '#81c797',
        state: '#f75353'
    };

    const datasets = [];
    const labels = { zip: loc.name, city: 'City', county: 'County', state: 'State' };

    // Determine what levels exist based on location type
    if (loc.type === 'state') {
        datasets.push({
            label: loc.name,
            color: colors.state,
            data: data.map(p => ({ x: formatMonth(p.month), y: p.state }))
        });
    } else {
        ['zip', 'city', 'county', 'state'].forEach(key => {
            if (data[0][key] !== undefined) {
                datasets.push({
                    label: key === 'zip' ? loc.name : (key.charAt(0).toUpperCase() + key.slice(1)),
                    color: colors[key],
                    data: data.map(p => ({ x: formatMonth(p.month), y: p[key] }))
                });
            }
        });
    }

    drawLineChart('mt-value-chart', datasets, { yPrefix: '$', height: 280 });

    // Legend
    const legendEl = document.getElementById('mt-chart-legend');
    if (legendEl) {
        legendEl.innerHTML = datasets.map(ds =>
            `<div class="mt-legend-item"><span class="mt-legend-dot" style="background:${ds.color}"></span>${ds.label}</div>`
        ).join('');
    }
}

function formatMonth(monthStr) {
    const [y, m] = monthStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(m) - 1] + " '" + y.slice(2);
}

export function cleanup() {
    if (_resizeObserver) {
        _resizeObserver.disconnect();
        _resizeObserver = null;
    }
    if (_revealObserver) {
        _revealObserver.disconnect();
        _revealObserver = null;
    }
    _searchIndex = null;
}
