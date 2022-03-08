import { setupBackground, updateBackground } from './background.js'
import { setupChar, updateChar, getCharRect, setCharLose } from './character.js'
import { setupCrate, updateCrate, getCrateRects } from './obstacles.js'

const screen_width = 100    //world width ratio
const screen_height = 30    //world height ratio

//scaling game screen so it doesn't scale wierdly 
const gameContainer = document.querySelector('[data-game-container]')
const scoreElement = document.querySelector('[data-score]')
const startElement = document.querySelector('[data-start]')
const startBackground = document.querySelector('[data-background-start]')

//difficulty scaling increment
const RUN_SPEED_INCREASE = 0.00001

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
let score
export let fasterRun   //difficulty scaling



//start key or zombie/obstacle spawner
document.addEventListener("keydown", startSpawn, { once: true })    //has to be keydown, not keypress; function, then only run at start/once 

//scoring function
function updateFasterRun(timeFrame) {
    fasterRun += timeFrame * RUN_SPEED_INCREASE
}

function updateScore(timeFrame){
    score += timeFrame * 0.0025    //Time Elapsed added to score
    scoreElement.textContent = Math.floor(score)    //rounds the score so there's no decimals
}

function startSpawn() {
    timeLapse = null    //if time is null then ground shouldn't move........why does the ground keep looping.... 
    fasterRun = 1
    score = 0   //set score to 0 when starting.... need to fix NaN display     
    setupBackground()   //call function that loops background based on CSS
    setupChar()
    // setupEnemy()
    setupCrate()
    scoreElement.classList.remove("hidden")
    startElement.classList.add("hidden")
    startBackground.classList.add("hidden")
    window.requestAnimationFrame(update)
}

//Need game over conditions
function checkGameOver() {    
    const charRect = getCharRect()    //pulls char border
    return getCrateRects().some(rect => isTouched(rect, charRect))       //.some is a method to check if any of this is true then return true for the .some
}

function isTouched(rect1, rect2) {
    //check if left border touched right border and top of obstacle touch bottom of char
    return (
        rect1.left < rect2.right && 
        rect1.top < rect2.bottom && 
        rect1.right > rect2.left && 
        rect1.bottom > rect2.top
    )
}

function gameOver() {
    setCharLose()
    //avoid restarting game as soon as game ends
    setTimeout(() => {
        document.addEventListener("keydown", startSpawn, { once: true })    //game restarts
        startBackground.classList.remove("hidden")

    }, 100)
}

//Need Highest Score 

//Retire 

function update(time) {
    //score timer doesn't start till game starts
    if (timeLapse == null) {
        timeLapse = 0
        timeLapse = time 
        window.requestAnimationFrame(update)    //time counter
        return
    }
    const timeFrame = time - timeLapse  //passage of time
    // console.log(timeFrame)
    updateScore(timeFrame)
    updateFasterRun(timeFrame)
    updateBackground(timeFrame, fasterRun)
    updateChar(timeFrame, fasterRun)
    updateCrate(timeFrame, fasterRun)
    // updateEnemy(timeFrame, fasterRun)

    if (checkGameOver()) return gameOver() //stops time from counting so no more updates occur
    
    timeLapse = time 
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)