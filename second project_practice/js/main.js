let taskInput = document.getElementById('task-input');
//console.log('taskInput');
let addButton = document.getElementById('add-button');
//console.log('addButton');
let taskList = [];

addButton.addEventListener('click', addTask);
function addTask() {
    let taskValue = taskInput.value;
    let task = {
        id: randomIdGenerate(),
        taskContent: taskValue,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}
function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == true) {
            resultHTML += `<div class = "task task-done">
            <span>${taskList[i].taskContent}</span>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button>Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class = "task">
            <span>${taskList[i].taskContent}</span>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button>Delete</button>
            </div>
            </div>`;
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
/* function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    console.log(taskList);
    render();
} */

function randomIdGenerate() {
    return Math.random().toString(36).substr(2, 16);
}
