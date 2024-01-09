window.addEventListener("DOMContentLoaded", function () {
    function toggleMenu() {
        console.log('Toggle menu function called');
        var menu = document.querySelector('.menu');
        
        if (menu) {
            var currentDisplay = window.getComputedStyle(menu).getPropertyValue('display');
            menu.style.display = (currentDisplay === 'none') ? 'block' : 'none';
        } else {
            console.log('Menu element not found');
        }
    }

    var svgContainer = document.getElementById('svg1');
    
    if (svgContainer) {
        svgContainer.addEventListener('click', toggleMenu);
    } else {
        console.log('SVG container not found');
    }

    // Trigger a click on the div with ID "botaoMenu"
    var botaoMenu = document.getElementById('botaoMenu');
    
    if (botaoMenu) {
        botaoMenu.addEventListener('click', toggleMenu); // Optional: This line adds the click event directly to the div
        // Uncomment the line below to trigger a click programmatically
        // botaoMenu.click();
    } else {
        console.log('Div with ID "botaoMenu" not found');
    }
});
