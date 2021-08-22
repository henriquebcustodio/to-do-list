const taskCollection = 'tasks';

let sendSnapshots = true;

async function firPushTask(task) {
    try {
        task.index = 1;
        await item.doc(task.id).set(task);
        console.log('Task added to db');
    }
    catch (err) {
        console.log('Could not save to db', err);
    }
}

async function firUpdateTask(task) {
    try {
        await db.collection(taskCollection).doc(task.id).update(task);
        console.log('Task updated successfully');
    } catch (err) {
        console.log('Could not update task', err);
    }

}

async function firRemoveTask(task) {
    try {
        await db.collection(taskCollection).doc(task.id).delete();
        console.log('Task removed successfully');
    } catch (err) {
        console.log('Could not remove task', err);
    }
}

async function firTaskCount(field, operator, value) {
    try {
        const snapshot = await db.collection(taskCollection).where(field, operator, value).get();
        return snapshot.docs.length;
    } catch (err) {
        console.log('Could not count tasks', err);
    }
}

// function firGetSnapshot() {
//     return db.collection(taskCollection).get();
// }