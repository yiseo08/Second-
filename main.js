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

let taskInput = document.getElementById('task-input'); // 인풋에 입력할 값을 변수로 저장
// console.log('task-input');
let addButton = document.getElementById('add-button'); // + 버튼을 클릭하는 순간 인풋에 입력한 값이 쌓이는 느낌으로 보여짐
//console.log('add-button');
let taskList = []; // taskList 함수는 taskContent의 value를 담은 배열
let filterList = []; // filterList 지역변수였는데 전역변수로 선언
let tabs = document.querySelectorAll('.task-tabs div'); // querySelectorAll 을 써야 해당되는 모든 것들이 같이 선택됨. 하위 div 모두를 선택하겠다.
console.log(tabs);
addButton.addEventListener('click', addTask); // addButton을 클릭했을 때(이벤트를 주는 거임) addTask 함수를 실행하겠다.
let mode = 'all'; // 원래 기본값이 '' 이었는데 이러면 다른 탭을 눌러도 출력이 안됨. 그래서 all로 바꾸어야 함
addButton.addEventListener('click', addTask); // addButton 을 클릭했을 때 addTask 함수를 실행한다.
taskInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});
for (let i = 1 /* 필요한 tab 3개만 가져오려고. 인덱스 0이 under-line인데 이건 필요 없음 */; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    });
}
function addTask() {
    let taskValue = taskInput.value;
    let task = {
        // 필요하고 관련있는 정보를 하나로 묶어주는 역할.
        id: randomIdGenerate() /* 각각의 아이템에게 부여하는 값. 아이템을 구분해서 check 버튼이 눌린 값에 줄을 친다 */,
        taskContent: taskValue, // taskContent의 값을 넣을 건데, 여기에는 taskInput의 value 값 들어감. 그래서 밑에 거 지워도 됨
        isComplete: false, // 기본값이 false 라는 건 완료되지 않은 일. true가 되면 완료된 일이고 줄이 그어져야 함ㅌㅇ
    }; // 이 task는 이제 taskList에 나열시켜야 한다. 즉 푸쉬되게 해야 한다.
    taskList.push(task);
    //console.log('click');
    // let taskContent = taskInput.value; // taskContent에는 taskInput의 value 값이 들어간다. 즉 유저가 적는 할 일이라는 뜻이다.
    // taskList.push(taskContent); // taskList에 taskContent의 값을 푸쉬, 즉 밀어 넣겠다.
    console.log(taskList); // 즉, taskList 배열에는 taskContent 유저가 입력한 값이 들어가는 셈, task 객체에 taskContent 값이 들어가니까
    render(); // taskList 배열에 저장된 값을 화면에 보이게 만들어주는 함수, addButton이 클릭되고 addTask 함수가 실행될 때 보여져야 하니까 여기에 렌더 함수 실행
}

