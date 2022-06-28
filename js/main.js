/* 
로직
1. 유저가 값을 인풋에 입력한다. 
2. 버튼과 + 버튼을 누르면 아이템, 즉 할 일이 추가된다. 
3. 유저가 delete 버튼을 누르면 할 일이 삭제된다. 
4. check 버튼을 누르면 할 일이 끝나며, 줄이 그어진다. 
5. 진행 중, 끝남 탭을 누르면 언더바가 이동한다. 
6. 끝남 탭은 끝난 아이템만, 진행 중 탭은 진행 중인 아이템만 보여준다. 
7. 전체 탭을 누르면 전체 아이템을 보여준다. 
*/

let taskInput = document.getElementById('task-input');
// console.log('task-input');
let addButton = document.getElementById('add-button');
//console.log('add-button');
let taskList = []; // taskList 함수는 taskContent의 value를 담은 배열 

addButton.addEventListener('click',addTask); // addButton을 클릭했을 때 addTask 함수를 실행하겠다.
function addTask () {
    //console.log('click');
    let taskContent = taskInput.value; // taskContent에는 taskInput의 value 값이 들어간다. 즉 유저가 적는 할 일이라는 뜻이다. 
    taskList.push(taskContent); // taskList에 taskContent의 값을 푸쉬, 즉 밀어 넣겠다.
    //console.log(taskList);
    render();
}
function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class = "task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
        </div>`;
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}