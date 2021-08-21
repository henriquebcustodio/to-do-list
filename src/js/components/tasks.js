function Task(description, index) {
    return {
        id: ID(),
        description: description,
        isOpen: true,
        index: index
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
    </div>
</li>`);
};

function addTaskEvents(task, taskElement) {
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
        toggleStatus(task);
        taskElement.classList.remove('hovered');
    });

    // Listens for clicks on the deleteTask button
    const deleteTaskButton = taskElement.querySelector('.delete');
    deleteTaskButton.addEventListener('click', function () {
        deleteTask(taskElement);
        taskElement.classList.remove('hovered');
    });

    const editTaskButton = taskElement.querySelector('.edit');
    editTaskButton.addEventListener('click', function () {
        showEditTask(task);
    });
};

async function newTask(taskDescription) {
    const index = await firTaskCount('isOpen', '==', true);
    const task = Task(taskDescription, index);
    const taskElement = createTaskElement(task);
    addTaskEvents(task, taskElement);
    openTasksList.appendChild(taskElement);
    updateCount();
    await firPushTask(task);
}

async function toggleStatus(task) {
    const taskElement = document.getElementById(task.id);
    taskElement.remove;
    task.isOpen = !task.isOpen;
    if (task.isOpen) {
        openTasksList.appendChild(taskElement);
    } else {
        completedTasksList.appendChild(taskElement);
    }
    updateCount();
    task.index = await firTaskCount('isOpen', '==', task.isOpen);
    await firUpdateTask(task);
    await updateIndex();
}

async function deleteTask(task) {
    const taskElement = document.getElementById(task.id);
    taskElement.remove();
    updateCount();
    await firRemoveTask(task);
    await updateIndex();
}

// Updates the index of all tasks on firestore
async function updateIndex() {
    const openTasks = Array.from(openTasksList.children).map(task => task.id);
    const completedTasks = Array.from(completedTasksList.children).map(task => task.id);
    await updateById(openTasks);
    await updateById(completedTasks);
}

async function updateById(idList) {
    for (let id of idList) {
        await firUpdateTask({ id, index: idList.indexOf(id) });
    }
}
