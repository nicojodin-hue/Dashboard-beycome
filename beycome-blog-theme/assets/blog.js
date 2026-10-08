!function(){"use strict";var e=document.getElementById("bc-progress-bar");if(e){function p(){var t=document.getElementById("bc-article");if(t){var n=t.getBoundingClientRect().top+window.scrollY,o=t.offsetHeight,c=window.scrollY-n+.2*window.innerHeight,i=Math.min(100,Math.max(0,c/o*100));e.style.width=i+"%"}}window.addEventListener("scroll",p,{passive:!0}),p()}var t=document.getElementById("bc-toc-nav"),n=document.getElementById("bc-article");if(t&&n){var o=n.querySelectorAll("h2, h3");if(o.length<2){var c=document.getElementById("bc-toc");c&&(c.style.display="none")}else{o.forEach(function(e,n){e.id||(e.id="section-"+n);var o=document.createElement("a");o.href="#"+e.id,o.textContent=e.textContent;var c=document.createElement("div");c.className="H3"===e.tagName?"bc-toc-item bc-toc-item-sub":"bc-toc-item",c.appendChild(o),t.appendChild(c)});var i=t.querySelectorAll("a");function f(){var e=window.scrollY+160,t=null;o.forEach(function(n){n.offsetTop<=e&&(t=n.id)}),i.forEach(function(e){e.classList.toggle("active",e.hash==="#"+t)})}window.addEventListener("scroll",f,{passive:!0}),f(),t.addEventListener("click",function(e){var t=e.target.closest("a");if(t&&t.hash){var n=document.querySelector(t.hash);n&&(e.preventDefault(),n.scrollIntoView({behavior:"smooth",block:"start"}))}})}}var a=document.getElementById("bc-copy-link");a&&a.addEventListener("click",function(){navigator.clipboard.writeText(window.location.href).then(function(){var e=a.textContent;a.textContent="Copied!",setTimeout(function(){a.textContent=e},2e3)})});var s=document.getElementById("bc-hsearch"),l=document.getElementById("bc-hsearch-btn"),r=document.getElementById("bc-hsearch-input");s&&l&&r&&(l.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),s.classList.contains("open")?r.value.trim()?s.submit():s.classList.remove("open"):(s.classList.add("open"),setTimeout(function(){r.focus()},150))}),r.addEventListener("keydown",function(e){"Escape"===e.key&&(s.classList.remove("open"),r.value="")}),document.addEventListener("click",function(e){s.classList.contains("open")&&!s.contains(e.target)&&(s.classList.remove("open"),r.value="")}));var d=document.getElementById("bc-mobile-menu-btn"),u=document.getElementById("bc-mobile-menu");if(d&&u){var m=d.querySelector(".bc-menu-icon-open"),v=d.querySelector(".bc-menu-icon-close");d.addEventListener("click",function(){var e=u.classList.toggle("open");u.style.display=e?"block":"none",d.setAttribute("aria-expanded",e),m&&(m.style.display=e?"none":"block"),v&&(v.style.display=e?"block":"none")}),document.addEventListener("click",function(e){!u.classList.contains("open")||u.contains(e.target)||d.contains(e.target)||(u.classList.remove("open"),u.style.display="none",d.setAttribute("aria-expanded","false"),m&&(m.style.display="block"),v&&(v.style.display="none"))})}}();
!function(){var a=document.getElementById('bc-article');if(!a)return;a.querySelectorAll('table').forEach(function(t){var outer=document.createElement('div');outer.className='bc-table-outer';t.parentNode.insertBefore(outer,t);var shadow=document.createElement('div');shadow.className='bc-table-shadow';outer.appendChild(shadow);var w=document.createElement('div');w.className='bc-table-wrap';shadow.appendChild(w);w.appendChild(t);
// Promote first all-th row to thead if no thead exists
if(!t.querySelector('thead')){var firstRow=t.querySelector('tr');if(firstRow&&!firstRow.querySelector('td')){var thead=document.createElement('thead');var tbody=firstRow.parentNode;tbody.removeChild(firstRow);thead.appendChild(firstRow);t.insertBefore(thead,tbody);}}
// Mark rank tables (first column cells are all short numbers) so CSS can hide col 1 on mobile
var firstDataCells=Array.prototype.slice.call(t.querySelectorAll('tbody tr td:first-child,tbody tr th:first-child'));if(firstDataCells.length>0&&firstDataCells.every(function(c){return /^\s*\d{1,2}\s*$/.test(c.textContent);})){t.classList.add('bc-table-ranked');}
// sticky col 2: only when table overflows (needs scrolling)
function setCol2Left(){var isRanked=t.classList.contains('bc-table-ranked');if(w.scrollWidth<=w.clientWidth){t.querySelectorAll('td:first-child,th:first-child,td:nth-child(2),th:nth-child(2)').forEach(function(cell){cell.style.position='';cell.style.left='';cell.style.zIndex='';cell.style.boxShadow='';});return;}if(isRanked){var l=0;t.querySelectorAll('td:first-child,tbody th:first-child').forEach(function(c){l=Math.max(l,Math.ceil(c.getBoundingClientRect().width));});t.querySelectorAll('td:nth-child(2),th:nth-child(2)').forEach(function(cell){cell.style.position='sticky';cell.style.left=l+'px';});}else{t.querySelectorAll('td:first-child,th:first-child').forEach(function(cell){cell.style.position='sticky';cell.style.left='0';cell.style.zIndex='1';cell.style.boxShadow='4px 0 8px -4px rgba(0,0,0,0.07)';});t.querySelectorAll('thead th:first-child').forEach(function(cell){cell.style.zIndex='2';});}}
window.addEventListener('load',setCol2Left,{once:true});window.addEventListener('resize',setCol2Left,{passive:true});if(window.ResizeObserver){var ro2=new ResizeObserver(setCol2Left);ro2.observe(t);ro2.observe(w);}
// custom scrollbar
var track=document.createElement('div');track.className='bc-sb-track';var thumb=document.createElement('div');thumb.className='bc-sb-thumb';track.appendChild(thumb);var figParent=outer.parentNode;figParent.parentNode.insertBefore(track,figParent.nextSibling);
function updateThumb(){var ratio=w.scrollLeft/(w.scrollWidth-w.clientWidth)||0;var thumbW=Math.max(40,w.clientWidth/w.scrollWidth*track.clientWidth);thumb.style.width=thumbW+'px';thumb.style.left=ratio*(track.clientWidth-thumbW)+'px';}
function updateScrollbar(){var hasOverflow=w.scrollWidth>w.clientWidth;track.style.display=hasOverflow?'':'none';if(hasOverflow)updateThumb();}
updateScrollbar();w.addEventListener('scroll',updateThumb,{passive:true});window.addEventListener('load',updateScrollbar,{once:true});setTimeout(updateScrollbar,500);window.addEventListener('resize',updateScrollbar,{passive:true});if(window.ResizeObserver){var ro=new ResizeObserver(updateScrollbar);ro.observe(t);ro.observe(w);}
// drag
var dragging=false,startX=0,startScroll=0;
thumb.addEventListener('pointerdown',function(e){dragging=true;startX=e.clientX;startScroll=w.scrollLeft;thumb.setPointerCapture(e.pointerId);e.preventDefault();});
thumb.addEventListener('pointermove',function(e){if(!dragging)return;var dx=e.clientX-startX;var ratio=dx/(track.clientWidth-thumb.offsetWidth);w.scrollLeft=startScroll+ratio*(w.scrollWidth-w.clientWidth);});
thumb.addEventListener('pointerup',function(){dragging=false;});
track.addEventListener('click',function(e){if(e.target===thumb)return;var rect=track.getBoundingClientRect();var ratio=(e.clientX-rect.left-thumb.offsetWidth/2)/(track.clientWidth-thumb.offsetWidth);w.scrollLeft=Math.max(0,ratio)*(w.scrollWidth-w.clientWidth);});
});}();
!function(){var a=document.getElementById('bc-article');if(!a)return;
// Hide disclaimer block
a.querySelectorAll('blockquote,p,div').forEach(function(el){if(el.textContent.indexOf('Note from the author')!==-1||el.textContent.indexOf('policy to refrain from making any comparative')!==-1){var p=el.parentNode;while(p&&p!==a){if(p.tagName==='BLOCKQUOTE'||p.tagName==='DIV'){el=p;break;}p=p.parentNode;}el.style.display='none';}});
// Hide 'Sell smarter / Buy smarter' CTA block inside article
a.querySelectorAll('div,section,figure,p').forEach(function(el){if((el.textContent.indexOf('Sell smarter')!==-1||el.textContent.indexOf('Buy smarter')!==-1)&&el.querySelector('a[href]')){el.style.display='none';}});
// Split '$249+0,5% at closing' onto 2 lines
a.querySelectorAll('td').forEach(function(td){var h=td.innerHTML;var r=h.replace(/(\$249[^<]*?%)\s*(at closing)/i,'$1<br>$2');if(r!==h)td.innerHTML=r;r=td.innerHTML;var r2=r.replace(/(\$99)\s+(Flat Fee)/i,'$1<br>$2');if(r2!==r)td.innerHTML=r2;});
// Enforce strict alternating row backgrounds — skip header rows (th-only rows)
a.querySelectorAll('.bc-table-wrap table').forEach(function(table){
  var allRows=table.querySelectorAll('tr');
  var dataRows=Array.prototype.filter.call(allRows,function(r){return r.querySelectorAll('td').length>0;});
  dataRows.forEach(function(row,i){
    var bg=i%2===0?'#ffffff':'#f6f6f7';
    row.querySelectorAll('td,th').forEach(function(td){td.style.backgroundColor=bg;});
  });
});
// Highlight specific Houzeo pricing values in red
a.querySelectorAll('td').forEach(function(td){
  var h=td.innerHTML;
  var terms=[
    /(\$249)/g,
    /(0[,.]5%)/g,
    /(6 months)/gi,
    /(\$50)/g,
    /(24)/g,
    /(49)/g
  ];
  terms.forEach(function(re){h=h.replace(re,'<span style="color:var(--c-error);font-weight:700">$1</span>');});
  td.innerHTML=h;
});
// Center all non-first-column cells (Houzeo + beycome columns)
a.querySelectorAll('td:not(:first-child),th:not(:first-child)').forEach(function(c){c.style.textAlign='center';});
// In tables, clear cells that contain only pricing noise like '$349 +1.25%'
a.querySelectorAll('td').forEach(function(td){var t=td.textContent.trim();if(t.indexOf('349')!==-1&&t.indexOf('1.25')!==-1){td.innerHTML='';}});
}();
