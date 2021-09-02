const loadingOverlay = document.querySelector('#loading');
const app = document.querySelector('.app');

loadingOverlay.classList.add('visible');

app.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });

});

function renderApp() {
    loadSideBar();
    renderDashboardView();
    loadingOverlay.classList.remove('visible');
}