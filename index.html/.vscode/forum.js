let topics = JSON.parse(localStorage.getItem('fc_forum') || 'null') || [
  {id:1, title:"How do I overcome temptation as a young Christian?", cat:"Youth", text:"I love God but I keep falling into the same sin. Any advice please?", author:"Anonymous", likes:12, liked:false, views:89, replies:[{name:"Pastor John", text:"Bro, Romans 6:14 - Sin shall not have dominion. Fast + Word + Accountability partner."}], date:"Today"},
  {id:2, title:"What does Jeremiah 29:11 really mean?", cat:"Bible", text:"Is it for everyone or just Israel? I see it everywhere.", author:"Sarah", likes:8, liked:false, views:56, replies:[], date:"Yesterday"},
  {id:3, title:"I failed my exams, does God still have a plan for me?", cat:"Life", text:"Feeling so down. I prayed but I still failed. Need encouragement.", author:"David M", likes:21, liked:false, views:120, replies:[{name:"Grace", text:"Yes! Failure is not final. God uses even this. Isaiah 41:10"}], date:"Yesterday"},
  {id:4, title:"Is it okay to listen to secular music?", cat:"Question", text:"Honest question, not judging, I just want to know your thoughts.", author:"Anonymous", likes:5, liked:false, views:44, replies:[], date:"2 days ago"}
];
let activeCat = "all";

function renderTopics(list){
  document.getElementById('topicList').innerHTML = list.map(t=>`
    <div class="topic" onclick="toggleReplies(${t.id})">
      <div class="topic-top">
        <span class="tag tag-${t.cat.toLowerCase()}">${t.cat}</span>
        <small>${t.date} • by ${t.author}</small>
      </div>
      <h3>${t.title}</h3>
      <p>${t.text.substring(0,120)}...</p>
      <div class="reply-box" id="box-${t.id}">
        ${t.replies.map(r=>`<div class="reply"><b>${r.name}:</b> ${r.text}</div>`).join('')}
        <input id="replyName-${t.id}" placeholder="Your name">
        <input id="replyText-${t.id}" placeholder="Write a reply..." onkeydown="if(event.key==='Enter'){addReply(${t.id})}">
        <button class="btn btn-blue" style="margin-top:8px;width:100%" onclick="event.stopPropagation(); addReply(${t.id})">Reply</button>
      </div>
    </div>
  `).join('');
}

window.toggleReplies = function(id){
  const box = document.getElementById('box-'+id);
  box.style.display = box.style.display==='block' ? 'none' : 'block';
  const topic = topics.find(t=>t.id===id);
  topic.views++;
  localStorage.setItem('fc_forum', JSON.stringify(topics));
}

window.likeTopic = function(id){
  const t = topics.find(x=>x.id===id);
  if(!t.liked){ t.likes++; t.liked=true; } else { t.likes--; t.liked=false; }
  localStorage.setItem('fc_forum', JSON.stringify(topics));
  renderTopics(getFiltered());
}

window.addReply = function(id){
  const nameEl = document.getElementById('replyName-'+id);
  const textEl = document.getElementById('replyText-'+id);
  const name = nameEl.value.trim() || "Anonymous";
  const text = textEl.value.trim();
  if(!text) return alert("Write a reply");
  const t = topics.find(x=>x.id===id);
  t.replies.push({name, text});
  localStorage.setItem('fc_forum', JSON.stringify(topics));
  textEl.value="";
  renderTopics(getFiltered());
  document.getElementById('box-'+id).style.display='block';
}

function getFiltered(){
  let list = activeCat==='all'? topics : topics.filter(t=>t.cat===activeCat);
  const s = document.getElementById('search').value.toLowerCase();
  if(s) list = list.filter(t=>t.title.toLowerCase().includes(s) || t.text.toLowerCase().includes(s));
  return list;
}

document.getElementById('postTopic').onclick = ()=>{
  const title = document.getElementById('tTitle').value.trim();
  const cat = document.getElementById('tCat').value;
  const text = document.getElementById('tText').value.trim();
  if(!title || !text) return alert("Fill title and message");
  topics.unshift({id:Date.now(), title, cat, text, author:"You", likes:0, liked:false, views:0, replies:[], date:"Just now"});
  localStorage.setItem('fc_forum', JSON.stringify(topics));
  document.getElementById('tTitle').value="";
  document.getElementById('tText').value="";
  activeCat="all";
  document.querySelectorAll('.filter').forEach(f=>f.classList.remove('active'));
  document.querySelector('[data-cat="all"]').classList.add('active');
  renderTopics(topics);
}

document.querySelectorAll('.filter').forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderTopics(getFiltered());
  }
});
document.getElementById('search').oninput = ()=> renderTopics(getFiltered());

renderTopics(topics);
