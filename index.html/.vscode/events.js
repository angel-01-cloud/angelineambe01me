let events = JSON.parse(localStorage.getItem('fc_events') || 'null') || [
  {id:1, title:"Youth Fire Night - Worship & Word", cat:"Youth", date:"2026-10-10", time:"18:00", location:"Douala Main Hall", desc:"A night of intense worship, word and prayer for youths. Don't come alone.", registered:false},
  {id:2, title:"Bible Study Conference 2026", cat:"Conference", date:"2026-11-02", time:"09:00", location:"Bonaberi Campus", desc:"Deep dive into Book of Romans with Pastor John. Free books for first 50.", registered:false},
  {id:3, title:"Street Evangelism - Douala Outreach", cat:"Outreach", date:"2026-10-18", time:"14:00", location:"Akwa Market", desc:"We go out to win souls. T-shirts and flyers provided.", registered:true},
  {id:4, title:"All Night Worship - No Sleep", cat:"Worship", date:"2026-10-25", time:"21:00", location:"Main Auditorium", desc:"6 hours non-stop worship. Come with your burden.", registered:false}
];

let activeCat = "all";

function save(){ localStorage.setItem('fc_events', JSON.stringify(events)); }

function formatDate(d){
  const dt = new Date(d);
  return { day: dt.getDate(), month: dt.toLocaleString('en',{month:'short'}).toUpperCase(), full: dt.toLocaleDateString() };
}

function renderEvents(list){
  document.getElementById('eventList').innerHTML = list.map(e=>{
    const fd = formatDate(e.date);
    const diff = Math.ceil((new Date(e.date) - new Date()) / (1000*60*60*24));
    const cd = diff>0? `${diff} days left` : diff===0? "Today!" : "Past";
    return `
    <div class="event">
      <div class="date-box">
        <div><b>${fd.day}</b><br><span>${fd.month}</span></div>
      </div>
      <div class="event-body">
        <div class="event-top">
          <span class="tag tag-${e.cat.toLowerCase()}">${e.cat}</span>
          <small style="color:#94a3b8">${e.time} • ${e.location}</small>
        </div>
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <div class="event-meta">
          <span>📍 ${e.location}</span>
          <span>⏰ ${e.time}</span>
        </div>
        <span class="countdown">${cd}</span>
        <div class="event-actions">
          <button class="btn ${e.registered?'btn-black':'btn-blue'}" onclick="toggleReg(${e.id})" style="flex:1">
            ${e.registered?'✅ Registered':'Register Now'}
          </button>
          <button class="btn btn-outline" onclick="deleteEvent(${e.id})">Delete</button>
        </div>
      </div>
    </div>
    `;
  }).join('') || `<div class="card" style="text-align:center;color:#64748b">No events in this category.</div>`;

  document.getElementById('statTotal').textContent = events.length;
  document.getElementById('statReg').textContent = events.filter(x=>x.registered).length;
  if(events.length){
    const next = [...events].sort((a,b)=> new Date(a.date)-new Date(b.date)).find(x=> new Date(x.date)>=new Date()) || events[0];
    document.getElementById('statNext').textContent = next.title.substring(0,20)+"...";
    const diff = Math.ceil((new Date(next.date)-new Date())/(1000*60*60*24));
    document.getElementById('nextCountdown').textContent = `Next: ${next.title} in ${diff>0?diff+' days':'Today!'}`;
  }
}

function getFiltered(){
  let list = events;
  if(activeCat==="registered") list = list.filter(e=>e.registered);
  else if(activeCat!=="all") list = list.filter(e=>e.cat===activeCat);
  list = [...list].sort((a,b)=> new Date(a.date)-new Date(b.date));
  return list;
}

window.toggleReg = function(id){
  const e = events.find(x=>x.id===id);
  e.registered =!e.registered;
  save(); renderEvents(getFiltered());
}
window.deleteEvent = function(id){
  if(!confirm("Delete this event?")) return;
  events = events.filter(x=>x.id!==id);
  save(); renderEvents(getFiltered());
}

document.getElementById('postEvent').onclick = ()=>{
  const title = document.getElementById('eTitle').value.trim();
  const cat = document.getElementById('eCat').value;
  const date = document.getElementById('eDate').value;
  const time = document.getElementById('eTime').value;
  const location = document.getElementById('eLocation').value.trim();
  const desc = document.getElementById('eDesc').value.trim();
  if(!title ||!date ||!time ||!location ||!desc) return alert("Fill all fields");
  events.unshift({id:Date.now(), title, cat, date, time, location, desc, registered:false});
  save();
  document.getElementById('eTitle').value=""; document.getElementById('eLocation').value=""; document.getElementById('eDesc').value="";
  activeCat="all";
  document.querySelectorAll('.filter').forEach(f=>f.classList.remove('active'));
  document.querySelector('[data-cat="all"]').classList.add('active');
  renderEvents(getFiltered());
}

document.querySelectorAll('.filter').forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderEvents(getFiltered());
  }
});

document.getElementById('calDate').onchange = function(){
  const val = this.value;
  const found = events.filter(e=>e.date===val);
  document.getElementById('calInfo').innerHTML = found.length?
    found.map(f=>`🔥 <b>${f.title}</b> at ${f.time} - ${f.location}`).join('<br>') :
    "No event on this date. Create one.";
}

renderEvents(getFiltered());
