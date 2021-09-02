const form = document.querySelector('.sign-in-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    loginWithEmailAndPassword(email, password)
        .catch((err) => {
            alert(err.message);
        });
});

monitorAuth(() => {
    window.location = '/app';
}, () => { });