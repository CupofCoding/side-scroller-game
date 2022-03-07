import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./CustomPropertyUpdate.js"

const charElement = document.querySelector("[data-character]")
const char_sprite_frame = 8 //number of sprites 
const char_frame_time = 100 //milliseconds

//jump logic; velocity - char needs to go up at a rate but slow down at the arch as time passes. Gravity = rate of decline. If it hits 0 then character "falls"
const jump_speed = .45  //affects jump distance
const gravity = .01     //rate of deceleration 
// const swing = .45
// const ammo
// const health

let char_sprite     
let charYAxis   //related character jumping function jumpAction
let isJumping
let isShooting
let isSwinging
let currentFrameTime

export function setupChar() {
    isJumping = false
    isShooting = false
    isSwinging = false
    char_sprite = 0
    currentFrameTime = 0
    charYAxis = 0
    setCustomProperty(charElement, "--bottom", 0)   //resets char locationn 
    document.removeEventListener("keydown", onJump) //added to fix issue with resetting
    document.addEventListener("keydown", onJump)
}

export function updateChar(timeFrame, runSpeed) {
    runAction(timeFrame, runSpeed)
    jumpAction()
}

function runAction(timeFrame, runSpeed) {
    if (isJumping) {
        charElement.src = `./assets/char_model/jump/char_jump_00.png` //sprite changed appropriately 
        return
    }

    if (currentFrameTime >= char_frame_time) {
        //this is broken....might have to rethink this one
        char_sprite = (char_sprite + 1) % char_sprite_frame     //takes current frame and adds 1 and the modulus iterates through the sprite count and loops it back
        charElement.src = `./assets/char_model/move/char_walk_${char_sprite}.png`    //source & iteration
        currentFrameTime -= char_frame_time //resets and goes back towards 0
    }
    currentFrameTime += timeFrame * runSpeed
}

function jumpAction(timeFrame) {
    if (!isJumping) return  //if not jumping, ignore rest

    //char bottom position needs to reset
    incrementCustomProperty(charElement, "--bottom", charYAxis * timeFrame)
    
    //CHAR NEEDS TO STOP WHEN HE TOUCHES THE "FLOOR"
    if (getCustomProperty(charElement, "--bottom") <= 0) {
        setCustomProperty(charElement, "--bottom", 0) 
        isJumping = false
    }

    charYAxis -= gravity * timeFrame
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return     //NO DOUBLE JUMPING; 

    charYAxis = jump_speed
    isJumping = true
}