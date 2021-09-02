const dashboardNav = document.querySelector('#dashboard');
const menuNav = document.querySelector('#menu');

addNavbarEvents();

function addNavbarEvents() {
    menuNav.addEventListener('click', () => {
        app.classList.toggle('fullWidth');
        sidebar.classList.toggle('closed');
    });

    dashboardNav.addEventListener('click', () => {
        if (!dashboardNav.classList.contains('active')) {
            closeTasksView();
            sidebarResetActive();
            renderDashboardView();
        }
    });

    const avatar = document.querySelector('.navbar__avatar');
    const dropdownMenu = document.querySelector('.navbar__dropdown-content');
    avatar.addEventListener('click', e => {
        const isActive = dropdownMenu.classList.contains('active');
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        if (isActive) {
            dropdownMenu.classList.remove('active');
        } else {
            dropdownMenu.classList.add('active');
        }
        e.stopPropagation();
    });

    const navbarSignOut = document.querySelector('.navbar__sign-out');
    navbarSignOut.addEventListener('click', () => {
        signOut();
    });
}

