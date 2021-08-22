let onDrag = false;

function createTasksView(collection) {
    return htmlToElement(`
    <div class="contentTasks">
        <div class="contentTasks__header">
            <div class="contentTasks__headerLeft">
                <a href="#" class="contentTasks__returnButton">
                    <i class="material-icons md-30">chevron_left</i>
                </a>
                <span class="header__title">${collection.name}</span>
            </div>
            <div class="contentTasks__headerRight">
                <i class="material-icons">more_horiz</i>
                <div class="contentTasks__dropdownContent">
                    <div>Edit Collection</div>
                    <div>Delete Collection</div>
                </div>
            </div>
        </div>
        <div class="contentTasks__newTask">
            <div class="contentTasks__newTaskAdd smallBox flexCenter">
                <i class="material-icons md-18">add</i>
            </div>
            <input type="text" spellcheck="false" class="contentTasks__newTaskInput"
                placeholder="Add a task">
        </div>

        <div class="contentTasks__taskHeader">
            <span class="header__title tasks">Tasks - <span id="openTasksNo">0</span></span>
        </div>
        <ul class="contentTasks__taskList">
        </ul>
        <div class="contentTasks__taskHeader">
            <span class="header__title">Completed - <span id="completedTasksNo">0</span></span>
        </div>
        <ul class="contentTasks__taskList completed">
        </ul>
    </div>
    `);
};

function renderTasksView(collection) {

    const sortableOptions = {
        animation: 350,
        dragClass: 'sortable-drag',
        onEnd: function (evt) {
            if (evt.newIndex !== evt.oldIndex) {
                updateIndex(collection);
            }
        }
    };

    document.documentElement.style.setProperty('--dynamic-collection-color', collection.color);

    document.querySelector('.content__main').appendChild(createTasksView(collection));

    // Sortable lists for open and closed tasks
    openTasksList = document.querySelector('.contentTasks__taskList');
    Sortable.create(openTasksList, sortableOptions);

    completedTasksList = document.querySelector('.contentTasks__taskList.completed');
    Sortable.create(completedTasksList, sortableOptions);

    // Adds a new task when the button "+" is clicked
    addTaskButton = document.querySelector('.contentTasks__newTaskAdd');
    addTaskButton.addEventListener('click', () => addTask(collection));

    // Adds a new task when the key "enter" is pressed
    taskInput = document.querySelector('.contentTasks__newTaskInput');
    taskInput.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            addTask(collection);
        }
    });

    const returnButton = document.querySelector('.contentTasks__returnButton');
    returnButton.addEventListener('click', () => {
        closeTasksView();
        renderDashboardView();
        sidebarResetActive();
    });

    updateData(collection);
}

function closeTasksView() {
    const tasksView = document.querySelector('.contentTasks');
    tasksView.remove();
}

// Gets the task description and sends it to the newTask function
function addTask(collection) {
    if (taskInput.value) {
        newTask(taskInput.value, collection);
        taskInput.value = '';
    }
}

// Gets the tasks from firestore and updates the screen
async function updateData(collection) {
    let tasks = [];
    const snapshot = await firTasksSnapshot(collection);
    snapshot.forEach(doc => {
        tasks.push(doc.data());
    });
    updateScreen(tasks, collection);
}

// Counts the number of open and completed tasks
function updateCount() {
    const openTasksNo = document.querySelector('#openTasksNo');
    const completedTasksNo = document.querySelector('#completedTasksNo');
    openTasksNo.innerText = openTasksList.childElementCount;
    completedTasksNo.innerText = completedTasksList.childElementCount;
}

// Creates the task elements on the screen every reload
function updateScreen(tasks, collection) {
    tasks.sort((a, b) => a.index - b.index);
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        addTaskEvents(task, taskElement, collection);
        if (task.isOpen === false) {
            completedTasksList.appendChild(taskElement);

        } else {
            openTasksList.appendChild(taskElement);
        }
    });
    updateCount();
}