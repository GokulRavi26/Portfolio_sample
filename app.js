const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navList.classList.toggle("active");
});




// ----- Typed Text -----
const roles = ["AR/VR Enthusiast","Unity Developer","UI/UX Designer","React Developer"];
const typedTextSpan = document.querySelector(".typed-text");
let roleIndex=0,charIndex=0,isDeleting=false;

function typeWriter(){
  const currentRole=roles[roleIndex];
  typedTextSpan.textContent=currentRole.substring(0,charIndex);
  charIndex+=isDeleting?-1:1;
  let speed=isDeleting?50:150;
  if(!isDeleting && charIndex===currentRole.length){speed=1000; isDeleting=true;}
  if(isDeleting && charIndex<0){isDeleting=false; roleIndex=(roleIndex+1)%roles.length; charIndex=0; speed=200;}
  setTimeout(typeWriter,speed);
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(typeWriter,500));

// ----- Particle Network + Mouse Trails -----
const canvas=document.getElementById('particles-bg');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth; canvas.height=window.innerHeight;

const particles=[]; const numParticles=window.innerWidth<768?60:120;
const mouse={x:null,y:null};

window.addEventListener('mousemove',e=>{mouse.x=e.x; mouse.y=e.y;});
window.addEventListener('mouseout',()=>{mouse.x=null; mouse.y=null;});

for(let i=0;i<numParticles;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-0.5)*0.5,
    vy:(Math.random()-0.5)*0.5,
    size:Math.random()*2+1,
    trail: []
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    p.x+=p.vx; p.y+=p.vy;

    if(p.x>canvas.width)p.x=0; if(p.x<0)p.x=canvas.width;
    if(p.y>canvas.height)p.y=0; if(p.y<0)p.y=canvas.height;

    // Mouse repel
    // if(mouse.x && mouse.y){
    //   const dx=p.x-mouse.x, dy=p.y-mouse.y;
    //   const dist=Math.hypot(dx,dy);
    //   if(dist<100){ const angle=Math.atan2(dy,dx); const force=(100-dist)/100*2;
    //     p.vx+=Math.cos(angle)*force; p.vy+=Math.sin(angle)*force;
    //   }
    // }

    // Draw trail
    // p.trail.push({x:p.x,y:p.y});
    // if(p.trail.length>10)p.trail.shift();
    // for(let i=0;i<p.trail.length-1;i++){
    //   ctx.strokeStyle=`rgba(255,204,0,${i/p.trail.length})`;
    //   ctx.beginPath();
    //   ctx.moveTo(p.trail[i].x,p.trail[i].y);
    //   ctx.lineTo(p.trail[i+1].x,p.trail[i+1].y);
    //   ctx.stroke();
    // }

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle='rgba(255,204,0,0.8)';
    ctx.fill();
  }

  // Connect lines
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const p1=particles[i], p2=particles[j];
      const dist=Math.hypot(p1.x-p2.x,p1.y-p2.y);
      if(dist<120){
        ctx.strokeStyle=`rgba(255,204,0,${1-dist/120})`;
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});

// ----- Scroll Parallax -----
const intro=document.querySelector('.intro');
const profile=document.querySelector('.profile-image');
window.addEventListener('scroll',()=>{
  const scrollY=window.scrollY;
  intro.style.transform=`translateY(${scrollY*0.2}px)`;
  profile.style.transform=`translateY(${scrollY*0.1}px)`;
});

// ----- Intersection Observer for fade-slide -----
const faders=document.querySelectorAll('.fade-slide');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('show');}
  });
},{threshold:0.5});
faders.forEach(fader=>observer.observe(fader));

const timelineItems = document.querySelectorAll('.timeline-item');

function revealTimeline() {
  const triggerBottom = window.innerHeight * 0.85;

  timelineItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < triggerBottom) {
      item.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealTimeline);
window.addEventListener('load', revealTimeline);
