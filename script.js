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


