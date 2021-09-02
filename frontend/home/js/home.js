monitorAuth(() => {
    const toggleList = document.querySelectorAll('.js-toggle-visibility');
    toggleList.forEach(element => element.classList.toggle('hidden'));
});

const signOutHome = document.querySelector('#sign-out');
signOutHome.addEventListener('click', e => {
    signOut();
});