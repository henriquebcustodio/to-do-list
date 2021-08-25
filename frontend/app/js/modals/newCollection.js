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
    <div class="newCollection modalForm flexCenter">
        <div class="formMain flexCenter" data-simplebar>
            <div class="newCollection__label">
                <span>Name</span>
            </div>
            <input class="formInput" id="collectionName" maxlength="15" spellcheck="false" rows="1"
                placeholder="My Collection" value="${name}"required></input>
            <div class="newCollection__label">
                <span>Icon</span>
            </div>
            <div class="newCollection__icon">
                <div class="newCollection__iconWrapper flexCenter">
                    <i class="material-icons">${icon}</i>
                </div>
                <div class="newCollection__dropDownContent">
                </div>
            </div>
            <div class="newCollection__label">
                <span>Color</span>
            </div>
            <div class="newCollection__colors">
            </div>
            <div class="formButtons">
                <div class="formButton save flexCenter">${buttonText}</div>
                <div class="formButton cancel flexCenter">Cancel</div>
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

    const iconSelector = newCollectionModal.querySelector('.newCollection__iconWrapper');
    const dropDownMenu = document.querySelector('.newCollection__dropDownContent');
    iconSelector.addEventListener('click', () => {
        newCollectionIgnoreClick = true;
        dropDownMenu.classList.toggle('visible');
    });

    newCollectionModal.querySelector('.formMain').addEventListener('click', () => {
        if (dropDownMenu.classList.contains('visible') && !newCollectionIgnoreClick) {
            dropDownMenu.classList.toggle('visible');
        }
        newCollectionIgnoreClick = false;
    });
}

function closeNewCollection(newCollectionModal) {
    newCollectionModal.remove();
}

function loadIcons() {
    const dropDownMenu = document.querySelector('.newCollection__dropDownContent');
    icons.forEach(iconName => {
        const iconElement = htmlToElement(`<i class="material-icons md-24">${iconName}</i>`);
        dropDownMenu.appendChild(iconElement);
        iconElement.addEventListener('click', () => {
            document.querySelector('.newCollection__iconWrapper i').innerHTML = iconElement.innerHTML;
        });
    });
}

function loadColors(collection) {
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

    if (collection !== undefined) {
        const colorItem = document.getElementById(collection.color);
        colorItem.style.backgroundColor = collection.color;
        colorItem.classList.toggle('active');
    } else {
        const firstColorItem = colorsWrapper.querySelector('.colorItem');
        firstColorItem.style.backgroundColor = firstColorItem.getAttribute('id');
        firstColorItem.classList.toggle('active');
    }
}

function addCollection() {
    const name = document.querySelector('#collectionName').value;
    const color = document.querySelector('.newCollection .colorItem.active').getAttribute('id');
    const icon = document.querySelector('.newCollection__iconWrapper i').innerHTML;
    newCollection(name, color, icon);
}

function updateCollection(collection) {
    const name = document.querySelector('#collectionName').value;
    const color = document.querySelector('.newCollection .colorItem.active').getAttribute('id');
    const icon = document.querySelector('.newCollection__iconWrapper i').innerHTML;
    collection.name = name;
    collection.color = color;
    collection.icon = icon;
    editCollection(collection);
}
