const paddle = document.getElementById("paddle");
const ball  = document.getElementById("ball");
const table = document.getElementById("ping-pong-table");

let ball_X = ball.offsetLeft;
let ball_Y = ball.offsetTop;
let paddle_Y = paddle.offsetTop;
let paddle_X = paddle.offsetLeft;



const tableHeight = table.offsetHeight;
const tableWidth = table.offsetWidth;

const paddleHeight = paddle.offsetHeight;
const paddleWidth = paddle.offsetWidth;

const ballHeight = ball.offsetHeight;
const ballWidth = ball.offsetWidth;

let dx = 5;   // pixel displacement per motion 
let dy = 5;   // pixel displacement per motion 




document.addEventListener("DOMContentLoaded", () => {

    setInterval(function (){

        ball_X += dx;
        ball_Y += dy;

        ball.style.top = `${ball_Y}px`
        ball.style.left = `${ball_X}px`


        // checking collision of paddle and ball here 

        if(( paddle_X + paddleWidth > ball_X ) && 
            ((paddle_Y <= ball_Y) && (paddle_Y + paddleHeight >= ball_Y + ballHeight))){
            dx = -1 * dx;
        }


        // changing directions on hitting the table end surfaces 

        if( ball_X <= 0 || ball_X + ballWidth + dx > tableWidth) dx = -1 * dx;
        if( ball_Y <= 0 || ball_Y + ballHeight + dy > tableHeight) dy = -1 * dy;

    }, 100)


    document.addEventListener("keydown", function (event){
        event.preventDefault();
        
        const paddle_dy = 10; // pixel shift on one paddle movement

        if(event.key === "ArrowUp"){

            // check : paddle should not go outside the table at top
            if(paddle_Y - paddle_dy < 0) return;

            // move the paddle up
            paddle_Y -= paddle_dy;


        }
        else if(event.key === "ArrowDown"){

            // check : paddle should not go outside the table at bottom
            if(paddle_Y + paddle_dy + paddleHeight > tableHeight) return;

            // move the paddle down
            paddle_Y += paddle_dy;
        }

        paddle.style.top = `${paddle_Y}px`
    });
});
