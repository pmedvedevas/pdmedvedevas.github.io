// submit ->checks and trims input calls addTask()
const form = document.getElementById('taskForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  let input = document.getElementById('task');
  let task = input.value.trim();
  if (task !== '') {
    addTask(task);
    input.value = '';
  }
});

//empty array will contain submitted 'tasks'
let taskList = [];

// addTask function generates li element and ascribes two event listeners
function addTask(text) {
  taskList.push(text);
    let listEl = document.createElement('li');
    document.getElementById('task-list').appendChild(listEl);
    listEl.innerHTML = crossIcon + "<p>" + taskList[taskList.length-1] + "</p>" + "<button class='check'>incomplete</button>";
    listEl.setAttribute('class',"todo");

//event listener to update completion status
let check = listEl.querySelector('.check');
    check.addEventListener("click", function() {
        check.classList.toggle('is-checked');
        if(check.innerHTML !== 'completed') {
          check.innerHTML = "completed";
        } else {
          check.innerHTML = "incomplete";
        }
      })

//event listener to remove 'task' from list
let cross = listEl.querySelector('#cross');
    cross.addEventListener('click', function() {
      listEl.remove();
    })

    check.addEventListener('mouseover', function(){
      check.classList.add('buttonHover');
    })
    check.addEventListener('mouseout', function(){
      check.classList.remove('buttonHover');
    })
}

//svg cross icon is inserted with 'task' submission
let crossColor = '#79B4B7';
let crossIcon = `<svg id="cross" data-name="cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><defs><style>.cls-1{fill:${crossColor};}.cls-2{fill:none;stroke:${crossColor};stroke-linecap:round;stroke-miterlimit:10;stroke-width:4.17px;}</style></defs><path class="cls-1" d="M15,3A12,12,0,1,1,6.51,6.51,12,12,0,0,1,15,3m0-3A15,15,0,1,0,25.61,4.39,15,15,0,0,0,15,0Z" transform="translate(0 0)"/><line class="cls-2" x1="10" y1="20" x2="20" y2="10"/><line class="cls-2" x1="20" y1="20" x2="10" y2="10"/></svg>`;





