function showEditTask(task, collection) {
    const element = htmlToElement(`
    <div class="edit-task modal-form">
        <div class="form-main">
            <input class="form-input" id="newDescription" maxlength="250" spellcheck="false" value="${task.description}"></input>
            <div class="form-buttons">
                <div class="form-button save">Save</div>
                <div class="form-button cancel">Cancel</div>
            </div>
        </div>
    </div>
    `);
    document.querySelector('.content').appendChild(element);
    addEditTaskEvents(task, element, collection);
}

function addEditTaskEvents(task, editTaskModal, collection) {
    const cancel = editTaskModal.querySelector('.cancel');
    cancel.addEventListener('click', () => {
        closeEditTask(editTaskModal);
    });

    const save = editTaskModal.querySelector('.save');
    save.addEventListener('click', () => {
        const newDescription = document.getElementById('newDescription').value;
        editTask(task, collection, newDescription);
        closeEditTask(editTaskModal);
    });
}

function closeEditTask(editTaskModal) {
    editTaskModal.remove();
}

