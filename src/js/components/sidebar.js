// Collapses sidebar
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const app = document.querySelector('.app');
menu.addEventListener('click', () => {
    app.classList.toggle('fullWidth');
    sidebar.classList.toggle('closed');
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
    <a class="sidebar__listItem flexCenter ${collection.id}" href="#">
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

function updateSidebar(collections) {
    collections.forEach(collection => createSidebarItemElement(collection));
}