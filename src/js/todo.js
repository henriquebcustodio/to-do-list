const loadingOverlay = document.querySelector('#loading');
async function loadSideBar() {
    const collectionsList = await firCollectionsSnapshot();
    updateSidebar(collectionsList);
}

loadSideBar();
renderDashboardView();