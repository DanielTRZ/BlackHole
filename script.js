
const panels = document.querySelectorAll('.info-panel-rect');
const starsContainer = document.querySelector('.stars');
const blackhole = document.querySelector('.blackhole');
const fog = document.getElementById('fog');
const rings = document.getElementById('rings');
const langPLBtn = document.getElementById('langPL');
const langENBtn = document.getElementById('langEN');
const mainHeader = document.getElementById('mainHeader');
const mainHeaderEN = document.getElementById('mainHeaderEN');
const bottomPanels = document.querySelectorAll('.bottom-panel');

let currentLang = 'pl';

function updateText() {
  mainHeader.style.display = currentLang === 'pl' ? 'block' : 'none';
  mainHeaderEN.style.display = currentLang === 'en' ? 'block' : 'none';

  panels.forEach(panel => {
    if (panel.dataset.lang === currentLang) {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  });

  bottomPanels.forEach(panel => {
    if (panel.dataset.lang === currentLang) {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  });
}

// Gwiazdy w tle
function createStars(count = 150){
  for(let i=0;i<count;i++){
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.position='absolute';
    star.style.width=`${Math.random()*2+1}px`;
    star.style.height=star.style.width;
    star.style.background='#fff';
    star.style.borderRadius='50%';
    star.style.top=`${Math.random()*100}%`;
    star.style.left=`${Math.random()*100}%`;
    star.style.opacity=Math.random();
    star.style.animation=`twinkle ${1+Math.random()*3}s infinite alternate`;
    starsContainer.appendChild(star);
  }
}

// Ułożenie prostokątów wokół czarnej dziury
function arrangePanelsCircle(){
  const bhRect = blackhole.getBoundingClientRect();
  const centerX = bhRect.width/2;
  const centerY = bhRect.height/2;
  const radius = bhRect.width/1.8;

  const wrapper = document.querySelector('.panels-wrapper');
  const visiblePanels = Array.from(panels).filter(p=>p.dataset.lang===currentLang);

  visiblePanels.forEach((panel,i)=>{
    const angle = (i/visiblePanels.length)*2*Math.PI;
    panel.dataset.angle = angle;
    panel.style.transform = `rotate(${angle}rad) translate(${radius}px) rotate(${-angle}rad)`;
    panel.style.top = `${centerY}px`;
    panel.style.left = `${centerX}px`;
  });

  function rotatePanels(){
    visiblePanels.forEach(panel=>{
      let angle = parseFloat(panel.dataset.angle);
      angle += 0.0005;
      panel.dataset.angle = angle;
      panel.style.transform = `rotate(${angle}rad) translate(${radius}px) rotate(${-angle}rad)`;
    });
    requestAnimationFrame(rotatePanels);
  }
  rotatePanels();
}

// Język
langPLBtn.addEventListener('click',()=>{
  currentLang='pl';
  langPLBtn.classList.add('active');
  langENBtn.classList.remove('active');
  updateText();
  arrangePanelsCircle();
});

langENBtn.addEventListener('click',()=>{
  currentLang='en';
  langENBtn.classList.add('active');
  langPLBtn.classList.remove('active');
  updateText();
  arrangePanelsCircle();
});

// Start
createStars(200);
updateText();
arrangePanelsCircle();
window.addEventListener('resize',arrangePanelsCircle);
