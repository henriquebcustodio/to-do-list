const collectionsDB = db.collection('collections');

async function firPushCollection(collection) {
    try {
        await collectionsDB.doc(collection.id).set(collection);
        console.log('Collection added to db');
    }
    catch (err) {
        console.log('Could not save to db', err);
    }
}

async function firUpdateCollection(collection) {
    try {
        await collectionsDB.doc(collection.id).update(collection);
        console.log('Collection updated successfully');
    } catch (err) {
        console.log('Could not update collection', err);
    }
}

async function firRemoveCollection(collection) {
    try {
        await collectionsDB.doc(collection.id).delete();
        console.log('Collection removed successfully');
    } catch (err) {
        console.log('Could not remove collection', err);
    }
}

async function firCollectionCount() {
    try {
        const snapshot = await collectionsDB.get();
        return snapshot.docs.length;
    } catch (err) {
        console.log('Could not count collections', err);
    }
}

async function firCollectionsSnapshot() {
    let allCollections = [];
    const snapshot = await collectionsDB.get();
    snapshot.forEach(doc => {
        allCollections.push(doc.data());
    });
    return allCollections;
}