let onDrag = false;

function createTasksView(collection) {
    return htmlToElement(`
    <div class="tasks">
        <div class="tasks__header">
            <div class="tasks__header tasks__header--left">
                <div class="tasks__return-button">
                    <i class="tasks__return-button-icon material-icons md-30">chevron_left</i>
                </div>
                <span class="tasks__title">${collection.name}</span>
            </div>
            <div class="tasks__header tasks__header--right">
                <i class="tasks__more material-icons">more_horiz</i>
                <div class="tasks__dropdown-content dropdown">
                    <div id="editCollection">Edit Collection</div>
                    <div id="deleteCollection">Delete Collection</div>
                </div>
            </div>
        </div>
        <div class="tasks__new-task">
            <div class="tasks__add  flexCenter">
                <i class="tasks__add-icon material-icons md-18">add</i>
            </div>
            <input type="text" spellcheck="false" class="tasks__new-task-input"
                placeholder="Add a task">
        </div>

        <div class="tasks__list-header">
            <span class="tasks__title tasks">Tasks - <span id="openTasksNo">0</span></span>
        </div>
        <ul class="tasks__task-list">
        </ul>
        <div class="tasks__list-header">
            <span class="tasks__title">Completed - <span id="completedTasksNo">0</span></span>
        </div>
        <ul class="tasks__task-list completed">
        </ul>
    </div>
    `);
};

function renderTasksView(collection) {

    const sortableOptions = {
        delay: 200,
        delayOnTouchOnly: true,
        animation: 350,
        dragClass: 'sortable-drag',
        filter: '.no-drag',
        onStart: evt => {
            navigator.vibrate(15);
        },
        onEnd: function (evt) {
            if (evt.newIndex !== evt.oldIndex) {
                updateIndex(collection);
            }
        }
    };

    document.documentElement.style.setProperty('--dynamic-collection-color', collection.color);

    document.querySelector('.content__main').appendChild(createTasksView(collection));

    // Sortable lists for open and closed tasks
    openTasksList = document.querySelector('.tasks__task-list');
    Sortable.create(openTasksList, sortableOptions);

    completedTasksList = document.querySelector('.tasks__task-list.completed');
    Sortable.create(completedTasksList, sortableOptions);

    loadTasksViewEvents(collection);
    updateData(collection);
}

function loadTasksViewEvents(collection) {
    // Adds a new task when the button "+" is clicked
    addTaskButton = document.querySelector('.tasks__add');
    addTaskButton.addEventListener('click', () => addTask(collection));

    // Adds a new task when the key "enter" is pressed
    taskInput = document.querySelector('.tasks__new-task-input');
    taskInput.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            addTask(collection);
        }
    });

    const returnButton = document.querySelector('.tasks__return-button');
    returnButton.addEventListener('click', () => {
        closeTasksView();
        renderDashboardView();
        sidebarResetActive();
    });

    const dotMenu = document.querySelector('.tasks__header--right i');
    const dropdownMenu = document.querySelector('.tasks__dropdown-content');
    dotMenu.addEventListener('click', e => {
        const isActive = dropdownMenu.classList.contains('active');
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        if (isActive) {
            dropdownMenu.classList.remove('active');
        } else {
            dropdownMenu.classList.add('active');
        }
        e.stopPropagation();
    });

    const deleteCollectionButton = document.querySelector('#deleteCollection');
    deleteCollectionButton.addEventListener('click', () => {
        deleteCollection(collection);
        dropdownMenu.classList.toggle('active');
    });

    const editCollectionButton = document.querySelector('#editCollection');
    editCollectionButton.addEventListener('click', () => {
        showNewCollection(collection);
        dropdownMenu.classList.toggle('active');
    });
}

function closeTasksView() {
    const tasksView = document.querySelector('.tasks');
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