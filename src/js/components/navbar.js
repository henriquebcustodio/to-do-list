const dashboardNav = document.querySelector('#dashboard');
const menuNav = document.querySelector('#menu');

menuNav.addEventListener('click', () => {
    app.classList.toggle('fullWidth');
    sidebar.classList.toggle('closed');
});

dashboardNav.addEventListener('click', () => {
    console.log('test');
    if (!dashboardNav.classList.contains('active')) {
        closeTasksView();
        sidebarResetActive();
        renderDashboardView();
    }
});