import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")

let lastTime;

function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        if(isLoose()) handleLoose()
    }

    lastTime = time;
    window.requestAnimationFrame(update)
}

function isLoose() {
    const ballRect = ball.rect()
    return ballRect.right >= window.innerWidth || ballRect.left <=0
}

function handleLoose() {
    const ballRect = ball.rect()
    if(ballRect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    } else {
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }


    ball.reset()
    computerPaddle.reset()
    playerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})
window.requestAnimationFrame(update)