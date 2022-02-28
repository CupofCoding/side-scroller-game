const screen_width = 100    //world width ratio
const screen_height = 30    //world height ratio

//scaling game screen 
const gameContainer = document.querySelector('[data-game-container]')

setGameScreen()
window.addEventListener("resize", setGameScreen)

function setGameScreen() {
    let gameToScreenScale
    if (window.innerWidth / window.innerHeight < screen_width / screen_height) //if windows wider than game container
    {
        gameToScreenScale = window.innerWidth /  screen_width   //scale based on width

    } else {
        gameToScreenScale = window.innerHeight / screen_height  //scale based on height
    }

    gameContainer.style.width = `${screen_width * gameToScreenScale}px`
    gameContainer.style.height = `${screen_height * gameToScreenScale}px`
}