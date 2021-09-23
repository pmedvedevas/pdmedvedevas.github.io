let taskList = [];



// creates todo object with a task and boolean value stores task to li element
function addTask(text) {
  const todo = {
    text,
    checked: false,
  };
  taskList.push(todo);
  //creates li and stores last array element's value
    let listEl = document.createElement('li');
    let check = document.createElement('div');
    check.setAttribute('id','check');

    document.getElementById('task-list').appendChild(listEl);
    document.getElementById('task-list').appendChild(check);

    listEl.innerHTML = taskList[taskList.length-1].text;
    check.innerHTML = 'not completed';

    document.getElementById('check').addEventListener("click", function() {
        document.getElementById('check').classList.toggle('is-checked');
        document.getElementById('check').innerHTML = "completed"}
        )
}


// after sumbission text input is trimmed and calls addTask function for its value to be pushed into taskList array
const form = document.getElementById('taskForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  let input = document.getElementById('task');
  let task = input.value.trim();
  if (task !== '') {
    addTask(task);
    input.value = '';
    input.focus();
  }
});


