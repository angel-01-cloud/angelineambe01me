const faqs = [
  {q:"Is Faith Connect a church?", a:"No. We are a youth movement, inter-denominational. We work with all churches who preach Jesus."},
  {q:"How can I join?", a:"Just come to any of our events or join our WhatsApp group. No registration fee. Just come with hunger."},
  {q:"Do you collect money?", a:"Never. We don't ask for MoMo on forum. Events are free. If we need support, we announce officially."},
  {q:"Can I share my testimony?", a:"Yes! Go to Forum > Testimony category and post it. We want to hear what God did for you."},
  {q:"Is it only for Douala?", a:"We started in Douala but we are now in Yaounde, Buea, Bamenda. Online family is worldwide."}
];

function renderFAQ(){
  document.getElementById('faqList').innerHTML = faqs.map((f,i)=>`
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-q">${f.q} <span>+</span></div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}
window.sendMsg = function(){
  const name = document.getElementById('msgName').value.trim();
  const text = document.getElementById('msgText').value.trim();
  if(!name || !text) return alert("Fill both fields");
  let msgs = JSON.parse(localStorage.getItem('fc_about_msg')||'[]');
  msgs.push({name, text, date:new Date().toLocaleString()});
  localStorage.setItem('fc_about_msg', JSON.stringify(msgs));
  alert("Message sent! We will reply soon. God bless you "+name);
  document.getElementById('msgName').value=""; document.getElementById('msgText').value="";
  document.getElementById('msgBox').style.display='none';
}

renderFAQ();
