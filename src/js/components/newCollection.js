let ignoreClick = false;

function showNewCollection() {
    const element = htmlToElement(`
    <div class="newCollection modalForm flexCenter">
        <div class="formMain flexCenter" data-simplebar>
            <div class="newCollection__label">
                <span>Name</span>
            </div>
            <textarea class="formInput" id="collectionName" maxlength="10" spellcheck="false" rows="1"
                placeholder="My Collection" required></textarea>
            <div class="newCollection__label">
                <span>Icon</span>
            </div>
            <div class="newCollection__icon">
                <div class="newCollection__iconWrapper flexCenter">
                    <i class="material-icons">label</i>
                </div>
                <div class="newCollection__dropdownContent">
                </div>
            </div>
            <div class="newCollection__label">
                <span>Color</span>
            </div>
            <div class="newCollection__colors">
            </div>
            <div class="formButtons">
                <div class="formButton save flexCenter">Create</div>
                <div class="formButton cancel flexCenter">Cancel</div>
            </div>
        </div>
    </div>
    `);
    document.querySelector('.content').appendChild(element);
    addNewCollectionEvents(element);
    loadIcons();
    loadColors();
    loadNewCollectionScrollbar();
}

function addNewCollectionEvents(newCollectionModal) {
    const cancel = newCollectionModal.querySelector('.cancel');
    cancel.addEventListener('click', () => {
        closeNewCollection(newCollectionModal);
    });

    const add = newCollectionModal.querySelector('.save');
    add.addEventListener('click', () => {
        addCollection();
        closeNewCollection(newCollectionModal);
    });

    const iconSelector = newCollectionModal.querySelector('.newCollection__iconWrapper');
    const dropdownMenu = document.querySelector('.newCollection__dropdownContent');
    iconSelector.addEventListener('click', () => {
        ignoreClick = true;
        dropdownMenu.classList.toggle('visible');
    });

    newCollectionModal.querySelector('.formMain').addEventListener('click', () => {
        if (dropdownMenu.classList.contains('visible') && !ignoreClick) {
            dropdownMenu.classList.toggle('visible');
        }
        ignoreClick = false;
    });
}

function closeNewCollection(newCollectionModal) {
    newCollectionModal.remove();
}

function loadIcons() {
    const dropdownMenu = document.querySelector('.newCollection__dropdownContent');
    icons.forEach(iconName => {
        const iconElement = htmlToElement(`<i class="material-icons md-24">${iconName}</i>`);
        dropdownMenu.appendChild(iconElement);
        iconElement.addEventListener('click', () => {
            document.querySelector('.newCollection__iconWrapper i').innerHTML = iconElement.innerHTML;
        });
    });
}

function loadColors() {
    const colorsWrapper = document.querySelector('.newCollection__colors');
    colors.forEach(color => {
        const colorElement = htmlToElement(`<div class="colorItem" id="${color}" style="border: 3px solid ${color};"></div>`);
        colorsWrapper.appendChild(colorElement);
        colorElement.addEventListener('click', () => {
            colorsWrapper.children.forEach(child => {
                child.classList.remove('active');
                child.style.backgroundColor = 'transparent';
            });
            colorElement.classList.toggle('active');
            colorElement.style.backgroundColor = colorElement.getAttribute('id');
        });
    });
    const firstColorItem = colorsWrapper.querySelector('.colorItem');
    firstColorItem.style.backgroundColor = firstColorItem.getAttribute('id');
    firstColorItem.classList.toggle('active');
}

function addCollection() {
    const name = document.querySelector('#collectionName').value;
    const color = document.querySelector('.newCollection .colorItem.active').getAttribute('id');
    const icon = document.querySelector('.newCollection__iconWrapper i').innerHTML;
    newCollection(name, color, icon);
}

function loadNewCollectionScrollbar() {
    const newCollection = document.getElementById('collectionName');
    OverlayScrollbars(newCollection, {
        textarea: {
            dynHeight: true
        }
    });
}
