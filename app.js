let gameseq=[];
let userseq=[];
let bod=document.querySelector("body");
let btns=["yellow","red","purple","green"];

let level=0;
let started=false;

let h2=document.querySelector("h2");




document.addEventListener("keypress",function(){
    if(started==false){
    console.log("game started");
    started=true;
    levelup();  
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
     btn.classList.remove("flash");
    },300);
 }

 function lost(){
    bod.classList.add("out");
    setTimeout(function(){
     bod.classList.remove("out");
    },300);
 }

 function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
     btn.classList.remove("userflash");
    },300);
 }

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;

let randidx=Math.floor(Math.random()*4);
let randcolor=btns[randidx];
let randbtn=document.querySelector(`.${randcolor}`)
  gameseq.push(randcolor);
  console.log(gameseq);
   gameflash(randbtn);  
}

function checkans(idx){
    console.log("curr level:",level)
    if (userseq[idx]===gameseq[idx]){
        console.log("same value");
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }else{
        h2.innerHTML=`Game over! your score was <b> ${level}</b><br> press any key to start.`;
        updateMaxLevel(level);
       reset();
       lost();
    }
}

function btnpress(){
    console.log(this);
  let btn=  this;
  userflash(btn);
  usercolor=btn.getAttribute("id");
  console.log(usercolor);
  userseq.push(usercolor);
  console.log(userseq);
  checkans(userseq.length-1);
}
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}
 
function reset(){
    started=false; 
    gameseq=[];
    userseq=[];
    level=0;
}

let maxLevel = localStorage.getItem('maxLevel') || 0;


let maxLevelParagraph = document.createElement("p");
maxLevelParagraph.textContent = `Max Level: ${maxLevel}`;
document.body.appendChild(maxLevelParagraph);


function updateMaxLevel(currentLevel) {
    if (currentLevel > maxLevel) {
        maxLevel = currentLevel;
        localStorage.setItem('maxLevel', maxLevel);
        maxLevelParagraph.textContent = `Max Level: ${maxLevel}`;
    }
}





