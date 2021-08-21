const content = document.querySelector('.content');

function showEditTask(task) {
    console.log(task.id);
    const element = htmlToElement(`
    <div class="editTask flexCenter">
    <div class="editTask__main flexCenter">
        <textarea class="editTask__text" id="newDescription" maxlength="250" spellcheck="false" rows="1">${task.description}</textarea>
        <div class="editTask__buttons">
            <div class="editTask__button save flexCenter">Save</div>
            <div class="editTask__button cancel flexCenter">Cancel</div>
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
    const taskElementText = document.getElementById(task.id).querySelector('.contentTasks__taskText');
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
        textarea: {
            dynHeight: true
        }
    });
}

