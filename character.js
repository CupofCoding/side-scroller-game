const charElement = document.querySelector("data-character")
const char_sprite_frame = 8 //number of sprites 
const char_frame_time = 100 //milliseconds
const jump_speed = .45
const gravity = .10
const swing = .45
const ammo
const health

let char_sprite
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
}

export function updateChar(timeFrame, runSpeed) {
    runAction(timeFrame, runSpeed)
    jumpAction()
}

function runAction(timeFrame, runSpeed) {
    if (isJumping) {
        charElement.src = `./assets/char-jump-1.png`
        return
    }

    if (currentFrameTime >= char_frame_time) {
        char_sprite = (char_sprite + 1) % char_sprite_frame     //takes current frame and adds 1 and the modulus iterates through the sprite count and loops it back
        charElement.src = `./assets/char-run-${char_sprite}.png`    //source & iteration
        currentFrameTime -= char_frame_time //resets and goes back towards 0

    }

    currentFrameTime += timeFrame * runSpeed

}

function jumpAction(timeFrame) {
    if (!isJumping) return  //if not jumping, ignore rest

    //char bottom position needs 

}