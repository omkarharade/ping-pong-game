const paddle = document.getElementById("paddle");
const ball  = document.getElementById("ball");
const table = document.getElementById("ping-pong-table");

let ball_left = ball.offsetLeft;
let ball_top = ball.offsetTop;
let paddle_top = paddle.offsetTop;
let paddle_left = paddle.offsetLeft;
let table_top = table.offsetTop;
let table_left = table.offsetLeft;


const tableHeight = table.offsetHeight;
const tableWidth = table.offsetWidth;

const paddleHeight = paddle.offsetHeight;
const paddleWidth = paddle.offsetWidth;

const ballHeight = ball.offsetHeight;
const ballWidth = ball.offsetWidth;

let dx = 5;   // pixel displacement per motion 
let dy = 5;   // pixel displacement per motion 




const scoreCount = document.getElementById("score-count");
let score = 0;

// Create an audio object
const audio = new Audio('media/ping-pong-hit.mp3');


function increaseScore(){

            audio.play()  // play the paddle and ball contact audio
            score++;
            scoreCount.innerText = `Score : ${score}`
            scoreCount.style.backgroundColor = 'blue'


            setTimeout(function (){
                scoreCount.style.backgroundColor = 'green'
            }, 2000)
}

document.addEventListener("DOMContentLoaded", () => {

    setInterval(function (){

        ball_left += dx;
        ball_top += dy;

        ball.style.top = `${ball_top}px`
        ball.style.left = `${ball_left}px`


        // checking collision of paddle and ball here 

        if((( paddle_left + paddleWidth > ball_left)) && 
            ((paddle_top < ball_top) && (paddle_top + paddleHeight > ball_top + ballHeight)) &&
            (dx < 0)   
        ){

            // change direction for the ball coming in -ve x direction 
            dx = -1 * dx;
            
            increaseScore();

            return;
        }


        // changing directions on hitting the table end surfaces 

        if( ball_left <= 0 || ball_left + ballWidth + dx > tableWidth) dx = -1 * dx;
        if( ball_top <= 0 || ball_top + ballHeight + dy > tableHeight) dy = -1 * dy;

    }, 50)


    document.addEventListener("keydown", function (event){
        event.preventDefault();
        
        const paddle_dy = 10; // pixel shift on one paddle movement

        if(event.key === "ArrowUp"){

            // check : paddle should not go outside the table at top
            if(paddle_top - paddle_dy < 0) return;

            // move the paddle up
            paddle_top -= paddle_dy;


        }
        else if(event.key === "ArrowDown"){

            // check : paddle should not go outside the table at bottom
            if(paddle_top + paddle_dy + paddleHeight > tableHeight) return;

            // move the paddle down
            paddle_top += paddle_dy;
        }

        paddle.style.top = `${paddle_top}px`
    });



    // by mouse movements 

    document.addEventListener("mousemove", function(event){

        // if the mouse points outside the left half of the table, then return 
        if(event.clientX > table_left + (tableWidth / 2)) return;

        // clientY gives position of mouse pointer from the top
        let mouseDistTop = event.clientY;
        let tableDistTop = table_top;

        // this sets mouse pointer to the middle of the paddle virtually
        let mousePointControl = mouseDistTop - tableDistTop - paddleHeight/2;

        paddle_top = mousePointControl;

        // as the mouse pointed at center of  paddle, its range of motion 
        // in Y axis is from  0 to (tableHeight - paddleHeight) for mouse pointer
        if(paddle_top <= 0 || (paddle_top + paddleHeight) > tableHeight) return;


        paddle.style.top = `${paddle_top}px`
    })
});
