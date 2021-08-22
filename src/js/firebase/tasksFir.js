async function firPushTask(task, collection) {
    try {
        await collectionsDB.doc(collection.id).collection('tasks').doc(task.id).set(task);
        console.log('Task added to db');
    }
    catch (err) {
        console.log('Could not save to db', err);
    }
}


async function firUpdateTask(task, collection) {
    try {
        await collectionsDB.doc(collection.id).collection('tasks').doc(task.id).update(task);
        console.log('Task updated successfully');
    } catch (err) {
        console.log('Could not update task', err);
    }

}

async function firRemoveTask(task, collection) {
    try {
        await collectionsDB.doc(collection.id).collection('tasks').doc(task.id).delete();
        console.log('Task removed successfully');
    } catch (err) {
        console.log('Could not remove task', err);
    }
}

async function firTaskCount(collection, field, operator, value) {
    try {
        const snapshot = await collectionsDB.doc(collection.id).collection('tasks').where(field, operator, value).get();
        return snapshot.docs.length;
    } catch (err) {
        console.log('Could not count tasks', err);
    }
}

function firTasksSnapshot(collection) {
    return collectionsDB.doc(collection.id).collection('tasks').get();
}