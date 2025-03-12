const paddle = document.getElementById("paddle");
const ball  = document.getElementById("ball");
const table = document.getElementById("ping-pong-table");

let ball_X = ball.offsetLeft;
let ball_Y = ball.offsetTop;
let paddle_Y = paddle.offsetTop;



const tableHeight = table.offsetHeight;
const tableWidth = table.offsetWidth;

const paddleHeight = paddle.offsetHeight;

const ballHeight = ball.offsetHeight;
const ballWidth = ball.offsetWidth;

let dx = 5;   // pixel displacement per motion 
let dy = 5;   // pixel displacement per motion 




document.addEventListener("DOMContentLoaded", (event) => {

    setInterval(function (){

        if( ball_X <= 0 || ball_X + ballWidth + dx > tableWidth) dx = -1 * dx;
        if( ball_Y <= 0 || ball_Y + ballHeight + dy > tableHeight) dy = -1 * dy;

        ball_X += dx;
        ball_Y += dy;

        ball.style.top = `${ball_Y}px`
        ball.style.left = `${ball_X}px`

    }, 40)


    document.addEventListener("keydown", function (event){

        const paddle_dy = 10;


        if(event.key === "ArrowUp"){

            // check : paddle should not go outside the table at top
            if(paddle_Y - paddle_dy < 0) return;

            // move the paddle up
            paddle_Y -= paddle_dy;
            paddle.style.top = `${paddle_Y}px`


        }
        else if(event.key === "ArrowDown"){

            // check : paddle should not go outside the table at bottom
            if(paddle_Y + paddle_dy + paddleHeight > tableHeight) return;

            paddle_Y += paddle_dy;
            paddle.style.top = `${paddle_Y}px`
        }
    })
});
