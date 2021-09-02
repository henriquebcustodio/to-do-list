let ignoreClick = false;

function showNewCollection(collection) {
    // Reusing this modal to edit the collection. This is done by passing a collection object as argument
    if (typeof collection !== 'undefined') {
        var name = collection.name;
        var icon = collection.icon;
        var buttonText = 'Edit';
    } else {
        var name = '';
        var icon = 'label';
        var buttonText = 'Create';
    }

    const element = htmlToElement(`
    <div class="new-collection modal-form">
        <div class="form-main" data-simplebar>
            <div class="new-collection__label">
                <span>Name</span>
            </div>
            <input class="form-input" id="collectionName" maxlength="15" spellcheck="false" rows="1"
                placeholder="My Collection" value="${name}"required></input>
            <div class="new-collection__label">
                <span>Icon</span>
            </div>
            <div class="new-collection__icon">
                <div class="new-collection__icon-wrapper">
                    <i class="material-icons">${icon}</i>
                </div>
                <div class="new-collection__dropdown-content">
                </div>
            </div>
            <div class="new-collection__label">
                <span>Color</span>
            </div>
            <div class="new-collection__colors">
            </div>
            <div class="form-buttons">
                <div class="form-button save">${buttonText}</div>
                <div class="form-button cancel">Cancel</div>
            </div>
        </div>
    </div>
    `);
    document.querySelector('.content').appendChild(element);
    addNewCollectionEvents(element, collection);
    loadIcons();
    loadColors(collection);
}

function addNewCollectionEvents(newCollectionModal, collection) {
    const cancel = newCollectionModal.querySelector('.cancel');
    cancel.addEventListener('click', () => {
        closeNewCollection(newCollectionModal);
    });

    const save = newCollectionModal.querySelector('.save');
    save.addEventListener('click', () => {
        if (typeof collection !== 'undefined') {
            updateCollection(collection);
        } else {
            addCollection();
        }
        closeNewCollection(newCollectionModal);
    });

    const iconSelector = newCollectionModal.querySelector('.new-collection__icon-wrapper');
    const dropdownMenu = document.querySelector('.new-collection__dropdown-content');
    iconSelector.addEventListener('click', () => {
        newCollectionIgnoreClick = true;
        dropdownMenu.classList.toggle('visible');
    });

    newCollectionModal.querySelector('.form-main').addEventListener('click', () => {
        if (dropdownMenu.classList.contains('visible') && !newCollectionIgnoreClick) {
            dropdownMenu.classList.toggle('visible');
        }
        newCollectionIgnoreClick = false;
    });
}

function closeNewCollection(newCollectionModal) {
    newCollectionModal.remove();
}

function loadIcons() {
    const dropdownMenu = document.querySelector('.new-collection__dropdown-content');
    icons.forEach(iconName => {
        const iconElement = htmlToElement(`<i class="material-icons md-24">${iconName}</i>`);
        dropdownMenu.appendChild(iconElement);
        iconElement.addEventListener('click', () => {
            document.querySelector('.new-collection__icon-wrapper i').innerHTML = iconElement.innerHTML;
        });
    });
}

function loadColors(collection) {
    const colorsWrapper = document.querySelector('.new-collection__colors');
    colors.forEach(color => {
        const colorElement = htmlToElement(`<div class="color-item" id="${color}" style="border: 3px solid ${color};"></div>`);
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

    if (collection !== undefined) {
        const colorItem = document.getElementById(collection.color);
        colorItem.style.backgroundColor = collection.color;
        colorItem.classList.toggle('active');
    } else {
        const firstColorItem = colorsWrapper.querySelector('.color-item');
        firstColorItem.style.backgroundColor = firstColorItem.getAttribute('id');
        firstColorItem.classList.toggle('active');
    }
}

function addCollection() {
    const name = document.querySelector('#collectionName').value;
    const color = document.querySelector('.new-collection .color-item.active').getAttribute('id');
    const icon = document.querySelector('.new-collection__icon-wrapper i').innerHTML;
    newCollection(name, color, icon);
}

function updateCollection(collection) {
    const name = document.querySelector('#collectionName').value;
    const color = document.querySelector('.new-collection .color-item.active').getAttribute('id');
    const icon = document.querySelector('.new-collection__icon-wrapper i').innerHTML;
    collection.name = name;
    collection.color = color;
    collection.icon = icon;
    editCollection(collection);
}
