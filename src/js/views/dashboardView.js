function createDashboardView() {
    return htmlToElement(`
    <div class="contentDashboard">
        <div class="contentDashboard__header">
            <span class="header__title">Collections</span>
        </div>
        <div class="contentDashboard__collections">
            <div class="contentDashboard__collectionItem flexCenter" id="newCollection">
                <i class="material-icons flexCenter">add</i>
            </div>
        </div>
    </div>
    `);
}

async function renderDashboardView() {
    document.querySelector('.content__main').appendChild(createDashboardView());

    const newCollectionButton = document.querySelector('#newCollection');
    newCollectionButton.addEventListener('click', showNewCollection);

    collectionsList = document.querySelector('.contentDashboard__collections');

    await updateDashboard();
}

async function updateDashboard() {
    const collections = await firGetSnapshot();
    updateDashboardItems(collections);
    updateSidebar(collections);
}

function updateDashboardItems(collections) {
    collections.sort((a, b) => a.index - b.index);
    collections.forEach(collection => {
        const collectionElement = createCollectionElement(collection);
        addCollectionEvents(collectionElement);
        collectionsList.insertBefore(collectionElement, document.querySelector('#newCollection'));
    });
}