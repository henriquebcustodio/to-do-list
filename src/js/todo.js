let onDrag = false;

const sortableOptions = {
    animation: 350,
    dragClass: 'sortable-drag',
    onEnd: function (evt) {
        if (evt.newIndex !== evt.oldIndex) {
            updateIndex();
        }
    }
};

// Sortable lists for open and closed tasks
const openTasksList = document.querySelector('.content__taskList');
Sortable.create(openTasksList, sortableOptions);

const completedTasksList = document.querySelector('.content__taskList.completed');
Sortable.create(completedTasksList, sortableOptions);

// Gets the task description and sends it to the newTask functio
const taskInput = document.querySelector('.content__newTaskInput');
function addTask() {
    if (taskInput.value) {
        newTask(taskInput.value);
        taskInput.value = '';
    }
}

// Adds a new task when the button "+" is clicked
const addTaskButton = document.querySelector('.content__newTaskAdd');
addTaskButton.addEventListener('click', addTask);

// Adds a new task when the key "enter" is pressed
taskInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        addTask();
    }
});

// Gets the tasks from firestore and updates the screen
async function updateData() {
    let tasks = [];
    const snapshot = await firGetSnapshot();
    snapshot.forEach(doc => {
        tasks.push(doc.data());
    });
    updateScreen(tasks);
}

// Counts the number of open and completed tasks
openTasksNo = document.querySelector('#openTasksNo');
closedTasksNo = document.querySelector('#closedTasksNo');
function updateCount() {
    openTasksNo.innerText = openTasksList.childElementCount;
    completedTasksNo.innerText = completedTasksList.childElementCount;
}

// Creates the task elements on the screen every reload
function updateScreen(tasks) {
    tasks.sort((a, b) => a.index - b.index);
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        addTaskEvents(task, taskElement);
        if (task.isOpen === false) {
            completedTasksList.appendChild(taskElement);

        } else {
            openTasksList.appendChild(taskElement);
        }
    });
    updateCount();
}

updateData();