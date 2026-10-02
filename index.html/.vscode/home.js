const scriptures = [
  `"Your word is a lamp to my feet and a light to my path." – Psalm 119:105`,
  `"For I know the plans I have for you, declares the Lord." – Jeremiah 29:11`,
  `"I can do all things through Christ who strengthens me." – Philippians 4:13`,
  `"The Lord is my shepherd; I shall not want." – Psalm 23:1`,
  `"Trust in the Lord with all your heart." – Proverbs 3:5`,
  `"Be strong and courageous. Do not be afraid." – Joshua 1:9`,
  `"God is our refuge and strength, a very present help in trouble." – Psalm 46:1`,
  `"Let all that you do be done in love." – 1 Corinthians 16:14`,
  `"The joy of the Lord is your strength." – Nehemiah 8:10`,
  `"Peace I leave with you; my peace I give you." – John 14:27`,
  `"Intensify the fire on the altar, let it never go out." – Leviticus 6:13`
];

let currentIndex = 0;

const scriptureText = document.getElementById('scriptureText');
const scriptureBox = document.getElementById('scriptureBox');

function changeScripture() {
  currentIndex++;
  if (currentIndex >= scriptures.length) {
    currentIndex = 0; 
  }

  scriptureText.style.opacity = 0;

  setTimeout(() => {
    scriptureText.textContent = scriptures[currentIndex];
    scriptureText.style.opacity = 1;
  }, 200);
}

scriptureBox.addEventListener('click', changeScripture);

setInterval(changeScripture, 8000);