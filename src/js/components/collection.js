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
    <div class="contentDashboard__collectionItem">
        <div class="collectionItem__header">
            <div class="contentDashboard__iconContainer flexCenter" style="background-color:${collection.color}">
                <i class="material-icons">${collection.icon}</i>
            </div>
        </div>
        <div class="contentDashboard__collectionInfo">
            <div class="collectionInfo__left">
                <span class="collectionTitle">${collection.name}</span>
                <span class="collectionStats">4/8 done</span>
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

function addCollectionEvents(collectionElement) {
    progressCircle(collectionElement.querySelector('.progressCircle'));
}

function progressCircle(container) {
    var bar = new ProgressBar.Circle(container, {
        strokeWidth: 12,
        easing: 'easeInOut',
        duration: 1400,
        color: '#ae67e7',
        trailColor: '#33333E',
        trailWidth: 12,
        svgStyle: null
    });

    // bar.animate(1.0);  // Number from 0.0 to 1.0
}

async function newCollection(name, color, icon) {
    const collection = Collection(name, color, icon);
    const collectionElement = createCollectionElement(collection);
    collectionsList.insertBefore(collectionElement, document.querySelector('#newCollection'));
    addCollectionEvents(collectionElement);
    createSidebarItemElement(collection);
    collection.index = await firCollectionCount();
    await firPushCollection(collection);
}