const tap=document.getElementById("tapStart");
const siren=document.getElementById("siren");

const lockScreen=document.getElementById("lockScreen");
const title=document.getElementById("title");
const msg=document.getElementById("message");
const cd=document.getElementById("countdown");

const cam=document.getElementById("cam");
const imei=document.getElementById("imei");
const otp=document.getElementById("otp");

const overrideBox=document.getElementById("overrideBox");
const fillBar=document.getElementById("fillBar");

const fp=document.getElementById("fingerprint");
const fpText=document.getElementById("fpText");

const toast=document.getElementById("toast");
const confettiLayer=document.getElementById("confettiLayer");

/* Vibration */
function vibrate(){
  if(navigator.vibrate){
    navigator.vibrate([200,100,200,100,300]);
  }
}

/* Clock */
function updateClock(){
  const d=new Date();
  document.getElementById("timeNow").innerText=
    d.getHours().toString().padStart(2,"0")+":"+
    d.getMinutes().toString().padStart(2,"0");
}
setInterval(updateClock,1000); updateClock();

/* Toast helper */
function showToast(text){
  toast.textContent=text;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1600);
}

/* Confetti */
function confettiBlast(){
  const emojis=["🎉","🎊","😂","🤣","✨","💥"];
  for(let i=0;i<36;i++){
    const s=document.createElement("span");
    s.className="confetti";
    s.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left=Math.random()*100+"%";
    s.style.animationDelay=(Math.random()*0.3)+"s";
    confettiLayer.appendChild(s);
    setTimeout(()=>s.remove(),1700);
  }
}

/* Start */
tap.addEventListener("click",()=>{
  tap.style.display="none";
  if(siren && siren.canPlayType("audio/mpeg")){
    siren.volume=0.25;
    siren.play().catch(()=>{});
  }
  vibrate();
  showToast("🔔 Security module engaged");
  startPrank();
});

/* 15s Flow */
let time=15;

function startPrank(){
  setTimeout(()=>{
    cam.innerText="📸 Camera access granted!";
    showToast("📸 Camera granted");
    vibrate();
  },3000);

  setTimeout(()=>{
    imei.innerText="🔐 IMEI LOCKED ❌";
    lockScreen.classList.add("panic","policeLight");
    showToast("🔐 IMEI locked");
    vibrate();
  },6000);

  setTimeout(()=>{
    otp.innerText="🔢 OTP detected – BANK ACCOUNT AT RISK!";
    lockScreen.classList.add("shakeHard");
    overrideBox.classList.remove("hidden");
    fillBar.style.width="42%";
    showToast("⚠️ Bank risk detected");
    vibrate();
  },9000);

  setTimeout(()=>{
    fillBar.style.width="76%";
    fp.classList.remove("hidden");
    fpText.innerText="❌ Fingerprint REJECTED";
    showToast("🫆 Fingerprint failed");
    vibrate();
  },12000);

  setTimeout(()=>{
    fillBar.style.width="96%";
    msg.innerHTML="🚨 SYSTEM OVERRIDE ALMOST COMPLETE 🚨";
    showToast("🚨 Override 96%");
    vibrate();
  },14000);
}

/* Countdown */
const timer=setInterval(()=>{
  time--;
  cd.innerText="⏳ "+time;
  if(time<=0){ clearInterval(timer); reveal(); }
},1000);

/* Reveal */
function reveal(){
  if(siren) siren.pause();
  lockScreen.classList.remove("panic","shakeHard","policeLight");

  title.innerText="🤣  🎉 HAPPY NEW YEAR 2026 🎉 डर गया था ना! 🤣";
  title.classList.add("green");

  msg.innerHTML=`
  🎉 HAPPY NEW YEAR 2026 🎉<br><br>
  😂😂 डर गया था ना?<br>
  फोन नहीं, <b>तू prank हो गया</b> 🤡<br><br>
  <b>– Pravin Study Zone</b>
  `;

  cd.style.display="none";
  fp.style.display="none";
  overrideBox.style.display="none";
  showToast("🎉 Surprise!");
  confettiBlast();
  }
