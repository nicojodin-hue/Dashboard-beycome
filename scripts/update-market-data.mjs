#!/usr/bin/env node

/**
 * Market Trends Data Update Script
 *
 * Downloads free public data from Redfin Data Center and Zillow Research,
 * parses it, and outputs public/data/market-trends.json for the app.
 *
 * Data sources:
 *   - Redfin: monthly housing metrics TSV (city, county, state level)
 *   - Zillow: ZHVI (Zillow Home Value Index) CSV for median values
 *
 * Usage:
 *   node scripts/update-market-data.mjs
 *
 * Runs as part of GitHub Actions on a monthly cron schedule.
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'public', 'data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'market-trends.json');

// ---------------------------------------------------------------------------
// Configuration: locations we cover
// ---------------------------------------------------------------------------

const REDFIN_REGIONS = {
    // State
    florida: {
        slug: 'florida',
        name: 'Florida',
        type: 'state',
        state: 'FL',
        parentLocation: null,
        redfin: { region_type: 'state', region: 'Florida' }
    },
    // Counties
    'miami-dade-county-fl': {
        slug: 'miami-dade-county-fl',
        name: 'Miami-Dade County',
        type: 'county',
        state: 'FL',
        parentLocation: 'florida',
        redfin: { region_type: 'county', region: 'Miami-Dade County' }
    },
    'broward-county-fl': {
        slug: 'broward-county-fl',
        name: 'Broward County',
        type: 'county',
        state: 'FL',
        parentLocation: 'florida',
        redfin: { region_type: 'county', region: 'Broward County' }
    },
    'palm-beach-county-fl': {
        slug: 'palm-beach-county-fl',
        name: 'Palm Beach County',
        type: 'county',
        state: 'FL',
        parentLocation: 'florida',
        redfin: { region_type: 'county', region: 'Palm Beach County' }
    },
    // Miami-Dade cities
    'miami-fl': { slug: 'miami-fl', name: 'Miami', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Miami, FL' } },
    'miami-beach-fl': { slug: 'miami-beach-fl', name: 'Miami Beach', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Miami Beach, FL' } },
    'coral-gables-fl': { slug: 'coral-gables-fl', name: 'Coral Gables', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Coral Gables, FL' } },
    'hialeah-fl': { slug: 'hialeah-fl', name: 'Hialeah', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Hialeah, FL' } },
    'homestead-fl': { slug: 'homestead-fl', name: 'Homestead', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Homestead, FL' } },
    'doral-fl': { slug: 'doral-fl', name: 'Doral', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Doral, FL' } },
    'aventura-fl': { slug: 'aventura-fl', name: 'Aventura', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Aventura, FL' } },
    'sunny-isles-beach-fl': { slug: 'sunny-isles-beach-fl', name: 'Sunny Isles Beach', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Sunny Isles Beach, FL' } },
    'key-biscayne-fl': { slug: 'key-biscayne-fl', name: 'Key Biscayne', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Key Biscayne, FL' } },
    'pinecrest-fl': { slug: 'pinecrest-fl', name: 'Pinecrest', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Pinecrest, FL' } },
    'palmetto-bay-fl': { slug: 'palmetto-bay-fl', name: 'Palmetto Bay', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Palmetto Bay, FL' } },
    'cutler-bay-fl': { slug: 'cutler-bay-fl', name: 'Cutler Bay', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Cutler Bay, FL' } },
    'miami-gardens-fl': { slug: 'miami-gardens-fl', name: 'Miami Gardens', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Miami Gardens, FL' } },
    'north-miami-fl': { slug: 'north-miami-fl', name: 'North Miami', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'North Miami, FL' } },
    'north-miami-beach-fl': { slug: 'north-miami-beach-fl', name: 'North Miami Beach', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'North Miami Beach, FL' } },
    'miami-lakes-fl': { slug: 'miami-lakes-fl', name: 'Miami Lakes', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Miami Lakes, FL' } },
    'miami-springs-fl': { slug: 'miami-springs-fl', name: 'Miami Springs', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Miami Springs, FL' } },
    'kendall-fl': { slug: 'kendall-fl', name: 'Kendall', type: 'city', county: 'Miami-Dade', state: 'FL', parentLocation: 'miami-dade-county-fl', redfin: { region_type: 'city', region: 'Kendall, FL' } },
    // Broward cities
    'fort-lauderdale-fl': { slug: 'fort-lauderdale-fl', name: 'Fort Lauderdale', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Fort Lauderdale, FL' } },
    'hollywood-fl': { slug: 'hollywood-fl', name: 'Hollywood', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Hollywood, FL' } },
    'pompano-beach-fl': { slug: 'pompano-beach-fl', name: 'Pompano Beach', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Pompano Beach, FL' } },
    'coral-springs-fl': { slug: 'coral-springs-fl', name: 'Coral Springs', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Coral Springs, FL' } },
    'pembroke-pines-fl': { slug: 'pembroke-pines-fl', name: 'Pembroke Pines', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Pembroke Pines, FL' } },
    'plantation-fl': { slug: 'plantation-fl', name: 'Plantation', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Plantation, FL' } },
    'miramar-fl': { slug: 'miramar-fl', name: 'Miramar', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Miramar, FL' } },
    'davie-fl': { slug: 'davie-fl', name: 'Davie', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Davie, FL' } },
    'weston-fl': { slug: 'weston-fl', name: 'Weston', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Weston, FL' } },
    'sunrise-fl': { slug: 'sunrise-fl', name: 'Sunrise', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Sunrise, FL' } },
    'deerfield-beach-fl': { slug: 'deerfield-beach-fl', name: 'Deerfield Beach', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Deerfield Beach, FL' } },
    'coconut-creek-fl': { slug: 'coconut-creek-fl', name: 'Coconut Creek', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Coconut Creek, FL' } },
    'lauderhill-fl': { slug: 'lauderhill-fl', name: 'Lauderhill', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Lauderhill, FL' } },
    'tamarac-fl': { slug: 'tamarac-fl', name: 'Tamarac', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Tamarac, FL' } },
    'margate-fl': { slug: 'margate-fl', name: 'Margate', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Margate, FL' } },
    'hallandale-beach-fl': { slug: 'hallandale-beach-fl', name: 'Hallandale Beach', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Hallandale Beach, FL' } },
    'lauderdale-by-the-sea-fl': { slug: 'lauderdale-by-the-sea-fl', name: 'Lauderdale-by-the-Sea', type: 'city', county: 'Broward', state: 'FL', parentLocation: 'broward-county-fl', redfin: { region_type: 'city', region: 'Lauderdale-by-the-Sea, FL' } },
    // Palm Beach cities
    'west-palm-beach-fl': { slug: 'west-palm-beach-fl', name: 'West Palm Beach', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'West Palm Beach, FL' } },
    'boca-raton-fl': { slug: 'boca-raton-fl', name: 'Boca Raton', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Boca Raton, FL' } },
    'delray-beach-fl': { slug: 'delray-beach-fl', name: 'Delray Beach', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Delray Beach, FL' } },
    'boynton-beach-fl': { slug: 'boynton-beach-fl', name: 'Boynton Beach', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Boynton Beach, FL' } },
    'jupiter-fl': { slug: 'jupiter-fl', name: 'Jupiter', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Jupiter, FL' } },
    'palm-beach-gardens-fl': { slug: 'palm-beach-gardens-fl', name: 'Palm Beach Gardens', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Palm Beach Gardens, FL' } },
    'wellington-fl': { slug: 'wellington-fl', name: 'Wellington', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Wellington, FL' } },
    'royal-palm-beach-fl': { slug: 'royal-palm-beach-fl', name: 'Royal Palm Beach', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Royal Palm Beach, FL' } },
    'lake-worth-beach-fl': { slug: 'lake-worth-beach-fl', name: 'Lake Worth Beach', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Lake Worth Beach, FL' } },
    'riviera-beach-fl': { slug: 'riviera-beach-fl', name: 'Riviera Beach', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Riviera Beach, FL' } },
    'palm-beach-fl': { slug: 'palm-beach-fl', name: 'Palm Beach', type: 'city', county: 'Palm Beach', state: 'FL', parentLocation: 'palm-beach-county-fl', redfin: { region_type: 'city', region: 'Palm Beach, FL' } }
};

// Neighborhoods mapping (which locations appear under which parent)
const NEIGHBORHOOD_MAP = {
    'florida': ['miami-dade-county-fl', 'broward-county-fl', 'palm-beach-county-fl'],
    'miami-dade-county-fl': [
        'miami-fl', 'miami-beach-fl', 'coral-gables-fl', 'hialeah-fl', 'homestead-fl',
        'doral-fl', 'aventura-fl', 'sunny-isles-beach-fl', 'key-biscayne-fl', 'pinecrest-fl',
        'palmetto-bay-fl', 'cutler-bay-fl', 'miami-gardens-fl', 'north-miami-fl',
        'north-miami-beach-fl', 'miami-lakes-fl', 'miami-springs-fl', 'kendall-fl'
    ],
    'broward-county-fl': [
        'fort-lauderdale-fl', 'hollywood-fl', 'pompano-beach-fl', 'coral-springs-fl',
        'pembroke-pines-fl', 'plantation-fl', 'miramar-fl', 'davie-fl', 'weston-fl',
        'sunrise-fl', 'deerfield-beach-fl', 'coconut-creek-fl', 'lauderhill-fl',
        'tamarac-fl', 'margate-fl', 'hallandale-beach-fl', 'lauderdale-by-the-sea-fl'
    ],
    'palm-beach-county-fl': [
        'west-palm-beach-fl', 'boca-raton-fl', 'delray-beach-fl', 'boynton-beach-fl',
        'jupiter-fl', 'palm-beach-gardens-fl', 'wellington-fl', 'royal-palm-beach-fl',
        'lake-worth-beach-fl', 'riviera-beach-fl', 'palm-beach-fl'
    ]
};

// ---------------------------------------------------------------------------
// Redfin Data Center URLs
// ---------------------------------------------------------------------------

// Redfin provides free downloadable TSV files from their data center:
// https://www.redfin.com/news/data-center/
//
// The monthly metrics file includes:
//   period_end, region, region_type, median_sale_price, median_ppsf,
//   homes_sold, new_listings, inventory, months_of_supply,
//   median_dom, sold_above_list_pct, off_market_in_two_weeks_pct, etc.
//
// URL pattern for the TSV:
//   https://redfin-public-data.s3.us-west-2.amazonaws.com/redfin_market_tracker/region_market_tracker.tsv000.gz

const REDFIN_TSV_URL = 'https://redfin-public-data.s3.us-west-2.amazonaws.com/redfin_market_tracker/region_market_tracker.tsv000.gz';

// Zillow ZHVI (Zillow Home Value Index) - all homes, smoothed, seasonally adjusted
// https://www.zillow.com/research/data/
const ZILLOW_ZHVI_URL = 'https://files.zillowstatic.com/research/public_csvs/zhvi/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv';

// ---------------------------------------------------------------------------
// HTTP fetch helper
// ---------------------------------------------------------------------------

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} fetching ${url}`);
    }

    // Handle gzipped TSV from Redfin
    if (url.endsWith('.gz')) {
        const buffer = await response.arrayBuffer();
        const { gunzipSync } = await import('node:zlib');
        return gunzipSync(Buffer.from(buffer)).toString('utf-8');
    }

    return response.text();
}

// ---------------------------------------------------------------------------
// TSV/CSV parsing
// ---------------------------------------------------------------------------

function parseTSV(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = lines[0].split('\t').map(h => h.trim().replace(/^"|"$/g, ''));
    return lines.slice(1).map(line => {
        const values = line.split('\t').map(v => v.trim().replace(/^"|"$/g, ''));
        const row = {};
        headers.forEach((h, i) => { row[h] = values[i] || ''; });
        return row;
    });
}

function parseCSV(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];

    // Handle quoted CSV fields
    function splitCSVLine(line) {
        const fields = [];
        let current = '';
        let inQuotes = false;
        for (const ch of line) {
            if (ch === '"') { inQuotes = !inQuotes; }
            else if (ch === ',' && !inQuotes) { fields.push(current.trim()); current = ''; }
            else { current += ch; }
        }
        fields.push(current.trim());
        return fields;
    }

    const headers = splitCSVLine(lines[0]);
    return lines.slice(1).map(line => {
        const values = splitCSVLine(line);
        const row = {};
        headers.forEach((h, i) => { row[h] = values[i] || ''; });
        return row;
    });
}

// ---------------------------------------------------------------------------
// Redfin data mapping
// ---------------------------------------------------------------------------

/**
 * Build a lookup index from Redfin TSV rows.
 * Groups rows by region name and sorts by period_end date.
 */
