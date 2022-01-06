const input = document.getElementById('input');
const addBtn = document.querySelector('.btn');
const tasksDiv = document.querySelector('.task');

let arrayOfTasks = [];

getDataFromLocalStorage();

if(localStorage.getItem("task")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

addBtn.onclick = function(){
    if(input.value !== ""){
        addTaskToArray(input.value);
        input.value = '';
    }
}
// Click on task
tasksDiv.addEventListener("click", function(e){
   if(e.target.classList.contains("del")){
       deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
       e.target.parentElement.remove();
   }

   else if(e.target.classList.contains("item")){
       toggleStatusTaskWith(e.target.getAttribute("data-id"))
       e.target.classList.toggle("done");
       
       
   }
})
function addTaskToArray(taskText){
    //Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false

    };

    //Push Task To Array of Task
    arrayOfTasks.push(task);
    
    // add task to page
    addElementToTaskToPage(arrayOfTasks);
    //add tasks to local storage

    addDataToLocalStorageFrom(arrayOfTasks);
    

}
function addElementToTaskToPage(arrayOfTasks){
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "item";
        //Cheked to complite div
        if(task.completed){
            div.className = "item done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title))
        let span = document.createElement('span');
        span.className = "del";
        span.appendChild(document.createTextNode('delete'))
        div.appendChild(span);
        
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementToTaskToPage(tasks);
    }
}

function deleteTaskWith(taskId){
    //FOR EXPLAINE 
    //for(let i =0; i < arrayOfTasks.length; i++){
    //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    //}
    arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId){
    for(let i = 0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
   addDataToLocalStorageFrom(arrayOfTasks);
}