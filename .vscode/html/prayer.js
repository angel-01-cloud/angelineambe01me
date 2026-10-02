let prayers = JSON.parse(localStorage.getItem('fc_prayers')) || [
  {id:1, name:"Anonymous", cat:"Youth", text:"Pray for me, I want to keep my fire burning for God as a youth.", prayed:false, date:"Today"},
  {id:2, name:"Sarah M.", cat:"Exams", text:"I have my Baccalaureate exams next week, please pray for wisdom and peace.", prayed:false, date:"Today"},
  {id:3, name:"David", cat:"Family", text:"My family is going through difficult times. Pray for unity.", prayed:false, date:"Yesterday"},
  {id:4, name:"Grace", cat:"Healing", text:"Pray for my mum, she is sick. God is our healer.", prayed:false, date:"Yesterday"}
];

const ytVideos = [
  {title:"How to Pray Effectively", id:"hC5zfPzt_a4"},
  {title:"Why Prayer Works - Power of Agreement", id:"hbk70u5o4Lc"},
  {title:"Prayer for Youth - Overcoming Anxiety", id:"aIgFoKyeQI0".replace(/--/g,'-')}, 
  {title:"Night Prayer for Peace", id:"Zmnk469qf7s"}
];
const realVideos = [
  {title:"How To Pray | Effective Prayer", id:"hC5zfPzt_a4"},
  {title:"Power of Prayer - Motivational", id:"hbk70u5o4Lc"},
  {title:"Warfare Prayer For Youth", id:"aIgFoKyeQI0"},
  {title:"Morning Prayer", id:"Zmnk469qf7s"}
];

function renderPrayers(list){
  if(list.length===0){
    document.getElementById('prayerList').innerHTML = `<div class="card" style="text-align:center;color:#64748b">No prayers in this category yet. Be first to post.</div>`;
    return;
  }
  document.getElementById('prayerList').innerHTML = list.map(p=>`
    <div class="prayer">
      <div class="prayer-top">
        <b>${p.name} <span class="tag">${p.cat}</span></b>
        <small>${p.date}</small>
      </div>
      <p>${p.text}</p>
      <div class="prayer-actions">
        <button class="btn ${p.prayed?'prayed':'btn-blue'}" onclick="pray(${p.id})">${p.prayed?'Prayed 🙏 ✅':'I Prayed For This 🙏'}</button>
        <button class="btn btn-black" onclick="sharePrayer(${p.id})">Share</button>
      </div>
    </div>
  `).join('');
}

function renderVideos(){
  document.getElementById('videoGrid').innerHTML = realVideos.map(v=>`
    <div class="video">
      <iframe src="https://www.youtube-nocookie.com/embed/${v.id}?rel=0" allowfullscreen loading="lazy"></iframe>
      <div class="video-info"><h4>${v.title}</h4></div>
    </div>
  `).join('');
}

window.pray = function(id){
  const p = prayers.find(x=>x.id===id);
  if(p) p.prayed = !p.prayed;
  localStorage.setItem('fc_prayers', JSON.stringify(prayers));
  renderPrayers(filtered());
}
window.sharePrayer = function(id){
  const p = prayers.find(x=>x.id===id);
  navigator.clipboard.writeText(p.text);
  alert("Prayer copied!");
}
function filtered(){
  const val = document.getElementById('filter').value;
  return val==='all'? prayers : prayers.filter(p=>p.cat===val);
}

document.getElementById('postBtn').onclick = ()=>{
  const name = document.getElementById('pName').value.trim() || "Anonymous";
  const cat = document.getElementById('pCat').value;
  const text = document.getElementById('pText').value.trim();
  if(!text) return alert("Write your prayer request");
  
  prayers.unshift({id: Date.now(), name, cat, text, prayed:false, date:"Just now"});
  localStorage.setItem('fc_prayers', JSON.stringify(prayers));
  document.getElementById('pText').value="";
  document.getElementById('pName').value="";
  
  document.getElementById('filter').value = "all";
  renderPrayers(prayers);
  alert("Your prayer is posted 🙏");
}

document.getElementById('filter').onchange = ()=> renderPrayers(filtered());
document.getElementById('copyWordBtn').onclick = ()=>{
  navigator.clipboard.writeText(document.getElementById('dailyWord').textContent);
  alert("Copied!");
}

renderPrayers(prayers);
renderVideos();
