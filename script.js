import { setupBackground, updateBackground } from './background.js'

const screen_width = 100    //world width ratio
const screen_height = 30    //world height ratio

//scaling game screen so it doesn't scale wierdly 
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

//movement update loop based on screen refresh rates; makes it consistent in case of lag

let timeLapse //empty variable

function update(time) {
    //timer doesn't start till game starts
    if (timeLapse == null) {
        timeLapse = time 
        window.requestAnimationFrame(update)
        return
    }
    const timeFrame = time - timeLapse
    // console.log(timeFrame)
    updateBackground(timeFrame)
    
    timeLapse = time 
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

//
setupBackground()