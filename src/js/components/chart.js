// Lightweight chart utilities — no external dependencies
// Canvas line chart, SVG circular gauge, HTML bar gauge

/**
 * Draw a multi-series line chart on a canvas element
 * @param {string} canvasId - Canvas element ID
 * @param {Array} datasets - [{label, data: [{x, y}], color}]
 * @param {Object} options - {yPrefix: '$', ySuffix: '', formatY: fn}
 */
export function drawLineChart(canvasId, datasets, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = options.height || 280;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 20, bottom: 40, left: 65 };
    const chartW = width - pad.left - pad.right;
    const chartH = height - pad.top - pad.bottom;

    // Find value range across all datasets
    let allY = [];
    datasets.forEach(ds => ds.data.forEach(p => allY.push(p.y)));
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);
    const rangeY = maxY - minY || 1;
    const paddedMin = minY - rangeY * 0.05;
    const paddedMax = maxY + rangeY * 0.05;
    const paddedRange = paddedMax - paddedMin;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Format helper
    const formatY = options.formatY || ((v) => {
        const prefix = options.yPrefix || '';
        if (v >= 1000000000) return prefix + (v / 1000000000).toFixed(1) + 'B';
        if (v >= 1000000) return prefix + (v / 1000000).toFixed(1) + 'M';
        if (v >= 1000) return prefix + (v / 1000).toFixed(0) + 'K';
        return prefix + v.toFixed(0);
    });

    // Y-axis grid lines
    const ySteps = 5;
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#636366';
    ctx.font = '12px Roboto, sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= ySteps; i++) {
        const val = paddedMin + (paddedRange * i / ySteps);
        const y = pad.top + chartH - (chartH * i / ySteps);
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(pad.left + chartW, y);
        ctx.stroke();
        ctx.fillText(formatY(val), pad.left - 8, y + 4);
    }

    // X-axis labels
    const maxLabels = width < 500 ? 6 : 12;
    const xData = datasets[0]?.data || [];
    const labelStep = Math.max(1, Math.ceil(xData.length / maxLabels));
    ctx.textAlign = 'center';
    ctx.fillStyle = '#636366';

    xData.forEach((p, i) => {
        if (i % labelStep === 0 || i === xData.length - 1) {
            const x = pad.left + (chartW * i / (xData.length - 1 || 1));
            ctx.fillText(p.x, x, height - pad.bottom + 20);
        }
    });

    // Draw lines
    datasets.forEach(ds => {
        if (!ds.data.length) return;
        ctx.strokeStyle = ds.color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();

        ds.data.forEach((p, i) => {
            const x = pad.left + (chartW * i / (ds.data.length - 1 || 1));
            const y = pad.top + chartH - ((p.y - paddedMin) / paddedRange * chartH);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();
    });

    // Area fill for first dataset
    if (datasets[0]?.data.length) {
        const ds = datasets[0];
        ctx.beginPath();
        ds.data.forEach((p, i) => {
            const x = pad.left + (chartW * i / (ds.data.length - 1 || 1));
            const y = pad.top + chartH - ((p.y - paddedMin) / paddedRange * chartH);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.lineTo(pad.left + chartW, pad.top + chartH);
        ctx.lineTo(pad.left, pad.top + chartH);
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
        gradient.addColorStop(0, ds.color + '25');
        gradient.addColorStop(1, ds.color + '05');
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    // --- Interactive hover tooltip (HTML overlay) ---
    const chartInfo = { canvas, ctx, width, height, pad, chartW, chartH, paddedMin, paddedRange, datasets, dpr, formatY };

    // Ensure parent is positioned for overlay
    const wrapper = canvas.parentElement;
    if (wrapper && getComputedStyle(wrapper).position === 'static') {
        wrapper.style.position = 'relative';
    }

    // Create overlay canvas for crosshair + dots (same size, layered on top)
    let overlay = wrapper?.querySelector('.chart-overlay');
    if (!overlay) {
        overlay = document.createElement('canvas');
        overlay.className = 'chart-overlay';
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:' + width + 'px;height:' + height + 'px;pointer-events:none;z-index:2;';
        wrapper?.appendChild(overlay);
    }
    overlay.width = width * dpr;
    overlay.height = height * dpr;
    overlay.style.width = width + 'px';
    overlay.style.height = height + 'px';
    const oCtx = overlay.getContext('2d');

    // Create HTML tooltip element
    let tooltip = wrapper?.querySelector('.chart-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.style.cssText = 'position:absolute;z-index:3;pointer-events:none;opacity:0;transition:opacity 0.15s;background:#fff;border:1px solid #e0e0e0;border-radius:8px;padding:10px 14px;box-shadow:0 4px 12px rgba(0,0,0,0.10);font-family:Roboto,sans-serif;min-width:180px;';
        wrapper?.appendChild(tooltip);
    }

    function getDataIndex(mouseX) {
        const len = datasets[0]?.data.length || 0;
        if (!len) return -1;
        const rel = (mouseX - pad.left) / chartW;
        const idx = Math.round(rel * (len - 1));
        return Math.max(0, Math.min(len - 1, idx));
    }

    function showTooltip(mouseX) {
        const idx = getDataIndex(mouseX);
        if (idx < 0) return;

        const x = pad.left + (chartW * idx / (datasets[0].data.length - 1 || 1));

        // Draw crosshair + dots on overlay
        oCtx.setTransform(1, 0, 0, 1, 0, 0);
        oCtx.clearRect(0, 0, overlay.width, overlay.height);
        oCtx.scale(dpr, dpr);

        // Vertical crosshair line
        oCtx.strokeStyle = 'rgba(21, 35, 48, 0.20)';
        oCtx.lineWidth = 1;
        oCtx.setLineDash([4, 3]);
        oCtx.beginPath();
        oCtx.moveTo(x, pad.top);
        oCtx.lineTo(x, pad.top + chartH);
        oCtx.stroke();
        oCtx.setLineDash([]);

        // Dots on each line
        const points = [];
        datasets.forEach(ds => {
            if (!ds.data[idx]) return;
            const py = pad.top + chartH - ((ds.data[idx].y - paddedMin) / paddedRange * chartH);
            points.push({ y: py, color: ds.color, label: ds.label, value: ds.data[idx].y });

            // White outer ring
            oCtx.beginPath();
            oCtx.arc(x, py, 5, 0, Math.PI * 2);
            oCtx.fillStyle = '#fff';
            oCtx.fill();
            oCtx.strokeStyle = ds.color;
            oCtx.lineWidth = 2.5;
            oCtx.stroke();

            // Inner dot
            oCtx.beginPath();
            oCtx.arc(x, py, 2.5, 0, Math.PI * 2);
            oCtx.fillStyle = ds.color;
            oCtx.fill();
        });

        // Build HTML tooltip content
        if (points.length) {
            const dateLabel = datasets[0].data[idx].x;
            let html = '<div style="font-size:11px;color:#636366;margin-bottom:8px;">' + dateLabel + '</div>';
            points.forEach(p => {
                html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">'
                    + '<span style="width:8px;height:8px;border-radius:50%;background:' + p.color + ';flex-shrink:0;"></span>'
                    + '<span style="font-size:13px;color:#152330;flex:1;">' + p.label + '</span>'
                    + '<span style="font-size:13px;font-weight:700;color:#152330;">' + formatY(p.value) + '</span>'
                    + '</div>';
            });
            tooltip.innerHTML = html;

            // Position tooltip
            const tooltipRect = tooltip.getBoundingClientRect();
            const tw = tooltipRect.width || 190;
            const th = tooltipRect.height || 120;
            let tx = x + 16;
            let ty = Math.min(...points.map(p => p.y)) - th / 2;

            // Flip to left side if near right edge
            if (tx + tw > width - 8) tx = x - tw - 16;
            if (ty < pad.top) ty = pad.top;
            if (ty + th > pad.top + chartH) ty = pad.top + chartH - th;

            tooltip.style.left = tx + 'px';
            tooltip.style.top = ty + 'px';
            tooltip.style.opacity = '1';
        }
    }

    function hideTooltip() {
        oCtx.setTransform(1, 0, 0, 1, 0, 0);
        oCtx.clearRect(0, 0, overlay.width, overlay.height);
        tooltip.style.opacity = '0';
    }

    // Remove any previous listeners (for redraws)
    if (canvas._chartMouseMove) canvas.removeEventListener('mousemove', canvas._chartMouseMove);
    if (canvas._chartMouseLeave) canvas.removeEventListener('mouseleave', canvas._chartMouseLeave);

    canvas._chartMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left);
        if (mouseX >= pad.left && mouseX <= pad.left + chartW) {
            canvas.style.cursor = 'crosshair';
            showTooltip(mouseX);
        } else {
            canvas.style.cursor = '';
            hideTooltip();
        }
    };
    canvas._chartMouseLeave = () => {
        canvas.style.cursor = '';
        hideTooltip();
    };

    canvas.addEventListener('mousemove', canvas._chartMouseMove);
    canvas.addEventListener('mouseleave', canvas._chartMouseLeave);

    return chartInfo;
}

/**
 * Render a circular SVG gauge
 * @param {string} containerId - Container element ID
 * @param {number} value - Score 0-100
 * @param {Object} options - {size, label}
 */
export function drawCircularGauge(containerId, value, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const size = options.size || 160;
    const strokeWidth = options.strokeWidth || 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.max(0, Math.min(100, value)) / 100;

    // Color based on value or passed type
    let color;
    const type = options.type || (value <= 40 ? 'buyer' : value <= 60 ? 'balanced' : 'seller');
    if (type === 'buyer') color = 'var(--c-error)';
    else if (type === 'balanced') color = 'var(--c-warning)';
    else color = 'var(--c-success)';

    // Market type label
    let typeLabel = options.label || (type === 'buyer' ? "Buyer's Market" : type === 'seller' ? "Seller's Market" : 'Balanced Market');

    container.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="mt-gauge-svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
                fill="none" stroke="#f0f0f0" stroke-width="${strokeWidth}" />
            <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
                fill="none" stroke="${color}" stroke-width="${strokeWidth}"
                stroke-linecap="round"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                transform="rotate(-90 ${size / 2} ${size / 2})"
                class="mt-gauge-progress"
                data-target="${circumference - (circumference * progress)}" />
            <text x="${size / 2}" y="${size / 2 - 8}" text-anchor="middle"
                font-size="32" font-weight="700" fill="var(--c-primary)"
                font-family="ui-sans-serif, system-ui, sans-serif">${value}</text>
            <text x="${size / 2}" y="${size / 2 + 14}" text-anchor="middle"
                font-size="12" fill="var(--c-text-secondary)"
                font-family="Roboto, sans-serif">${typeLabel}</text>
        </svg>
    `;

    // Animate
    requestAnimationFrame(() => {
        const circle = container.querySelector('.mt-gauge-progress');
        if (circle) {
            circle.style.transition = 'stroke-dashoffset 1.2s ease-out';
            circle.style.strokeDashoffset = circle.dataset.target;
        }
    });
}

/**
 * Render a half-circle speedometer gauge (Market Pulse)
 * Semicircle opens upward: left = Buyer's, right = Seller's
 * Uses overlapping circle strokes with dasharray for color zones.
 * @param {string} containerId - Container element ID
 * @param {number} value - Score 0-100 (0=strong buyer, 100=strong seller)
 * @param {Object} options - {label, type}
 */
export function drawSpeedometer(containerId, value, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const size = 320;
    const cx = size / 2, cy = size / 2;
    const r = 130;
    const sw = 28; // stroke width
    const v = Math.max(0, Math.min(100, value));
    const halfCirc = Math.PI * r; // half circumference

    const type = options.type || (v <= 33 ? 'buyer' : v <= 66 ? 'balanced' : 'seller');
    const typeLabel = options.label || (type === 'buyer' ? "Buyer's Market" : type === 'seller' ? "Seller's Market" : 'Balanced Market');

    // Each zone is 20% of the half-circle
    // Circle starts at 3 o'clock (right) and goes clockwise by default.
    // rotate(-180) puts start at 9 o'clock (left). Then dasharray draws clockwise = left to right.
    // So zone order left→right: buyer(red) → orange → yellow → lime → seller(green)
    const zoneLen = halfCirc / 5;
    const zones = [
        { color: '#f75353', offset: 0 },
        { color: '#FF9B77', offset: zoneLen },
        { color: '#d97706', offset: zoneLen * 2 },
        { color: '#81c797', offset: zoneLen * 3 },
        { color: '#5a9e6f', offset: zoneLen * 4 }
    ];

    // Build zone circles: each is a full circle with dasharray showing only its segment
    const zonesSvg = zones.map(z =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
            stroke="${z.color}" stroke-width="${sw}"
            stroke-dasharray="${zoneLen} ${2 * Math.PI * r - zoneLen}"
            stroke-dashoffset="${-z.offset}"
            transform="rotate(-180 ${cx} ${cy})"/>`
    ).join('\n');

    // Tick marks at 0%, 25%, 50%, 75%, 100%
    const ticksSvg = [0, 25, 50, 75, 100].map(pct => {
        // angle: 0%=180° (left), 100%=0° (right), measured from +x axis CCW
        const angleDeg = 180 - (pct / 100) * 180;
        const rad = angleDeg * Math.PI / 180;
        const x1 = cx - (r + 6) * Math.cos(rad);
        const y1 = cy - (r + 6) * Math.sin(rad);
        const x2 = cx - (r - 6) * Math.cos(rad);
        const y2 = cy - (r - 6) * Math.sin(rad);
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#c8c8c8" stroke-width="1.5"/>`;
    }).join('\n');

    // Needle: points from center outward
    // value 0 → point left (180°), value 100 → point right (0°)
    // CSS rotation on the needle line (which points straight up by default):
    //   rotate(-90deg) = point left, rotate(0deg) = point up, rotate(90deg) = point right
    // So target = -90 + (v/100)*180
    const needleLen = r - 22;
    const startRotate = -90; // start pointing left
    const targetRotate = -90 + (v / 100) * 180;

    // Viewbox: show only top half + a bit of padding
    const vbX = cx - r - sw;
    const vbY = cy - r - sw;
    const vbW = (r + sw) * 2;
    const vbH = r + sw + 14;

    container.innerHTML = `
        <div class="mt-speedometer">
            <svg viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${vbW}" height="${vbH}">
                <!-- Background track -->
                <circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
                    stroke="#ececec" stroke-width="${sw + 4}"
                    stroke-dasharray="${halfCirc} ${halfCirc}"
                    transform="rotate(-180 ${cx} ${cy})"
                    stroke-linecap="round"/>

                <!-- Color zones -->
                ${zonesSvg}

                <!-- Round caps on ends -->
                <circle cx="${cx - r}" cy="${cy}" r="${sw / 2}" fill="#f75353"/>
                <circle cx="${cx + r}" cy="${cy}" r="${sw / 2}" fill="#5a9e6f"/>


                <!-- Tick marks -->
                ${ticksSvg}

                <!-- Needle (starts pointing left, animates to target) -->
                <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - needleLen}"
                    stroke="rgba(0,0,0,0.08)" stroke-width="5" stroke-linecap="round"
                    class="mt-speedo-needle"
                    style="transform-origin:${cx}px ${cy}px;transform:rotate(${startRotate}deg)"/>
                <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - needleLen}"
                    stroke="var(--c-primary)" stroke-width="3" stroke-linecap="round"
                    class="mt-speedo-needle"
                    style="transform-origin:${cx}px ${cy}px;transform:rotate(${startRotate}deg)"/>

                <!-- Center cap -->
                <circle cx="${cx}" cy="${cy}" r="10" fill="var(--c-primary)"/>
                <circle cx="${cx}" cy="${cy}" r="5" fill="white"/>

            </svg>
            <div class="mt-speedo-ends">
                <span>Buyer's</span>
                <span>Seller's</span>
            </div>
            <div class="mt-speedo-label">
                <div class="mt-speedo-value">${v}</div>
                <div class="mt-speedo-type">${typeLabel}</div>
            </div>
        </div>
    `;

    // Animate needle
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            container.querySelectorAll('.mt-speedo-needle').forEach(n => {
                n.style.transition = 'transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                n.style.transform = `rotate(${targetRotate}deg)`;
            });
        });
    });
}