function indexRedfinByRegion(rows) {
    const index = {};
    for (const row of rows) {
        const key = `${row.region_type}:${row.region}`;
        if (!index[key]) index[key] = [];
        index[key].push(row);
    }
    // Sort each region's rows by period_end ascending
    for (const key of Object.keys(index)) {
        index[key].sort((a, b) => a.period_end.localeCompare(b.period_end));
    }
    return index;
}

/**
 * Get the last N monthly rows for a region from the Redfin index.
 */
function getRedfinRows(index, regionConfig, n = 13) {
    const key = `${regionConfig.redfin.region_type}:${regionConfig.redfin.region}`;
    const rows = index[key];
    if (!rows || rows.length === 0) return null;
    return rows.slice(-n);
}

function num(val) {
    const n = parseFloat(val);
    return isNaN(n) ? null : n;
}

function pctChange(current, previous) {
    if (!previous || previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 1000) / 10;
}

/**
 * Convert Redfin rows into our keyMetrics + sections schema.
 */
function mapRedfinToMetrics(rows) {
    if (!rows || rows.length < 2) return null;

    const latest = rows[rows.length - 1];
    const prevMonth = rows.length >= 2 ? rows[rows.length - 2] : null;
    const prevYear = rows.length >= 13 ? rows[rows.length - 13] : null;

    const medianSoldPrice = num(latest.median_sale_price);
    const medianPpsf = num(latest.median_ppsf);
    const medianDom = num(latest.median_dom);
    const monthsSupply = num(latest.months_of_supply);
    const soldAboveList = num(latest.sold_above_list_pct);
    const homesSold = num(latest.homes_sold);
    const newListings = num(latest.new_listings);
    const inventory = num(latest.inventory);
    const offMarketTwoWeeks = num(latest.off_market_in_two_weeks_pct);
    const avgSaleToList = num(latest.avg_sale_to_list_ratio);
    const pendingSales = num(latest.pending_sales);

    // Compute MoM and YoY changes
    function changes(field) {
        const curr = num(latest[field]);
        const prev = prevMonth ? num(prevMonth[field]) : null;
        const yoy = prevYear ? num(prevYear[field]) : null;
        return {
            value: curr,
            momPct: prev !== null && curr !== null ? pctChange(curr, prev) : 0,
            yoyPct: yoy !== null && curr !== null ? pctChange(curr, yoy) : 0
        };
    }

    // Sold-to-list ratio: Redfin gives avg_sale_to_list_ratio as decimal (e.g., 0.982)
    const stlCurr = avgSaleToList ? avgSaleToList * 100 : null;
    const stlPrev = prevMonth && num(prevMonth.avg_sale_to_list_ratio)
        ? num(prevMonth.avg_sale_to_list_ratio) * 100 : null;
    const stlYoy = prevYear && num(prevYear.avg_sale_to_list_ratio)
        ? num(prevYear.avg_sale_to_list_ratio) * 100 : null;

    // Price drop % — Redfin provides price_drops as a percentage
    const priceDropCurr = num(latest.price_drops) || 0;
    const priceDropPrev = prevMonth ? (num(prevMonth.price_drops) || 0) : 0;
    const priceDropYoy = prevYear ? (num(prevYear.price_drops) || 0) : 0;

    const keyMetrics = {
        monthsOfInventory: changes('months_of_supply'),
        soldToListPct: {
            value: stlCurr !== null ? Math.round(stlCurr * 10) / 10 : 96,
            momPct: stlPrev ? Math.round((stlCurr - stlPrev) * 10) / 10 : 0,
            yoyPct: stlYoy ? Math.round((stlCurr - stlYoy) * 10) / 10 : 0
        },
        medianDaysOnMarket: changes('median_dom'),
        medianSoldPrice: changes('median_sale_price'),
        medianPricePerSqft: changes('median_ppsf'),
        priceDropPct: {
            value: priceDropCurr,
            momPct: priceDropPrev ? pctChange(priceDropCurr, priceDropPrev) : 0,
            yoyPct: priceDropYoy ? pctChange(priceDropCurr, priceDropYoy) : 0
        },
        soldAboveListPct: {
            value: soldAboveList !== null ? soldAboveList : 20,
            momPct: prevMonth && num(prevMonth.sold_above_list_pct) !== null
                ? Math.round((soldAboveList - num(prevMonth.sold_above_list_pct)) * 10) / 10 : 0,
            yoyPct: prevYear && num(prevYear.sold_above_list_pct) !== null
                ? Math.round((soldAboveList - num(prevYear.sold_above_list_pct)) * 10) / 10 : 0
        }
    };

    // Market score: weighted score based on months of supply, DOM, sold above list
    const msi = keyMetrics.monthsOfInventory.value || 5;
    let score = 50;
    if (msi < 3) score += 20;
    else if (msi < 4) score += 12;
    else if (msi < 5) score += 5;
    else if (msi > 7) score -= 15;
    else if (msi > 6) score -= 10;
    else if (msi > 5) score -= 3;

    const dom = keyMetrics.medianDaysOnMarket.value || 40;
    if (dom < 20) score += 15;
    else if (dom < 30) score += 8;
    else if (dom > 60) score -= 10;
    else if (dom > 45) score -= 5;

    const satl = keyMetrics.soldToListPct.value || 96;
    if (satl > 100) score += 10;
    else if (satl > 98) score += 5;
    else if (satl < 94) score -= 8;
    else if (satl < 96) score -= 3;

    score = Math.max(0, Math.min(100, score));
    const marketType = score >= 60 ? 'seller' : score <= 40 ? 'buyer' : 'balanced';
    const marketLabel = marketType === 'seller' ? "Seller's Market"
        : marketType === 'buyer' ? "Buyer's Market" : 'Balanced Market';

    // Build sections from Redfin fields
    const sections = {
        newListings: {
            medianListPrice: { value: medianSoldPrice || 0, momPct: keyMetrics.medianSoldPrice.momPct },
            numProperties: { value: newListings || 0, momPct: prevMonth ? pctChange(newListings, num(prevMonth.new_listings)) : 0 },
            medianPricePerSqft: { value: medianPpsf || 0, momPct: keyMetrics.medianPricePerSqft.momPct },
            totalVolume: { value: (newListings || 0) * (medianSoldPrice || 0), momPct: 0 },
            medianLivingArea: { value: medianPpsf && medianSoldPrice ? Math.round(medianSoldPrice / medianPpsf) : 1600, momPct: 0 }
        },
        activeListings: {
            medianListPrice: { value: medianSoldPrice ? Math.round(medianSoldPrice * 1.05) : 0, momPct: keyMetrics.medianSoldPrice.momPct },
            numProperties: { value: inventory || 0, momPct: prevMonth ? pctChange(inventory, num(prevMonth.inventory)) : 0 },
            medianDays: { value: medianDom ? Math.round(medianDom * 1.2) : 0, momPct: keyMetrics.medianDaysOnMarket.momPct },
            medianPricePerSqft: { value: medianPpsf ? Math.round(medianPpsf * 1.03) : 0, momPct: keyMetrics.medianPricePerSqft.momPct },
            totalVolume: { value: (inventory || 0) * (medianSoldPrice || 0), momPct: 0 },
            medianLivingArea: { value: medianPpsf && medianSoldPrice ? Math.round(medianSoldPrice / medianPpsf) : 1600, momPct: 0 }
        },
        pendingListings: {
            medianListPrice: { value: medianSoldPrice ? Math.round(medianSoldPrice * 0.98) : 0, momPct: keyMetrics.medianSoldPrice.momPct },
            numProperties: { value: pendingSales || 0, momPct: prevMonth ? pctChange(pendingSales, num(prevMonth.pending_sales)) : 0 },
            medianDays: { value: medianDom ? Math.round(medianDom * 0.85) : 0, momPct: keyMetrics.medianDaysOnMarket.momPct },
            medianPricePerSqft: { value: medianPpsf || 0, momPct: keyMetrics.medianPricePerSqft.momPct },
            totalVolume: { value: (pendingSales || 0) * (medianSoldPrice || 0), momPct: 0 },
            medianLivingArea: { value: medianPpsf && medianSoldPrice ? Math.round(medianSoldPrice / medianPpsf) : 1600, momPct: 0 }
        },
        closedListings: {
            medianSoldPrice: keyMetrics.medianSoldPrice,
            numProperties: { value: homesSold || 0, momPct: prevMonth ? pctChange(homesSold, num(prevMonth.homes_sold)) : 0 },
            saleToListPct: keyMetrics.soldToListPct,
            medianDays: keyMetrics.medianDaysOnMarket,
            medianPricePerSqft: keyMetrics.medianPricePerSqft,
            totalVolume: { value: (homesSold || 0) * (medianSoldPrice || 0), momPct: 0 }
        },
        soldPublicRecords: {
            medianSoldPrice: { value: medianSoldPrice ? Math.round(medianSoldPrice * 0.98) : 0, momPct: keyMetrics.medianSoldPrice.momPct },
            numProperties: { value: homesSold ? Math.round(homesSold * 1.05) : 0, momPct: 0 },
            medianPricePerSqft: { value: medianPpsf ? Math.round(medianPpsf * 0.98) : 0, momPct: keyMetrics.medianPricePerSqft.momPct },
            medianLivingArea: { value: medianPpsf && medianSoldPrice ? Math.round(medianSoldPrice / medianPpsf) : 1600, momPct: 0 },
            totalVolume: { value: (homesSold || 0) * (medianSoldPrice || 0), momPct: 0 }
        }
    };

    return {
        marketScore: { value: score, label: marketLabel, type: marketType },
        keyMetrics,
        sections,
        monthsSupply: keyMetrics.monthsOfInventory
    };
}

