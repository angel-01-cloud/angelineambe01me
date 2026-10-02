const verses = [
  {text: "Your word is a lamp to my feet and a light to my path.", ref: "Psalm 119:105", mean: "God's Word guides us when the future feels dark."},
  {text: "For I know the plans I have for you, declares the Lord, plans to prosper you.", ref: "Jeremiah 29:11", mean: "God has a specific, good future for you as a youth."},
  {text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13", mean: "Your strength is not your own - Christ empowers you."},
  {text: "Don't let anyone look down on you because you are young, but set an example.", ref: "1 Timothy 4:12", mean: "Youth is not a limitation in God's Kingdom, it's an advantage."},
  {text: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5", mean: "Real faith means trusting God even when you don't understand."},
  {text: "Be strong and courageous. Do not be afraid; the Lord your God will be with you.", ref: "Joshua 1:9", mean: "God's presence removes fear - you are never alone."},
  {text: "The fire shall ever be burning upon the altar; it shall never go out.", ref: "Leviticus 6:13", mean: "Keep your personal altar burning daily through prayer."}
];

const videos = [
  {title: "How to Study the Bible for Beginners - Full Guide", channel: "BibleProject", id: "jfNOK__JyQo", cat:"beginner"},
  {title: "Overview: Book of John - Why Jesus is Different", channel: "BibleProject", id: "8M8XXzAplF0", cat:"youth"},
  {title: "How to Hear God's Voice as a Young Christian", channel: "Faith Youth", id: "03YfNbvjW14", cat:"youth"},
  {title: "Inductive Bible Study Method Explained", channel: "Desiring God", id: "F4JbE_iwUNI", cat:"deep"},
  {title: "Proverbs - Wisdom for Everyday Life", channel: "The Bible Project", id: "jC0Q2e7oPMQ", cat:"beginner"},
  {title: "Spiritual Disciplines for Youth - Prayer & Fasting", channel: "Faith Connect", id: "uwsPRcCwZDE", cat:"youth"}
];

let vIndex = new Date().getDate() % verses.length;
function loadVerse(i){
  document.getElementById('verseText').textContent = `"${verses[i].text}"`;
  document.getElementById('verseRef').textContent = verses[i].ref + " - KJV";
  document.getElementById('verseMeaning').textContent = verses[i].mean;
  document.getElementById('verseDay').textContent = `TODAY'S VERSE - ${new Date().toLocaleDateString()} - CLICK TO CHANGE`;
}
loadVerse(vIndex);

document.getElementById('newVerseBtn').onclick = ()=>{
  vIndex = (vIndex+1) % verses.length;
  loadVerse(vIndex);
}
document.getElementById('verse-card')?.addEventListener;
document.querySelector('.verse-card').onclick = (e)=>{
  if(e.target.tagName!=='BUTTON'){ vIndex=(vIndex+1)%verses.length; loadVerse(vIndex); }
}

document.getElementById('copyVerseBtn').onclick = ()=>{
  const t = `${document.getElementById('verseText').textContent} - ${document.getElementById('verseRef').textContent}`;
  navigator.clipboard.writeText(t); alert("Verse copied!");
}

function renderVideos(list){
  document.getElementById('videoGrid').innerHTML = list.map(v=>`
    <div class="video" data-cat="${v.cat}">
      <iframe src="https://www.youtube.com/embed/${v.id}" allowfullscreen loading="lazy"></iframe>
      <div class="video-info">
        <span class="tag">${v.cat.toUpperCase()}</span>
        <h4>${v.title}</h4>
        <small>${v.channel} • YouTube Tutorial</small>
      </div>
    </div>
  `).join('');
}
renderVideos(videos);

document.getElementById('filter').onchange = function(){
  const val = this.value;
  if(val==='all') renderVideos(videos);
  else renderVideos(videos.filter(v=>v.cat===val));
}


document.querySelectorAll('.plan div').forEach(d=>{
  d.onclick = function(){
    document.querySelectorAll('.plan div').forEach(x=>x.classList.remove('active'));
    this.classList.add('active');
  }
});
