// Collapses sidebar
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const app = document.querySelector('.app');
menu.addEventListener('click', () => {
    app.classList.toggle('fullWidth');
    sidebar.classList.toggle('closed');
});
// Changes sidebar active item
const sidebarListItems = document.querySelectorAll('.sidebar__listItem');
function listActive() {
    sidebarListItems.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
};

// Changes sidebar active item on click
sidebarListItems.forEach(link => link.addEventListener('click', listActive));