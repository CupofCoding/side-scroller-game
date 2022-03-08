import { getCustomProperty, setCustomProperty, incrementCustomProperty } from "./CustomPropertyUpdate.js"
import { fasterRun } from "./script.js"

//ground updates by persistently panning to the left
const runSpeed = .05
const backgroundElements = document.querySelectorAll("[data-background]")
// const cloudElements = document.querySelectorAll("[data-clouds]")
// const grassElements = document.querySelectorAll("[data-grass]")
// const shrubsElements = document.querySelectorAll("[data-shrubs]")

//ground needs to loop
export function setupBackground() {
    setCustomProperty(backgroundElements[0], "--left", 0)
    setCustomProperty(backgroundElements[1], "--left", 300)     //width is set to 300% in CSS    
}

export function updateBackground(timeFrame) {
    //taking CSS variable and converting to JS then send back to CSS variable
    backgroundElements.forEach(background => {  //function to move the gound left everytime time is updated
        incrementCustomProperty(background, "--left", timeFrame * fasterRun * runSpeed * -1)   //-1 required so it goes left

        //if first image ends, then loop second image
        if (getCustomProperty(background, "--left") <= -300) {   //-300 for the starting location
            incrementCustomProperty(background, "--left", 600)  //this will be starting at the end of the other element
        }
    })
}