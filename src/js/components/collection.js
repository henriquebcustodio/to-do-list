function Collection(name, color, icon) {
    return {
        id: ID(),
        name,
        color,
        icon
    };
}

function createCollectionElement(collection) {
    return htmlToElement(`
    <div class="contentDashboard__collectionItem ${collection.id}">
        <div class="collectionItem__header">
            <div class="contentDashboard__iconContainer flexCenter" style="background-color:${collection.color}">
                <i class="material-icons">${collection.icon}</i>
            </div>
        </div>
        <div class="contentDashboard__collectionInfo">
            <div class="collectionInfo__left">
                <span class="collectionTitle">${collection.name}</span>
                <span class="collectionStats loading"></span>
            </div>
            <div class="collectionProgress">
                <div>
                    <div class="progressCircle"></div>
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
    const circle = progressCircle(collectionElement.querySelector('.progressCircle'), collection);
    const closedTasks = await firTaskCountFilter(collection, 'isOpen', '==', false);
    const allTasks = await firTaskCount(collection);
    const percentComplete = closedTasks / allTasks;

    circle.animate(percentComplete, {
        duration: 1000 * percentComplete,
    });

    const stats = collectionElement.querySelector('.collectionStats');
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
    } finally {
        createSidebarItemElement(collection);
        collection.index = await firCollectionCount();
        await firPushCollection(collection);
    }
}