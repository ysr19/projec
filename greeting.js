const form = document.querySelector(".js-form"),
input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
console.log(form);
console.log(input);
console.log(greeting);


const USER_LS = "currentUser",
SHOWING_CN = "showing";

function handleSubmit1(event){
   
 event.preventDefault();
 const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

    function askForName(){
        form.classList.add(SHOWING_CN);
        form.addEventListener("submit",handleSubmit1);
    }


function paintGreeting(text){
        
        form.classList.remove(SHOWING_CN);
        greeting.classList.add(SHOWING_CN);
        greeting.innerText = `Hello ${text}`;
        
    }

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //console.log("askforname");
        askForName();
        
    }else{
        //console.log("currentUser");
        paintGreeting(currentUser);
    }
}

function init(){
    //console.log("loadName");
    loadName()

}

init();
