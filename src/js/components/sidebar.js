
const sidebar = document.querySelector('.sidebar');
const app = document.querySelector('.app');
const addCollectionSidebar = document.querySelector('.sidebar__add');

addCollectionSidebar.addEventListener('click', () => {
    showNewCollection();
});

// Changes sidebar active item
function sidebarListActive(element, collection) {
    sidebarResetActive();
    element.classList.add('active');
    element.style.borderLeft = `4px solid ${collection.color}`;
};

function sidebarResetActive() {
    const sidebarListItems = document.querySelectorAll('.sidebar__listItem');
    sidebarListItems.forEach(link => {
        link.classList.remove('active');
        link.style.border = 'none';
    });
}

function sidebarSetActive(index, collection) {
    const sidebarListItems = document.querySelectorAll('.sidebar__listItem');
    const element = sidebarListItems[index];
    sidebarListActive(element, collection);
}

function createSidebarItemElement(collection) {
    const element = htmlToElement(`
    <a class="sidebar__listItem flexCenter" id="${collection.id}" href="#">
        <div class="sidebar__itemWrapper flexCenter">
            <div class="sidebar__iconContainer flexCenter" style="background-color:${collection.color}">
                <i class="material-icons md-20">${collection.icon}</i>
            </div>
            <span class="sidebar__label">${collection.name}</span>
        </div>
    </a>
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

function clearSidebar() {
    document.querySelector('.sidebar__list').innerHTML = '';
}

function updateSidebar(collections) {
    collections.sort((a, b) => a.index - b.index);
    collections.forEach(collection => createSidebarItemElement(collection));
}