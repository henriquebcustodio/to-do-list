function showEditTask(task, collection) {
    const element = htmlToElement(`
    <div class="editTask modalForm flexCenter">
        <div class="formMain flexCenter">
            <textarea class="formInput" id="newDescription" maxlength="250" spellcheck="false" rows="1" required>${task.description}</textarea>
            <div class="formButtons">
                <div class="formButton save flexCenter">Save</div>
                <div class="formButton cancel flexCenter">Cancel</div>
            </div>
        </div>
    </div>
    `);
    document.querySelector('.content').appendChild(element);
    addEditTaskEvents(task, element, collection);
    loadEditTaskScrollbar();
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

function loadEditTaskScrollbar() {
    const editTaskText = document.getElementById('newDescription');
    OverlayScrollbars(editTaskText, {
        textarea: {
            dynHeight: true
        }
    });
}

