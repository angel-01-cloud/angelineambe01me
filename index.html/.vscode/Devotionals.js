const devotions = [
{
  title: "Jesus, I Want to Know You",
  ref: "LUKE 6:7-9",
  author: "Ben Acha",
  body: `Herod's curiosity wasn't to be satisfied until after Jesus' arrest when Pilate sent Jesus to Herod for punishment. But, wouldn't we be curious about this Jesus, if we lived at that time?

This is not the same Herod who was king when Jesus was born. John the Baptist had been a thorn in his side with his preaching about the coming of the Kingdom and a call for repentance.

Herod knew of the prophecies regarding the tradition that Elijah would return to make way for the Messiah. So it is not surprising that he was curious. Was Jesus Elijah? Was Jesus the Messiah?

What about us and what we think about Jesus? To the apostles he was the Messiah. To us he is the Son of God, our Savior and the one we are called to follow in order to join him in the Kingdom of Heaven.`,
  prayer: "Jesus, you are my Lord, my Savior, the one who guides me every day. Without you I am nothing; with you I can be the person you have called me to be. Thank you. Amen."
},
{
  title: "Intensify The Fire",
  ref: "LEVITICUS 6:13",
  author: "Faith Connect Youth",
  body: `The fire shall ever be burning upon the altar; it shall never go out. God is not looking for a visitation, He is looking for habitation.

Many start with fire but let it die. Prayer is the wood. The Word is the oil. Worship is the wind that fans it.

In Daniel 3, Nebuchadnezzar heated the furnace seven times hotter. The fire did not burn Shadrach, Meshach and Abednego - it burned their chains. The fire meant to destroy you will destroy what binds you.`,
  prayer: "Lord, baptize me with fresh fire. Let my altar never go cold. Intensify my hunger for you. Amen."
},
{
  title: "Presence That Brings Peace",
  ref: "PROVERBS 31:12",
  author: "Faith Connect Youth",
  body: `I want a woman whose presence brings peace, whose prayers shake Heavens, whose words bring life and whose obedience advances the work of God.

This is the Proverbs 31 woman. She does her husband good and not evil. Her mouth opens with wisdom. Her prayer life moves Heaven and earth.

This is the woman God is preparing and the man God is preparing to deserve her.`,
  prayer: "Father, prepare me to be peace. Prepare me to be prayerful. Let my life advance your Kingdom. Amen."
}
];

let index = new Date().getDate() % devotions.length;
let finished = localStorage.getItem('dev_count')? parseInt(localStorage.getItem('dev_count')) : 1;

function renderList(){
  document.getElementById('devList').innerHTML = devotions.map((d,i)=>`<div class="${i===index?'active':''}" onclick="loadDev(${i})"><b>${d.title}</b><br><small>${d.ref}</small></div>`).join('');
}
function loadDev(i){
  index=i;
  const d=devotions[i];
  document.getElementById('title').textContent=d.title;
  document.getElementById('ref').textContent=d.ref;
  document.getElementById('author').textContent=d.author;
  document.getElementById('av').textContent=d.author[0];
  document.getElementById('text').innerHTML=d.body.split('\n\n').map(p=>`<p>${p}</p>`).join('');
  document.getElementById('prayerText').textContent=d.prayer;
  document.getElementById('prayerPreview').textContent=d.prayer;
  document.getElementById('date').textContent=new Date().toLocaleDateString('en-US',{weekday:'long', year:'numeric', month:'long', day:'numeric'});
  renderList();
}
window.loadDev=loadDev;
loadDev(index);

document.getElementById('nextBtn').onclick=()=>{index=(index+1)%devotions.length; loadDev(index)}
document.getElementById('prevBtn').onclick=()=>{index=(index-1+devotions.length)%devotions.length; loadDev(index)}
document.getElementById('amenBtn').onclick=function(){
  this.textContent=`Amen Received ✅ 🙏`;
  setTimeout(()=> this.textContent=`Say Amen 🙏`,2000);
}
document.getElementById('moodBtn').onclick=()=>{
  const m=prompt("How are you feeling? Joyful, Sad, Anxious, Grateful");
  if(m) document.getElementById('moodBtn').textContent="😊 "+m;
}