/**
 * Render a horizontal bar gauge for Months Supply of Inventory
 * @param {string} containerId - Container element ID
 * @param {number} value - MSI value
 * @param {Object} options - {max}
 */
export function drawBarGauge(containerId, value, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const max = options.max || 12;
    const pct = Math.min(100, (value / max) * 100);

    // Determine zone
    let zone, zoneColor;
    if (value < 4) { zone = "Seller's Market"; zoneColor = 'var(--c-success)'; }
    else if (value <= 6) { zone = 'Balanced Market'; zoneColor = 'var(--c-warning)'; }
    else { zone = "Buyer's Market"; zoneColor = 'var(--c-error)'; }

    container.innerHTML = `
        <div class="mt-bar-gauge">
            <div class="mt-bar-gauge-track">
                <div class="mt-bar-gauge-zone mt-bar-gauge-seller" style="width:33.3%"></div>
                <div class="mt-bar-gauge-zone mt-bar-gauge-balanced" style="width:16.7%"></div>
                <div class="mt-bar-gauge-zone mt-bar-gauge-buyer" style="width:50%"></div>
                <div class="mt-bar-gauge-marker" style="left:0%" data-target="${pct}">
                    <div class="mt-bar-gauge-marker-label">${value.toFixed(1)}</div>
                </div>
            </div>
            <div class="mt-bar-gauge-labels">
                <span>Seller's</span>
                <span>Balanced</span>
                <span>Buyer's</span>
            </div>
        </div>
    `;

    // Animate marker sliding to target position
    requestAnimationFrame(() => {
        const marker = container.querySelector('.mt-bar-gauge-marker');
        if (marker) {
            marker.style.left = marker.dataset.target + '%';
        }
    });
}
