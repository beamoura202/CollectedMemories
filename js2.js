window.addEventListener("DOMContentLoaded", function () {
    var menu = document.querySelector('.menu');
    if (!menu) {
        console.log('Menu element not found');
        return;
    }

    // Function to show the menu
    function showMenu() {
        console.log('Showing menu');
        menu.style.display = 'block';
    }

    // Function to hide the menu
    function hideMenu() {
        console.log('Hiding menu');
        menu.style.display = 'none';
    }

    var botaoMenu = document.getElementById('botaoMenu');
    if (botaoMenu) {
        botaoMenu.addEventListener('click', showMenu);
    } else {
        console.log('Div with ID "botaoMenu" not found');
    }

    var botaoX = document.querySelector('.botaoX');
    if (botaoX) {
        botaoX.addEventListener('click', hideMenu);
    } else {
        console.log('Div with ID "botaoX" not found');
    }
});