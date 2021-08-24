function Task(description, index) {
    return {
        id: ID(),
        description,
        isOpen: true,
        index
    };
}

function createTaskElement(task) {
    return htmlToElement(`
    <li class="contentTasks__taskListItem flexCenter" id="${task.id}">
    <div class="contentTasks__taskLeft flexCenter">
        <div class="contentTasks__toggleTaskStatus smallBox flexCenter">
            <i class="material-icons md-18">done</i>
        </div>
        <span class="contentTasks__taskText">${task.description}</span>
    </div>
    <div class="contentTasks__taskRight flexCenter">
        <i class="material-icons md-18 edit">edit</i>
        <i class="material-icons md-18 delete">delete</i>
        <i class="material-icons md-24">more_vert</i>
    </div>
</li>`);
};

function addTaskEvents(task, taskElement, collection) {
    // Creates hovered state for tasks
    taskElement.addEventListener('mouseover', function () {
        if (!onDrag) {
            taskElement.classList.add('hovered');
        }
    });

    // Resets hovered state for tasks
    taskElement.addEventListener('mouseout', function () {
        taskElement.classList.remove('hovered');
    });

    // Enters the onDrag state
    taskElement.addEventListener('dragstart', () => {
        onDrag = true;
    });

    // Leaves the onDrag state
    taskElement.addEventListener('dragend', () => onDrag = false);

    // Listens for clicks on the completeTask button
    const completeTaskButton = taskElement.querySelector('.contentTasks__toggleTaskStatus');
    completeTaskButton.addEventListener('click', function () {
        toggleStatus(task, collection);
        taskElement.classList.remove('hovered');
    });

    // Listens for clicks on the deleteTask button
    const deleteTaskButton = taskElement.querySelector('.delete');
    deleteTaskButton.addEventListener('click', function () {
        deleteTask(task, collection);
        taskElement.classList.remove('hovered');
    });

    const editTaskButton = taskElement.querySelector('.edit');
    editTaskButton.addEventListener('click', function () {
        showEditTask(task, collection);
    });
};

async function newTask(taskDescription, collection) {
    // TODO revisar atraso nessa funcao
    const index = await firTaskCountFilter(collection, 'isOpen', '==', true);
    const task = Task(taskDescription, index);
    const taskElement = createTaskElement(task);
    addTaskEvents(task, taskElement, collection);
    openTasksList.appendChild(taskElement);
    updateCount();
    await firPushTask(task, collection);
}

async function toggleStatus(task, collection) {
    const taskElement = document.getElementById(task.id);
    taskElement.remove;
    task.isOpen = !task.isOpen;
    if (task.isOpen) {
        openTasksList.appendChild(taskElement);
    } else {
        completedTasksList.appendChild(taskElement);
    }
    updateCount();
    task.index = await firTaskCountFilter(collection, 'isOpen', '==', task.isOpen);
    await firUpdateTask(task, collection);
    await updateIndex(collection);
}

async function editTask(task, collection, newDescription) {
    task.description = newDescription;
    const taskElementText = document.getElementById(task.id).querySelector('.contentTasks__taskText');
    taskElementText.innerText = newDescription;
    await firUpdateTask(task, collection);
};

async function deleteTask(task, collection) {
    const taskElement = document.getElementById(task.id);
    taskElement.remove();
    updateCount();
    await firRemoveTask(task, collection);
    await updateIndex(collection);
}

// Updates the index of all tasks on firestore
async function updateIndex(collection) {
    const openTasks = Array.from(openTasksList.children).map(task => task.id);
    const completedTasks = Array.from(completedTasksList.children).map(task => task.id);
    await updateById(openTasks, collection);
    await updateById(completedTasks, collection);
}

async function updateById(idList, collection) {
    for (let id of idList) {
        await firUpdateTask({ id, index: idList.indexOf(id) }, collection);
    }
}
