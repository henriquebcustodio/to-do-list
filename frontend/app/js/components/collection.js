function Collection(name, color, icon) {
    return {
        id: ID(),
        owner: currentUser.uid,
        name,
        color,
        icon
    };
}

function createCollectionElement(collection) {
    return htmlToElement(`
    <div class="collection ${collection.id}">
        <div class="collection__header">
            <div class="collection__icon-container flexCenter" style="background-color:${collection.color}">
                <i class="collection__icon material-icons">${collection.icon}</i>
            </div>
        </div>
        <div class="collection__info">
            <div class="collection__tips">
                <span class="collection__title">${collection.name}</span>
                <span class="collection__stats loading"></span>
            </div>
            <div class="collection__progress">
                <div>
                    <div class="collection__circle"></div>
                </div>
            </div>
        </div>
    </div>
    `);
}

function addCollectionEvents(collectionElement, collection) {
    collectionElement.addEventListener('click', () => {
        closeDashboardView();
        renderTasksView(collection);
        sidebarSetActive(collection.index, collection);
    });
}

async function loadCollectionStats(collectionElement, collection) {
    const circle = progressCircle(collectionElement.querySelector('.collection__circle'), collection);
    const closedTasks = await firTaskCountFilter(collection, 'isOpen', '==', false);
    const allTasks = await firTaskCount(collection);
    const percentComplete = closedTasks / allTasks;

    circle.animate(percentComplete, {
        duration: 1000 * percentComplete,
    });

    const stats = collectionElement.querySelector('.collection__stats');
    if (allTasks === 0) {
        stats.innerText = 'No tasks yet';
    } else if (allTasks > 0 && percentComplete !== 1) {
        stats.innerText = `${closedTasks}/${allTasks} done`;
    } else {
        stats.innerText = `All done!`;
    }
    stats.classList.remove('loading');
}

function progressCircle(container, collection) {

    let circle = new ProgressBar.Circle(container, {
        strokeWidth: 12,
        easing: 'easeInOut',
        color: collection.color,
        trailColor: '#33333E',
        trailWidth: 12,
        svgStyle: null
    });

    return circle;
}

async function newCollection(name, color, icon) {
    const collection = Collection(name, color, icon);
    const collectionElement = createCollectionElement(collection);
    try {
        collectionsContainer.insertBefore(collectionElement, document.querySelector('#newCollection'));
        addCollectionEvents(collectionElement, collection);
        loadCollectionStats(collectionElement, collection);
    } finally {
        createSidebarItemElement(collection);
        collection.index = await firCollectionCount();
        await firPushCollection(collection);
    }
}

async function editCollection(collection) {
    loadingOverlay.classList.add('visible');
    await firUpdateCollection(collection);
    closeTasksView();
    clearSidebar();
    const collections = await firCollectionsSnapshot();
    renderTasksView(collection);
    updateSidebar(collections);
    sidebarSetActive(collection.index, collection);
    loadingOverlay.classList.remove('visible');
}

async function deleteCollection(collection) {
    loadingOverlay.classList.add('visible');
    removeSidebarItem(collection.index);
    await firRemoveCollection(collection);
    await updateCollectionIndexes();
    closeTasksView();
    await renderDashboardView();
    loadingOverlay.classList.remove('visible');
}

async function updateCollectionIndexes() {
    const sidebarList = document.querySelector('.sidebar__list');
    const collectionsIdList = Array.from(sidebarList.children).map(collection => collection.id);
    await updateCollectionById(collectionsIdList);
}

async function updateCollectionById(collectionsIdList) {
    for (let id of collectionsIdList) {
        await firUpdateCollection({ id, index: collectionsIdList.indexOf(id) });
    }
}