function render() /* taskList 배열에 저장된 값을 화면에 보이게 만들어주는 함수 */ {
    let resultHTML = '';
    let list /* 의미없는 리스트 */ = [];
    if (mode == 'all') {
        list = taskList; // 지금은 mode가 all 일 때만 기본값이 출력됨
    } else {
        list = filterList;
    }
    for (let i = 0; i < /* task - 실행되기 위해 list로 바꿔주어야 한다 */ list.length; i++) /* i가 taskList 배열의 길이값만큼 오되, 한 바퀴 당 i값 1씩 증가 */ {
        /* isComplete 가 true 일 때 스타일 넣어주기 */
        if (list[i].isComplete /*  == true */) {
            resultHTML += `<div class = "task task-done" id = "${list[i].id}"> 
        <span>${list[i].taskContent /* -> 배열에 있는 객체가 아닌 객체 안에 있는 객체의 taskContent만 출력해야 함 */}</span>
        <div class = 'button-box'>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </div>`;
        } else {
            /* isComplete가 true가 아닐 때 */
            resultHTML += `<div class = "task" id = "${list[i].id}"> 
        <span>${list[i].taskContent /* -> 배열에 있는 객체가 아닌 객체 안에 있는 객체의 taskContent만 출력해야 함 */}</span>
        <div class = 'button-box'>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </div>`;
        }

        /* resultHTML += `<div class = "task"> = taskList 안의 아이템을 꺼내 화면에 보이게 한다. */
        /* innerHTML을 썼기 때문에 task-board의 HTML 구조 그대로를 인식해준다. */
        /* ${taskList[i]} = 배열에 집어넣은 값이 순서대로 표시된다. 백틱 안의 달러표시, 중괄호 안 변수 이름 혹은 함수 이름을 넣을 때는 동적인 값, 즉 변화하는 값을 주고 싶을 때 백틱을 써서 사용*/
        // toggle : 버튼 하나로 두 가지 기능을 하게 하는 함수(누르면 기능하고, 다시 누르면 돌아오고), toggleComplete 함수를 선언하고 밑에 만들자
        /* 
        <클릭 이벤트를 주는 방법 두 가지>
         - addEventListener 사용
         - 해당 태그에 onclick 속성 주기
            -> onclick="함수이름()" 의 양식으로 사용할 수 있다. 
         */
    }
    document.getElementById('task-board').innerHTML = resultHTML; // task-board에 resultHTML의 내용을 저장될 수 있도록 함
}
/* 
<간단한 개념 설명>
innerHTML과 textContent의 차이점
 - innerHTML : Element의 HTML, XML을 읽어오거나, 설정할 수 있다. 태그 안에 있는 HTML 전체 내용을 들고 온다. 
 - textContent : 해상 노드가 가지고 있는 텍스트 값을 그대로 가지고 온다. 
*/
function toggleComplete(id) {
    //console.log(id);
    for (let i = 0; i < taskList.length; i++) {
        if (
            taskList[i].id ===
            id /* taskList의 i 번째 있는 아이템의 id가 지금 내가 매개변수로 받은 id와 일치한다면(check 버튼을 누르는 순간, check 버튼은 taskList의 i 번째 아이템의 id를 매개변수로 받는다.) */
        ) {
            taskList[i].isComplete = !taskList[i].isComplete; //id 값이 일치할 때, isComplete값이 무엇이든 그 반대가 나온다.
            break;
        }
    }
    filter();
    //console.log(taskList);
    // id 값을 받아올 수 있는 매개변수가 필요하고, id 값이 toggleComplete에 전달이 돼야 한다.
    // 이건 check 버튼. 동작을 할 때 해당되는 순서값을 가진 객체에 id 정보를 인자로 전달 받아야 한다. 전달받은 인자는 id 로 매개변수 선언을 하고, 이걸로 기능을 하게 만들어야 한다.
}
function deleteTask(id) {
    //console.log("삭제가 되는지");
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1); /* index 값 i번째에 있는 하나의 아이템을 삭제한다. */
            break;
        }
    }
    //console.log(taskList);
    filter();
}
function filter(event) {
    if (event) {
        mode = event.target.id;
        //console.log('check', event.target.id) // event : 클릭했을 때 발생되는 모든 상황 / 어떤 걸 클릭했는지 알고 싶을 때 .target
        document.getElementById('under-line').style.width = event.target.offsetWidth + 'px'; // 클릭된 속성의 너비값 만큼 넓어지라는 뜻 + 단위는 픽셀로
        document.getElementById('under-line').style.top = '52px';
        document.getElementById('under-line').style.left = event.target.offsetLeft + 'px'; // 클릭된 속성의 left 값만큼 옮겨가라는 뜻 + 단위는 픽셀로
    }

    filterList = []; // filter 라는 함수가 시작될 때, 비어있는 상태에서 시작해 무슨 탭을 눌렀느냐에 따라
    /* if (mode == 'all') {
        render();
    } else */ if (mode === 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        //render();
    } else if (mode === 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        //render();
    } // mode에 따라 list의 내용을 정해줌
    render();
    //console.log(filterList);
    //taskList = filterList; // render 전에 taskList를 filterList로 바꿔주어야 한다. 하지만 이렇게 했을 때 taskList가 filterList로 덮어쓰기 돼서 안됨
    //render(); // filterList를 프린트해야 하는데 이건 지역변수라서 render 부르면 taskList 나옴 (윗줄)
    console.log(filterList);
}

function randomIdGenerate() {
    return Math.random().toString(36).substr(2, 16);
} /* 각각의 아이템에 랜덤으로 유일한 아이디를 부여하는 함수 */
