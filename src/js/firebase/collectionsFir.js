const collections = db.collection('collections');

async function firPushCollection(collection) {
    try {
        await collections.doc(collection.id).set(collection);
        console.log('Collection added to db');
    }
    catch (err) {
        console.log('Could not save to db', err);
    }
}

async function firCollectionCount() {
    try {
        const snapshot = await collections.get();
        return snapshot.docs.length;
    } catch (err) {
        console.log('Could not count tasks', err);
    }
}

async function firGetSnapshot() {
    let allCollections = [];
    const snapshot = await collections.get();
    snapshot.forEach(doc => {
        allCollections.push(doc.data());
    });
    return allCollections;
}