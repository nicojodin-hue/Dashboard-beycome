import store from '../store.js';
import { toggleMenu, formatHour, formatTime, formatDate, closeModal, showMobileToast, isDesktopView } from '../utils.js';
import { showMessageModal } from '../components/modals.js';

let currentCalendarDate = new Date(2026, 1, 1);
let currentCalendarView = 'month';
let selectedProperties = ['all'];
let selectedEventData = null;

export function render() {
    return `<div class="calendar-page-header">
        <div class="calendar-header-left">
            <div class="calendar-nav">
                <button class="calendar-nav-btn" id="calPrevBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                <h2 class="calendar-title" id="calendarTitle">February 2026</h2>
                <button class="calendar-nav-btn" id="calNextBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
            <button class="calendar-today-btn" id="calTodayBtn">Today</button>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
            <button class="btn btn-p calendar-add-btn" id="calAddEventBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Event
            </button>
            <div class="property-filter-dropdown" id="calendarPropertyFilter">
                <button class="filter-btn" id="calPropertyFilterBtn">
                    <span id="propertyFilterText">All Properties</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="menu" id="propertyFilterMenu"></div>
            </div>
            <div class="calendar-view-toggle">
                <button class="calendar-view-btn active" id="monthViewBtn">Month</button>
                <button class="calendar-view-btn" id="weekViewBtn">Week</button>
            </div>
        </div>
    </div>
    <div class="calendar-legend">
        <div class="legend-item"><span class="legend-dot" style="background: var(--c-success);"></span>Showings</div>
        <div class="legend-item"><span class="legend-dot" style="background: var(--c-accent);"></span>Milestones</div>
        <div class="legend-item"><span class="legend-dot" style="background: #f59e0b;"></span>Deadlines</div>
        <div class="legend-item"><span class="legend-dot" style="background: var(--c-pink);"></span>Closing</div>
    </div>
    <div class="calendar-page-body">
        <div class="calendar-month-view active" id="monthView">
            <div class="calendar-weekdays">
                <div class="calendar-weekday">Sun</div><div class="calendar-weekday">Mon</div><div class="calendar-weekday">Tue</div><div class="calendar-weekday">Wed</div><div class="calendar-weekday">Thu</div><div class="calendar-weekday">Fri</div><div class="calendar-weekday">Sat</div>
            </div>
            <div class="calendar-grid" id="calendarGrid"></div>
        </div>
        <div class="calendar-week-view" id="weekView">
            <div class="week-grid" id="weekGrid"></div>
        </div>
    </div>`;
}

export function init() {
    document.getElementById('calPrevBtn')?.addEventListener('click', () => { if (currentCalendarView === 'month') currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); else currentCalendarDate.setDate(currentCalendarDate.getDate() - 7); renderCalendar(); });
    document.getElementById('calNextBtn')?.addEventListener('click', () => { if (currentCalendarView === 'month') currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); else currentCalendarDate.setDate(currentCalendarDate.getDate() + 7); renderCalendar(); });
    document.getElementById('calTodayBtn')?.addEventListener('click', () => { currentCalendarDate = new Date(2026, 0, 30); renderCalendar(); });
    document.getElementById('calAddEventBtn')?.addEventListener('click', () => {
        const td = new Date();
        document.getElementById('addEventDate').value = td.getFullYear() + '-' + String(td.getMonth() + 1).padStart(2, '0') + '-' + String(td.getDate()).padStart(2, '0');
        document.getElementById('addEventModal').classList.add('show');
    });
    document.getElementById('monthViewBtn')?.addEventListener('click', () => switchView('month'));
    document.getElementById('weekViewBtn')?.addEventListener('click', () => switchView('week'));
    document.getElementById('calPropertyFilterBtn')?.addEventListener('click', (e) => { toggleMenu('propertyFilterMenu', e); renderPropertyFilter(); });

    // Event popover message button
    document.getElementById('eventMessageBtn')?.addEventListener('click', () => {
        if (!selectedEventData) return;
        const e = selectedEventData;
        document.getElementById('eventPopover').style.display = 'none';
        showMessageModal(e.person, e.title, e.email, e.phone, 'Visit at');
    });

    currentCalendarDate = new Date(2026, 1, 1);
    renderCalendar();
}

function switchView(v) {
    currentCalendarView = v;
    document.getElementById('monthViewBtn').classList.toggle('active', v === 'month');
    document.getElementById('weekViewBtn').classList.toggle('active', v === 'week');
    document.getElementById('monthView').classList.toggle('active', v === 'month');
    document.getElementById('weekView').classList.toggle('active', v === 'week');
    renderCalendar();
}

export function renderCalendar() {
    const y = currentCalendarDate.getFullYear();
    const mo = currentCalendarDate.getMonth();
    const mn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendarTitle').textContent = mn[mo] + ' ' + y;
    if (currentCalendarView === 'month') renderMonthView(y, mo);
    else renderWeekView(y, mo);
}

