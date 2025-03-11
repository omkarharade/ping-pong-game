const paddle = document.getElementById("paddle");
const ball  = document.getElementById("ball");
const table = document.getElementById("ping-pong-table");

let ball_X = ball.offsetTop;
let ball_Y = ball.offsetHeight;

const tableHeight = table.offsetHeight;
const tableWidth = table.offsetWidth;

let dx = 5;   // pixel displacement per motion 
let dy = 5;   // pixel displacement per motion 


setInterval(function (){

    if( ball_X <= 0 || ball_X > tableWidth) dx = -1 * dx;
    if( ball_Y <= 0 || ball_Y > tableHeight) dy = -1 * dy;

    ball_X += dx;
    ball_Y += dy;

    ball.style.top = `${ball_Y + dy}px`
    ball.style.left = `${ball_X + dx}px`

}, 100)