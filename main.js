const todoAddButton = document.getElementById("addBtn");
const todoInputBox = document.getElementById("inputBox");
const taskContainer = document.getElementById("taskContainer");
todoInputBox.focus();

taskArr = [];

function handleTaskClick() {
    this.classList.toggle("completed");

    const taskId = this.id.toString();

    for (let i = 0; i < taskArr.length; i++) {
        const taskObj = taskArr[i];
        if (taskObj.id.toString() === taskId) taskObj.isCompleted = !taskObj.isCompleted;
    }
    setTaskInLocalStorage();
}

function handleRemove() {
    const taskId = this.id.toString();
    for (let i = 0; i < taskArr.length; i++) {
        const taskObj = taskArr[i];
        if (taskObj.id.toString() === taskId) taskArr.splice(i, 1);
    }
    setTaskInLocalStorage();
    this.remove();
}


function createTask(userInput, isCompleted, taskId) {
    // ? Creating new element with value
    const newElement = document.createElement("div");
    newElement.innerText = userInput;

    newElement.setAttribute("id", taskId);


    // ? Adding State for endUser
    if (isCompleted === true) newElement.setAttribute("class", "task completed");
    else newElement.setAttribute("class", "task");


    // ? Adding EventListener single click
    newElement.addEventListener("click", handleTaskClick);

    //  ? Adding EventLister double click
    newElement.addEventListener("dblclick", handleRemove)


    // ? Append to container
    taskContainer.append(newElement);
}


function setTaskInLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function getTaskInLocalStorage() {

    let tasks = localStorage.getItem('tasks')
    if (!tasks) return;

    tasks = JSON.parse(tasks);
    for (index in tasks) {
        const taskObj = tasks[index];
        createTask(taskObj.value, taskObj.isCompleted, taskObj.id);
        taskArr.push(tasks[index]);
    }
}
getTaskInLocalStorage()

function addTask(event) {
    //? Taking User Input
    const userInput = todoInputBox.value;
    const length = userInput.length;
    if (userInput.length === 0) return alert("Please Enter some task");

    // ? Check the Space
    if (userInput.replace(/[\s+]/g, "").length === 0) return alert("Please Enter Valid Task eg: Without Space");

    // ? Create empty Object for state managament
    let taskObj = {};
    taskObj.value = userInput;
    taskObj.isCompleted = false;

    // ? generate unique ID with help of Math random and date
    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();
    const hours = new Date().getHours().toString();
    const minutes = new Date().getMinutes().toString();
    const seconds = new Date().getSeconds().toString();
    const milliSecond = new Date().getMilliseconds().toString();

    const timeStamp = year + month + date + hours + minutes + seconds + milliSecond;
    let taskId = Math.random().toString() + timeStamp;
    taskObj.id = taskId;


    // ? Adding objtask in Array(arrayOfObject)
    taskArr.push(taskObj);

    // ? Adding Array in LocalStotage
    setTaskInLocalStorage()

    // ?  Creating new element with value
    createTask(userInput, false, taskId);

    // ? Remove the enter value in INPUTBOX and add focus
    todoInputBox.value = "";
    todoInputBox.focus();

}


function handlerEnter(event) {
    if (event.keyCode === 13) {
        addTask();
    }
}
todoAddButton.addEventListener("click", addTask);
todoInputBox.addEventListener("keyup", handlerEnter);
