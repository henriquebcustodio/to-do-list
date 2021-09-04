function createDashboardView() {
    return htmlToElement(`
    <div class="dashboard">
        <div class="dashboard__header">
            <span class="dashboard__title">Collections</span>
        </div>
        <div class="collections">
            <div class="collection collection--new" id="newCollection">
                <i class="collection__icon material-icons">add</i>
            </div>
        </div>
    </div>
    `);
}

async function renderDashboardView() {

    dashboardNav.classList.add('active');
    document.querySelector('.content__main').appendChild(createDashboardView());

    loadDashboardViewEvents();

    collectionsContainer = document.querySelector('.collections');

    await updateDashboard();
}

function loadDashboardViewEvents() {
    const newCollectionButton = document.querySelector('#newCollection');
    newCollectionButton.addEventListener('click', () => {
        showNewCollection();
    });
}

function closeDashboardView() {
    dashboardNav.classList.remove('active');
    document.querySelector('.dashboard').remove();
}

async function updateDashboard() {
    const collectionsList = await firCollectionsSnapshot();
    updateDashboardItems(collectionsList);
}

function updateDashboardItems(collections) {
    collections.sort((a, b) => a.index - b.index);
    collections.forEach(collection => {
        const collectionElement = createCollectionElement(collection);
        collectionsContainer.insertBefore(collectionElement, document.querySelector('#newCollection'));
        addCollectionEvents(collectionElement, collection);
        loadCollectionStats(collectionElement, collection);
    });
}