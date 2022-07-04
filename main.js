/* 
로직정리
1. 유저가 값을 인풋에 입력한다.
2. 버튼, + 버튼을 클릭하면 아이템이 추가된다. 즉, 할 일이 추가된다 ...
3. 유저가 delete 버튼을 누르면 할 일이 삭제된다.
4. 체크 버튼을 누르면 할일이 끝나면서 줄이 그어진다.
5. 진행 중, 끝남 탭을 누르면, 언더바가 이동한다.
6. 끝남 탭은 끝난 아이템만, 진행 중 탭은 진행 중인 아이템만 보인다. 
7. 전체탭을 누르면 전체 아이템을 볼 수 있다. 
*/
let taskInput = document.getElementById('task-input');
// console.log(taskInput);
let addButton = document.getElementById('add-button');
// console.log(addButton);
let taskList = [];
let filterList = [];
let tabs = document.querySelectorAll('.task-tabs div');
let mode = 'all';
console.log(tabs);
addButton.addEventListener('click', addTask); // addButton 을 클릭했을 때 addTask 함수를 실행한다.

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    });
}

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false, //완료되지 않은 일. isComplete의 값이 true면 완료 된 일
    };
    taskList.push(task);
    // console.log('click check'); addButton을 클릭했을 때 콘솔 창에 click check 라는 글자가 보임
    // let taskContent = taskInput.value; '객체 안에 넣어 쓸 거라 더 이상 필요 없음' taskContent에는 taskInput의 value 값이 들어감
    // taskList.push(taskContent); taskList안에 taskContent의 값을 밀어 넣겠다.
    console.log(taskList);
    render();
}
function render() {
    let list = [];
    if (mode == 'all') {
        list = taskList;
    } /* if (mode == 'ongoing') {
        list = filterList;
    } else if (mode == 'done') */ else {
        list = filterList;
    }
    let resultHTML = '';
    for (let i = 0; i < list /* taskList */.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent /* taskList의 taskContent 값만 출력하시오 */}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check </button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent /* taskList의 taskContent 값만 출력하시오 */}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
        }
        /* 클릭이벤트를 주는 방법 두가지 
        ... addEventListener를 이용하거나 ...
            해당 태그에 onclick 속성을 주는방법 : onclick="함수이름()" 의 양식으로 이용할 수 있다! */
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}
/*  
innerHTML과 textContent의 차이점 
innerHTML : Element의 HTML, XML을 읽어 오거나, 설정할 수 있다. 태그 안에 있는 HTML 전체 내용을 들고 온다.
textContent : 해상 노드가 가지고 있는 텍스트 값을 그대로 가지고 온다.
*/
function toggleComplete(id) {
    // console.log(id);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
function deleteTask(id) {
    // console.log(id);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    console.log(taskList);
    render();
}
function filter(event) {
    mode = event.target.id;
    filterList = [];
    // console.log('check', event.target.id);
    document.getElementById('under-line').style.width = event.target.offsetWidth + 'px'; // 클릭된 속성의 너비값 만큼 넚어짐 / CSS 속성값 기준으로 _ - _ 속성일 때, js는 - 뒷 부분을 대문자로
    document.getElementById('under-line').style.top = '52px';
    document.getElementById('under-line').style.left = event.target.offsetLeft + 'px'; // 너비에 대한 속성
    if (mode == 'all') {
        render();
    } else if (mode == 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if (mode == 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    console.log(filterList);
}
function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
}
