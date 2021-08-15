const content = document.querySelector('.content');

function showEditTask(task) {
    console.log(task.id);
    const element = htmlToElement(`
    <div class="editTask flexCenter">
    <div class="editTask__main flexCenter">
        <div class="editTask__header">
            <div class="editTask__title">Edit Task</div>
            <div class="editTask__close flexCenter">
                <i class="material-icons">close</i>
            </div>
        </div>
        <textarea class="editTask__text" id="newDescription" maxlength="250" spellcheck="false">${task.description}</textarea>
        <div class="editTask__buttons">
            <div class="editTask__button cancel flexCenter">Cancel</div>
            <div class="editTask__button save flexCenter">Save</div>
        </div>
    </div>
</div>
    `);
    content.appendChild(element);
    addEditTaskEvents(task, element);
    loadEditTaskScrollbar();
}

function addEditTaskEvents(task, editTaskModal) {
    const cancel = editTaskModal.querySelector('.cancel');
    cancel.addEventListener('click', () => {
        closeEditTask(editTaskModal);
    });

    const close = editTaskModal.querySelector('.editTask__close');
    close.addEventListener('click', () => {
        closeEditTask(editTaskModal);
    });

    const save = editTaskModal.querySelector('.save');
    save.addEventListener('click', () => {
        editTask(task);
        closeEditTask(editTaskModal);
    });
}

function closeEditTask(editTaskModal) {
    content.removeChild(editTaskModal);
}

async function editTask(task) {
    const newDescription = document.getElementById('newDescription').value;
    const taskElementText = document.getElementById(task.id).querySelector('.content__taskText');
    task.description = newDescription;
    taskElementText.innerText = newDescription;
    await firUpdateTask(task);
};

function loadEditTaskScrollbar() {
    const editTaskText = document.getElementById('newDescription');
    OverlayScrollbars(editTaskText, {
        scrollbars: {
            autoHide: 'leave',
        },
    });
}