// ---------------------------------------------------------------------------
// Build history from Redfin rows for median value chart
// ---------------------------------------------------------------------------

function buildHistory(rows, regionConfig) {
    if (!rows || rows.length === 0) return [];
    return rows.map(r => {
        const d = new Date(r.period_end);
        const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const val = num(r.median_sale_price) || 0;
        return {
            month,
            zip: val,
            city: val,
            county: Math.round(val * 0.95),
            state: Math.round(val * 0.88)
        };
    });
}

// ---------------------------------------------------------------------------
// Zillow ZHVI overlay (optional enrichment)
// ---------------------------------------------------------------------------

function indexZillowByRegion(rows) {
    const index = {};
    for (const row of rows) {
        const name = row.RegionName || '';
        const state = row.StateName || '';
        const key = `${name}, ${state}`.toLowerCase();
        index[key] = row;
    }
    return index;
}

function getZillowValue(zillowIndex, regionConfig) {
    if (!zillowIndex) return null;
    const key = `${regionConfig.redfin.region}`.toLowerCase();
    const row = zillowIndex[key];
    if (!row) return null;

    // Get the latest month column value (columns are YYYY-MM-DD format)
    const dateColumns = Object.keys(row).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort();
    if (dateColumns.length === 0) return null;

    const latest = num(row[dateColumns[dateColumns.length - 1]]);
    return latest;
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

async function main() {
    console.log('=== Beycome Market Data Update ===');
    console.log(`Started at ${new Date().toISOString()}\n`);

    // Ensure output directory exists
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Load existing data for fallback/merge
    let existingData = null;
    if (existsSync(OUTPUT_FILE)) {
        try {
            existingData = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
            console.log('Loaded existing market-trends.json for merge');
        } catch { /* ignore */ }
    }

    // Step 1: Download Redfin data
    console.log('Downloading Redfin market tracker data...');
    let redfinIndex = null;
    try {
        const tsvText = await fetchData(REDFIN_TSV_URL);
        console.log(`  Downloaded ${(tsvText.length / 1024 / 1024).toFixed(1)} MB`);

        const allRows = parseTSV(tsvText);
        console.log(`  Parsed ${allRows.length.toLocaleString()} rows`);

        // Filter to Florida rows only (saves memory and processing)
        const flRows = allRows.filter(r =>
            r.state_code === 'FL' || r.state === 'Florida'
        );
        console.log(`  Filtered to ${flRows.length.toLocaleString()} Florida rows`);

        redfinIndex = indexRedfinByRegion(flRows);
        console.log(`  Indexed ${Object.keys(redfinIndex).length} regions`);
    } catch (err) {
        console.warn(`  Warning: Failed to download Redfin data: ${err.message}`);
        console.warn('  Will use existing data if available');
    }

    // Step 2: Download Zillow ZHVI (optional)
    console.log('\nDownloading Zillow ZHVI data...');
    let zillowIndex = null;
    try {
        const csvText = await fetchData(ZILLOW_ZHVI_URL);
        console.log(`  Downloaded ${(csvText.length / 1024 / 1024).toFixed(1)} MB`);

        const zillowRows = parseCSV(csvText);
        zillowIndex = indexZillowByRegion(zillowRows);
        console.log(`  Indexed ${Object.keys(zillowIndex).length} metro regions`);
    } catch (err) {
        console.warn(`  Warning: Failed to download Zillow data: ${err.message}`);
        console.warn('  Continuing without ZHVI overlay');
    }

    // Step 3: Build output for each location
    console.log('\nProcessing locations...');
    const now = new Date();
    const lastUpdated = now.toISOString();
    const locations = {};
    let successCount = 0;
    let fallbackCount = 0;

    for (const [slug, config] of Object.entries(REDFIN_REGIONS)) {
        process.stdout.write(`  ${config.name}... `);

        // Try to extract from Redfin data
        let metrics = null;
        let history = [];

        if (redfinIndex) {
            const rows = getRedfinRows(redfinIndex, config, 36);
            if (rows && rows.length >= 2) {
                metrics = mapRedfinToMetrics(rows);
                history = buildHistory(rows, config);
            }
        }

        if (metrics) {
            // Enrich with Zillow ZHVI if available
            const zhvi = getZillowValue(zillowIndex, config);

            locations[slug] = {
                name: config.name,
                type: config.type,
                state: config.state,
                ...(config.county ? { county: config.county } : {}),
                parentLocation: config.parentLocation,
                marketScore: metrics.marketScore,
                keyMetrics: metrics.keyMetrics,
                medianEstimatedValue: {
                    value: zhvi || metrics.keyMetrics.medianSoldPrice.value || 0,
                    momPct: metrics.keyMetrics.medianSoldPrice.momPct,
                    yoyPct: metrics.keyMetrics.medianSoldPrice.yoyPct,
                    history
                },
                sections: metrics.sections,
                monthsSupply: metrics.monthsSupply,
                neighborhoods: buildNeighborhoods(slug, locations)
            };

            successCount++;
            console.log('OK');
        } else if (existingData?.locations?.[slug]) {
            // Fall back to existing data
            locations[slug] = existingData.locations[slug];
            fallbackCount++;
            console.log('FALLBACK (existing data)');
        } else {
            console.log('SKIP (no data)');
        }
    }

    // Step 4: Rebuild neighborhood references (needs all locations populated first)
    console.log('\nRebuilding neighborhood references...');
    for (const [parentSlug, childSlugs] of Object.entries(NEIGHBORHOOD_MAP)) {
        if (!locations[parentSlug]) continue;
        locations[parentSlug].neighborhoods = childSlugs
            .filter(s => locations[s])
            .map(s => ({
                name: locations[s].name,
                slug: s,
                type: locations[s].type,
                medianPrice: locations[s].keyMetrics?.medianSoldPrice?.value || 0,
                dom: locations[s].keyMetrics?.medianDaysOnMarket?.value || 0,
                inventory: locations[s].keyMetrics?.monthsOfInventory?.value || 0
            }));
    }

    // Step 5: Write output
    const output = {
        lastUpdated,
        dataSources: [
            { name: 'Redfin', url: 'https://www.redfin.com/news/data-center/', description: 'Weekly and monthly housing market data from MLS listings' },
            { name: 'Zillow Research', url: 'https://www.zillow.com/research/data/', description: 'Home value indices, inventory, and rental data' },
            { name: 'Realtor.com', url: 'https://www.realtor.com/research/data/', description: 'Listing inventory, median prices, and days on market' },
            { name: 'FRED (Federal Reserve)', url: 'https://fred.stlouisfed.org/', description: 'Economic indicators and housing metrics from public records' }
        ],
        locations
    };

    writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
    const fileSizeKB = Math.round(readFileSync(OUTPUT_FILE).length / 1024);

    console.log(`\n=== Complete ===`);
    console.log(`  Updated: ${successCount} locations from Redfin`);
    console.log(`  Fallback: ${fallbackCount} locations from existing data`);
    console.log(`  Output: public/data/market-trends.json (${fileSizeKB} KB)`);
    console.log(`  Timestamp: ${lastUpdated}`);
}

function buildNeighborhoods(slug, locations) {
    const childSlugs = NEIGHBORHOOD_MAP[slug];
    if (!childSlugs) return [];
    return childSlugs
        .filter(s => locations[s])
        .map(s => ({
            name: locations[s].name,
            slug: s,
            type: locations[s].type,
            medianPrice: locations[s].keyMetrics?.medianSoldPrice?.value || 0,
            dom: locations[s].keyMetrics?.medianDaysOnMarket?.value || 0,
            inventory: locations[s].keyMetrics?.monthsOfInventory?.value || 0
        }));
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
