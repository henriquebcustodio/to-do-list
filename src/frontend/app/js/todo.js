const loadingOverlay = document.querySelector('#loading');
const app = document.querySelector('.app');

app.addEventListener('click', () => {
    document.querySelector('.dropdown').classList.remove('active');
});

loadSideBar();
renderDashboardView();