function renderMonthView(y, mo) {
    const g = document.getElementById('calendarGrid');
    const fd = new Date(y, mo, 1);
    const sd = new Date(fd);
    sd.setDate(sd.getDate() - fd.getDay());
    const td = new Date();
    const events = store.getEvents();
    let h = '';
    for (let i = 0; i < 42; i++) {
        const d = new Date(sd); d.setDate(sd.getDate() + i);
        const om = d.getMonth() !== mo;
        const it = d.toDateString() === td.toDateString();
        const de = getEventsForDate(d, events);
        let cl = 'calendar-day'; if (om) cl += ' other-month'; if (it) cl += ' today';
        h += '<div class="' + cl + '"><div class="calendar-day-number">' + d.getDate() + '</div><div class="calendar-events">';
        de.slice(0, 2).forEach(e => { const sc = e.status === 'pending' ? ' pending' : ''; h += '<div class="calendar-event ' + e.type + sc + '" data-event-id="' + e.id + '">' + e.shortTitle + '</div>'; });
        if (de.length > 2) h += '<div class="calendar-more">+' + (de.length - 2) + ' more</div>';
        h += '</div></div>';
        if (i >= 34 && d.getMonth() !== mo) break;
    }
    g.innerHTML = h;
    g.querySelectorAll('.calendar-event[data-event-id]').forEach(el => {
        el.addEventListener('click', (e) => { e.stopPropagation(); showEventPopover(parseInt(el.dataset.eventId), el); });
    });
}

function renderWeekView(y, mo) {
    const g = document.getElementById('weekGrid');
    const sw = new Date(currentCalendarDate); sw.setDate(sw.getDate() - sw.getDay());
    const td = new Date();
    const dn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const events = store.getEvents();
    let h = '<div class="week-header"><div class="week-header-cell"></div>';
    for (let i = 0; i < 7; i++) { const d = new Date(sw); d.setDate(sw.getDate() + i); const it = d.toDateString() === td.toDateString(); h += '<div class="week-header-cell' + (it ? ' today' : '') + '"><div class="day-name">' + dn[i] + '</div><div class="day-number">' + d.getDate() + '</div></div>'; }
    h += '</div>';
    for (let hr = 8; hr <= 18; hr++) {
        h += '<div class="week-time-slot">' + formatHour(hr) + '</div>';
        for (let day = 0; day < 7; day++) {
            const d = new Date(sw); d.setDate(sw.getDate() + day);
            const de = events.filter(e => e.date.getFullYear() === d.getFullYear() && e.date.getMonth() === d.getMonth() && e.date.getDate() === d.getDate() && e.date.getHours() === hr);
            h += '<div class="week-day-col"><div class="week-hour-row">';
            de.forEach(e => { const sc = e.status === 'pending' ? ' pending' : ''; const et = e.date.getHours() + (e.date.getMinutes() / 60); const top = (et - hr) * 60; h += '<div class="week-event ' + e.type + sc + '" style="top: ' + top + 'px; height: 50px;" data-event-id="' + e.id + '"><div class="week-event-time">' + formatTime(e.date) + '</div><div class="week-event-title">' + e.shortTitle + '</div></div>'; });
            h += '</div></div>';
        }
    }
    g.innerHTML = h;
    g.querySelectorAll('.week-event[data-event-id]').forEach(el => {
        el.addEventListener('click', (e) => { e.stopPropagation(); showEventPopover(parseInt(el.dataset.eventId), el); });
    });
}

function getEventsForDate(d, events) {
    return events.filter(e => e.date.getFullYear() === d.getFullYear() && e.date.getMonth() === d.getMonth() && e.date.getDate() === d.getDate() && (selectedProperties.includes('all') || selectedProperties.includes(e.property)));
}

function showEventPopover(eid, el) {
    const events = store.getEvents();
    const e = events.find(x => x.id === eid);
    if (!e) return;
    selectedEventData = e;
    const sl = e.status === 'confirmed' ? 'Confirmed' : (e.status === 'completed' ? 'Completed' : (e.status === 'upcoming' ? 'Upcoming' : 'Pending'));
    const sc = (e.status === 'confirmed' || e.status === 'completed') ? 'confirmed' : 'pending';
    document.getElementById('eventPopoverBadge').textContent = sl;
    document.getElementById('eventPopoverBadge').className = 'event-popover-badge ' + sc;
    document.getElementById('eventPopoverTitle').innerHTML = e.title;
    document.getElementById('eventPopoverDate').textContent = formatDate(e.date);
    document.getElementById('eventPopoverTime').textContent = formatTime(e.date);
    document.getElementById('eventPopoverPerson').innerHTML = e.person ? '<strong>' + e.person + '</strong>' : '<em>No contact</em>';
    const pop = document.getElementById('eventPopover');
    const rect = el.getBoundingClientRect();
    let left = rect.left, top = rect.bottom + 8;
    if (left + 320 > window.innerWidth) left = window.innerWidth - 336;
    if (top + 280 > window.innerHeight) top = rect.top - 280;
    pop.style.left = Math.max(16, left) + 'px';
    pop.style.top = top + 'px';
    pop.style.display = 'block';
}

function renderPropertyFilter() {
    const props = store.get('properties') || [];
    document.getElementById('propertyFilterMenu').innerHTML = props.map(p =>
        '<button class="property-filter-item ' + (selectedProperties.includes(p.id) ? 'active' : '') + '" data-prop-id="' + p.id + '"><span class="property-name">' + (p.id === 'all' ? p.name : p.name.split(',')[0]) + '</span></button>'
    ).join('');
    document.querySelectorAll('#propertyFilterMenu .property-filter-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pid = btn.dataset.propId;
            if (pid === 'all') selectedProperties = ['all'];
            else { if (selectedProperties.includes('all')) selectedProperties = [pid]; else if (selectedProperties.includes(pid)) { selectedProperties = selectedProperties.filter(p => p !== pid); if (selectedProperties.length === 0) selectedProperties = ['all']; } else selectedProperties.push(pid); }
            let text = 'All Properties';
            if (!selectedProperties.includes('all')) text = selectedProperties.length === 1 ? selectedProperties[0].split(',')[0] : selectedProperties.length + ' Properties';
            document.getElementById('propertyFilterText').textContent = text;
            renderPropertyFilter();
            renderCalendar();
        });
    });
}

// Expose for external use
export { renderCalendar as rerender };
