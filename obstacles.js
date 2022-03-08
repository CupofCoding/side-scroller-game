import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./CustomPropertyUpdate.js"

const runSpeed = .025    //always same as ground speed to not look like it's sliding

//obstacle spawn range
const crate_interval_min = 500
const crate_interval_max = 2000
const gameContainer = document.querySelector('[data-game-container]')   //crate needs to be added so they can be seen

let nextCrateTime

export function setupCrate() {
    nextCrateTime = crate_interval_min  //min time to spawn box
    //make sure to remove obstacles prior to restart for fresh crates
    document.querySelectorAll("data-crate").forEach(crate => {
        crate.remove()
    })
} 

export function updateCrate(timeFrame, fasterRun) {
    document.querySelectorAll("[data-crate]").forEach(crate => {
        incrementCustomProperty(crate, "--left", timeFrame * fasterRun * runSpeed * -1)
        //if cactus of off screen then remove it
        if (getCustomProperty(crate,"--left") <= -100) {
            crate.remove()
        }
    })

    if (nextCrateTime <= 0) {   //spawn box
        createCrate()
        nextCrateTime = randomNumberBetween(crate_interval_min, crate_interval_max) / fasterRun
    }
    nextCrateTime -= timeFrame  //decreases counter so we can spawn a box
} 

//Gets rectangle of crate for obstacle interaction
export function getCrateRects() {
    return [...document.querySelectorAll("[data-crate]")].map(crate => {
            return crate.getBoundingClientRect()         
    })
}

function createCrate() {
    const crate = document.createElement("img")
    crate.dataset.crate = true
    crate.src = "./assets/obstacles/crates_1.png"
    crate.classList.add("crate")
    setCustomProperty(crate, "--left", 100)
    gameContainer.append(crate)
}

function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)   //get random number between 0-1; multiply the difference between max and min + 1 so it can't ever be 0. 
}