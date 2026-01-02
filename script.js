function opentasks() {
  let allelem = document.querySelectorAll(".right .elem");
  let right = document.querySelectorAll(".allelem");
  let allfullapge = document.querySelectorAll(".allfullpage");
  let close = document.querySelectorAll(".close");

  function allpageclear() {
    allfullapge.forEach(function (elem) {
      elem.style.display = "none";
    });
  }

  let alltodo = document.querySelectorAll(".alltodo");
  alltodo.forEach(function (elem) {
    //   console.log(elem);

    elem.addEventListener("click", function () {
      // console.log(allfullapge[elem.id]);
      allpageclear();
      allfullapge[elem.id].style.display = "block";
      allfullapge[elem.id].style.zIndex = 1;
      // console.log(allfullapge[elem.id]);
    });
  });

  allelem.forEach(function (elem) {
    // console.log(elem);

    elem.addEventListener("click", function () {
      // console.log(allfullapge[elem.id]);
      allfullapge[elem.id].style.display = "block";
    });
  });

  close.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allfullapge[elem.id].style.display = "none";
      allpageclear();
    });
  });
}
opentasks();

function todolist() {
  var alldata = [];

  if (localStorage.getItem("alldata")) {
    alldata = JSON.parse(localStorage.getItem("alldata"));
  } else {
    console.log("task is empty");
  }

  function renderTask() {
    var clutter = "";
    alldata.forEach(function (elem, id) {
      clutter += ` <div class="intask">
                   <div class="imp">
                     <h1>${elem.name}</h1>
                        ${elem.imp ? `<h6>imp</h6>` : ""}
                      <details>
                            <summary>
                                  </summary>


                         ${elem.detail}
                        </details>
                   </div>
                    <button id='${id}' class='btnn'>Marks as complete</button>
                   
                </div>`;
    });

    localStorage.setItem("alldata", JSON.stringify(alldata));

    document.querySelector(".r").innerHTML = clutter;

    document.querySelectorAll(".intask button").forEach(function (e) {
      e.addEventListener("click", function () {
        alldata.splice(e.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".form");
  let input = document.querySelector(".input");
  let textarea = document.querySelector(".area");
  let check = document.querySelector(".check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // console.log(input.value)
    // console.log(textarea.value);
    // console.log(check.checked);

    alldata.push({
      name: input.value,
      detail: textarea.value,
      imp: check.checked,
    });
    (input.value = ""), (textarea.value = ""), (check.checked = false);
    renderTask();
    // console.log(alldata);
  });
}
todolist();

function dayplaner() {
  var dayplanner = JSON.parse(localStorage.getItem("dayplanner")) || {};

  var hours = Array.from(
    { length: 18 },
    (e, id) => `${6 + id}:00-${7 + id}:00`
  );
  // console.log(hours);

  var timer = "";
  hours.forEach((e, id) => {
    var savedata = dayplanner[id] || "";
    timer += ` <div  class="dpin">
                 <h4>${e}</h4>
              <input id='${id}' class="input" value='${savedata}' type="text" placeholder="...">
           </div>`;
  });

  document.querySelector(".dpbox").innerHTML = timer;

  var input = document.querySelectorAll(".input");

  input.forEach(function (e) {
    e.addEventListener("input", function (e) {
      // console.log(e.target.id);
      dayplanner[e.target.id] = e.target.value;

      localStorage.setItem("dayplanner", JSON.stringify(dayplanner));

      // console.log(dayplanner);
    });
  });
}
dayplaner();

async function motivational() {
  let quote = document.querySelector("#quote");

  let raw = await fetch("https://api.quotable.io/random");
  let data = await raw.json();

  quote.innerHTML = data.content;
}
motivational();

function pomodoro(){
let start = document.querySelector(".st");
let pause = document.querySelector(".ps");
let reset = document.querySelector(".rt");
let time = document.querySelector(".time");
let work = document.querySelector(".work");
let workseen = true;

let timer = 1500;
function updatetimer() {
  let min = String(Math.floor(timer / 60)).padStart(2, "0");
  let sec = String(timer % 60).padStart(2, "0");
  time.innerHTML = `${min}:${sec}`;

  if (workseen) {
    work.style.display = "block";
    work.innerHTML = "Work Time";
  } else {
    work.innerHTML = "Break";
    work.style.display = "block";
  }

  if(timer==0){
     work.style.display = "none"
  }


}

function starttimer() {
  timer=1500;
  if (workseen) {
    done = setInterval(() => {
      if (timer > 0) {
        timer--;
        updatetimer();
      } else {
        start.style.opacity = 1;
        clearInterval(done);
        workseen = false;
      }
    }, 1000);
  } else {
    
    timer=300;
    done = setInterval(() => {
      if (timer > 0) {
        timer--;
        updatetimer();
   
      } else {
        start.style.opacity = 1;
        workseen = true;
        clearInterval(done);
      }
    }, 1000);
  }
}

start.addEventListener("click", function () {


  starttimer();
  start.style.opacity = 0.3;
  pause.style.opacity = 1;
});

pause.addEventListener("click", function () {
  clearInterval(done);
  updatetimer();


  pause.style.opacity = 0.3;
  start.style.opacity = 1;
});

reset.addEventListener("click", function () {
  timer = 1500;
  clearInterval(done);
  updatetimer();
  workseen=true;
  work.style.display = "none";
  start.style.opacity = 1;
  pause.style.opacity = 1;
});


}
pomodoro();


function weathertime(){
let realdate=document.querySelector(".date");
let realday=document.querySelector(".day");
let realdeg=document.querySelector(".deg");
let h=document.querySelector(".h");
let p=document.querySelector(".p");
let w=document.querySelector(".w");
let time=document.querySelector(".h3")
let bgimg=document.querySelector(".full");
let wph=document.querySelector(".allwph");
let cityy=document.querySelector(".city");
let state=document.querySelector(".state");

async function Weather(){
  const API_KEY='2c4ddba6e1c83a6b98dc2a684bab538b';
  const city='Ahmedabad';
  let raw= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
  let data=await raw.json();
  // console.log(data);



  

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May",
    "June","July","August","September","October","November",
    "December"];
    setInterval(()=>{

  const now=new Date();

  const day = days[now.getDay()];
  const date =now.getDate();
  const month = months[now.getMonth()];


  realdate.innerHTML=`${date} ${month}`;
  realday.innerHTML=`${day}`;
  realdeg.innerHTML=`${Math.floor(data.main.temp)}°C`
  h.innerHTML=`Humidity : ${data.main.humidity} %`;
  p.innerHTML=`Pressure : ${data.main.pressure} hPa`
  w.innerHTML=`Wind : ${data.wind.speed} KpH`
  cityy.firstChild.textContent='Ahmedabad';
  state.textContent='(GJ)';
  


  const hour=now.getHours();
  const hours=now.getHours()-12;
  const min=now.getMinutes();
  const sec=now.getSeconds();
  
  if(hour>12){

    time.innerHTML=`${String(hours).padStart("2","0") }:${String(min).padStart("2","0")}:${String(sec).padStart("2","0")} PM`;
   
  }
  else{
    
    time.innerHTML=`${String(hours).padStart("2","0") }:${String(min).padStart("2","0")}:${String(sec).padStart("2","0")} AM`
  }

  if(hour>6 && hour<19){
    bgimg.style.backgroundImage = "url('https://imgs.search.brave.com/yenJiESciU0BMOZWrSS7HtCJpZYNbwoaK66sjNgwe8k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMjQ4/MDg5MjA0L3N0b2Nr/LXBob3RvLWJsdWUt/c2t5LWRhcmstd2l0/aC1jbG91ZC1pbi1z/dW1tZXItYmVmb3Jl/LXN1bnNldA')"
  }
else{
   bgimg.style.backgroundImage = "url('https://imgs.search.brave.com/wJsKv5tfaUa7TMg6ot4ZDPfTt2zgIlyxdE5j0o3uN4E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYx/ODU5NTA3L3Bob3Rv/L2JlYXV0aWZ1bC1u/aWdodC53ZWJwP2E9/MSZiPTEmcz02MTJ4/NjEyJnc9MCZrPTIw/JmM9V2tYdWRMV3Nx/dndJX3ZUUUp6RXkz/Z0ZaUzYtWF9DcjV6/bXp3SjlJWjZ2Zz0')"
   bgimg.style.color="white";
   wph.style.color="white";
   realdeg.style.color="white";
   cityy.style.color='#2B58AB';
   state.style.color='#2B58AB';
}

 },(1000))
}
Weather();
}
weathertime();

let theme=document.querySelector(".theme");
let root=document.documentElement;
// console.log(root);


let flag=0;
theme.addEventListener("click",function(){{
  if(flag===0){
    root.style.setProperty('--pri','#271f1fff');
    root.style.setProperty('--sec','#000000ff');
    root.style.setProperty('--tri1','#676060ff');
    root.style.setProperty('--tri2','#ffffffff');
    flag=1;
  }
  else if(flag===1){
    root.style.setProperty('--pri','#271F1F');
    root.style.setProperty('--sec','#525885ff');
    root.style.setProperty('--tri1','#3C467B');
    root.style.setProperty('--tri2','#fafafaff');
    
  flag=2
  }
  else{
     root.style.setProperty('--pri','#222831');
    root.style.setProperty('--sec','#393e46');
    root.style.setProperty('--tri1','#948979');
    root.style.setProperty('--tri2','#dfd0b8');
  flag=0;
  }
}})

 