monitorAuth(
    () => {
        currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        collectionsDB = db.collection('collections');
        renderApp();
    },
    () => {
        window.location = '/';
    })