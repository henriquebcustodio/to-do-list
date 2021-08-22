async function loadSideBar() {
    const collectionsList = await firCollectionsSnapshot();
    updateSidebar(collectionsList);
}

loadSideBar();
renderDashboardView();