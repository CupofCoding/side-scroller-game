import { setupBackground, updateBackground } from './background.js'
// import { setupChar, updateChar } from './character.js'
// import { setupEnemy, updateEnemy, setupObstacle, updateObstacle } from './obstacles.js'

const screen_width = 100    //world width ratio
const screen_height = 30    //world height ratio

//scaling game screen so it doesn't scale wierdly 
const gameContainer = document.querySelector('[data-game-container]')
const scoreElement = document.querySelector('[data-score]')
const startElement = document.querySelector('[data-start]')
const startBackground = document.querySelector('[data-background-start]')


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

function update(time) {
    //timer doesn't start till game starts
    if (timeLapse == null) {
        timeLapse = 0
        timeLapse = time 
        window.requestAnimationFrame(update)    //time counter
        return
    }
    const timeFrame = time - timeLapse
    console.log(timeFrame)
    updateBackground(timeFrame)
    updateScore(timeFrame)
    // updateChar(timeFrame)
    // updateEnemy(timeFrame)
    // updateObstacle(timeFrame)
    
    timeLapse = time 
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

//start key or zombie/obstacle spawner
document.addEventListener("keydown", startSpawn, { once: true })    //has to be keydown, not keypress; function, then only run at start/once 

//scoring function
function updateScore(timeFrame){
    score += timeFrame * 0.0025    //Time Elapsed added to score
    scoreElement.textContent = Math.floor(score)    //rounds the score so there's no decimals
}

function startSpawn() {
    timeLapse = null    //if time is null then ground shouldn't move........why does the ground keep looping.... 
    score = 0   //set score to 0 when starting.... need to fix NaN display     
    setupBackground()   //call function that loops background based on CSS
    // setupChar()
    // setupEnemy()
    // setupObstacle()
    scoreElement.classList.remove("hidden")
    startElement.classList.add("hidden")
    startBackground.classList.add("hidden")
    window.requestAnimationFrame(update)
}

//Need game over conditions

//Need Highest Score 

//Retire 