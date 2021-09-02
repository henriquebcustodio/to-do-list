async function createUserWithEmailAndPassword(email, password) {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
}

async function loginWithEmailAndPassword(email, password) {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function signOut() {
    firebase.auth().signOut();
}

function monitorAuth(loginCallback, logoutCallback) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            loginCallback();
        } else {
            logoutCallback();
        }
    });
}

