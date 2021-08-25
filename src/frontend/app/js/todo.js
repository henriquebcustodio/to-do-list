const loadingOverlay = document.querySelector('#loading');
const app = document.querySelector('.app');

app.addEventListener('click', () => {
    document.querySelectorAll('.dropDown').forEach(dropDown => {
        dropDown.classList.remove('active');
    });

});

loadSideBar();
renderDashboardView();