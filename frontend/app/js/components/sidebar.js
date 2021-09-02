
const sidebar = document.querySelector('.sidebar');
const addCollectionSidebar = document.querySelector('.sidebar__add');

addCollectionSidebar.addEventListener('click', () => {
    showNewCollection();
});

// Changes sidebar active item
function sidebarListActive(element, collection) {
    sidebarResetActive();
    element.classList.add('active');
    element.style.borderLeft = `6px solid ${collection.color}`;
};

function sidebarResetActive() {
    const sidebarListItems = document.querySelectorAll('.sidebar__item');
    sidebarListItems.forEach(link => {
        link.classList.remove('active');
        link.style.border = 'none';
    });
}

function sidebarSetActive(index, collection) {
    const sidebarListItems = document.querySelectorAll('.sidebar__item');
    const element = sidebarListItems[index];
    sidebarListActive(element, collection);
}

function createSidebarItemElement(collection) {
    const element = htmlToElement(`
    <div class="sidebar__item flexCenter" id="${collection.id}">
        <div class="sidebar__item-wrapper flexCenter">
            <div class="sidebar__icon-container flexCenter" style="background-color:${collection.color}">
                <i class="material-icons md-20">${collection.icon}</i>
            </div>
            <span class="sidebar__label">${collection.name}</span>
        </div>
    </div>
    `);
    document.querySelector('.sidebar__list').appendChild(element);
    element.addEventListener('click', () => {
        try {
            closeTasksView();
        } catch (e) {
            closeDashboardView();
        } finally {
            renderTasksView(collection);
        }
        sidebarListActive(element, collection);
    });
}

function removeSidebarItem(index) {
    sidebarResetActive();
    document.querySelector('.sidebar__list').children[index].remove();
}

async function loadSideBar() {
    const collectionsList = await firCollectionsSnapshot();
    updateSidebar(collectionsList);
}

function updateSidebar(collections) {
    collections.sort((a, b) => a.index - b.index);
    collections.forEach(collection => createSidebarItemElement(collection));
}

function clearSidebar() {
    document.querySelector('.sidebar__list').innerHTML = '';
}

