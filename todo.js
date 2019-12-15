const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-tolist");

const TODOS_LS = 'toDos';

let toDos =[];



function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(todo){
    console.log(todo.id, parseInt(li.id));
    return todo.id !== parseInt(li.id);
    
  });

  console.log(toDos);
  toDos = cleanToDos;
  saveToDos(toDos);;
}


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));

}



function PaintToDo(text){
    console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML ="❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length+1;

    

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj={
        text: text,
        id: newId

    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    PaintToDo(currentValue);
    toDoInput.value="";
}

function something(toDo){
    console.log(toDo.text);
    PaintToDo(toDo.text);

}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    console.log(loadedToDos);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(something);


    }
}


function init(){

    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)


}


init();