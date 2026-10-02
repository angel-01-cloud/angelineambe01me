let songs = JSON.parse(localStorage.getItem('fc_worship_v2') || 'null') || [
  {
    id:1,
    title:"Way Maker",
    artist:"Sinach",
    cover:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lyrics:"Way maker, miracle worker, promise keeper, light in the darkness\nMy God, that is who You are..."
  },
  {
    id:2,
    title:"Goodness of God",
    artist:"Bethel Music",
    cover:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    lyrics:"All my life You have been faithful\nAll my life You have been so so good\nWith every breath that I am able\nI will sing of the goodness of God"
  },
  {
    id:3,
    title:"Yeshua",
    artist:"Faith Connect Youth Worship",
    cover:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    lyrics:"Yeshua, You are my everything\nMy joy, my song, my King..."
  },
  {
    id:4,
    title:"Minister GUC",
    artist:"I have never ever seen God as good as you",
    cover:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    lyrics:"Spirit lead me where my trust is without borders\nLet me walk upon the waters\nWherever You would call me..."
  }
];

let current = 0;
let isPlaying = false;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const seek = document.getElementById('seek');

function save(){ localStorage.setItem('fc_worship_v2', JSON.stringify(songs)); }

function render(list){
  document.getElementById('songList').innerHTML = list.map((s,i)=>`
    <div class="song ${i===current?'active':''}" onclick="playSong(${songs.indexOf(s)})">
      <img src="${s.cover}">
      <div class="song-info">
        <b>${s.title}</b>
        <small>${s.artist}</small>
      </div>
      <button class="play-btn">${i===current && isPlaying?'❚❚':'▶'}</button>
    </div>
  `).join('');
}

window.playSong = function(index){
  current = index;
  const s = songs[current];
  audio.src = s.src;
  audio.play();
  isPlaying = true;
  playBtn.textContent = "❚❚";
  document.getElementById('pImg').src = s.cover;
  document.getElementById('pTitle').textContent = s.title;
  document.getElementById('pArtist').textContent = s.artist;
  document.getElementById('nowImg').src = s.cover;
  document.getElementById('nowTitle').textContent = s.title;
  document.getElementById('nowArtist').textContent = s.artist;
  document.getElementById('nowLyrics').textContent = s.lyrics;
  render(getFiltered());
}

playBtn.onclick = ()=>{
  if(!audio.src){ playSong(0); return; }
  if(isPlaying){ audio.pause(); isPlaying=false; playBtn.textContent="▶"; }
  else { audio.play(); isPlaying=true; playBtn.textContent="❚❚"; }
  render(getFiltered());
}

document.getElementById('nextBtn').onclick = ()=>{ current=(current+1)%songs.length; playSong(current); }
document.getElementById('prevBtn').onclick = ()=>{ current=(current-1+songs.length)%songs.length; playSong(current); }

audio.ontimeupdate = ()=>{
  if(!audio.duration) return;
  seek.value = (audio.currentTime / audio.duration)*100;
  document.getElementById('curTime').textContent = fmt(audio.currentTime);
  document.getElementById('durTime').textContent = fmt(audio.duration);
}
seek.oninput = ()=>{ audio.currentTime = (seek.value/100)*audio.duration; }
audio.onended = ()=>{ document.getElementById('nextBtn').click(); }

function fmt(s){ const m=Math.floor(s/60), sec=Math.floor(s%60).toString().padStart(2,'0'); return `${m}:${sec}`; }

function getFiltered(){
  const q = document.getElementById('search').value.toLowerCase();
  return q? songs.filter(s=>s.title.toLowerCase().includes(q)||s.artist.toLowerCase().includes(q)) : songs;
}
document.getElementById('search').oninput = ()=> render(getFiltered());

document.getElementById('shuffleBtn').onclick = ()=>{
  songs = songs.sort(()=>Math.random()-0.5);
  render(getFiltered());
}

document.getElementById('addFile').onchange = function(e){
  const file = e.target.files[0];
  if(!file) return;
  const url = URL.createObjectURL(file);
  const title = file.name.replace('.mp3','').replace('.m4a','');
  songs.unshift({
    id:Date.now(),
    title: title,
    artist:"My Upload",
    cover:"https://via.placeholder.com/300x300/1e40af/FFFFFF?text="+encodeURIComponent(title.substring(0,2)),
    src:url,
    lyrics:"Lyrics not added yet. Worship from your heart."
  });
  save();
  render(getFiltered());
  playSong(0);
}

render(songs);