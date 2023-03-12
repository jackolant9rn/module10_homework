const buttonNode = document.querySelector(".button");

buttonNode.addEventListener("click", () => {
    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;
    let availableScreenWidth = window.screen.availWidth;
    let availableScreenHeight = window.screen.availHeight;
    
    alert (`Ширина экрана - ${screenWidth} пикселей, высота экрана - ${screenHeight} пикселей.\n
            Доступный рамер экрана - ${availableScreenWidth} х ${availableScreenHeight} пикселей`);
})