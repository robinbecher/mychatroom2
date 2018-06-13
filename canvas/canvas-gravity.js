let canvasGravity;
let grc;
const grcircleRadius = 15;
let grmouseX = 0;
let grmouseY = 0;
let gravity = 1;
let stopGravityCanvas=true;

window.onload = function () {



}

function eventListenerClick() {

}


function destroyGravityCanvas() {
    stopGravityCanvas=true;
}

function startGravityCanvas(){
    stopGravityCanvas=false;

    canvasGravity = document.getElementById('canvas-gravity');
    grc = canvasGravity.getContext('2d');

    canvasGravity.width = window.innerWidth;
    canvasGravity.height = window.innerHeight;

    document.addEventListener('mousemove', grthrottle(grhandleMousemove, 10));

    window.addEventListener('resize', function () {
        canvasGravity.width = window.innerWidth;
        canvasGravity.height = window.innerHeight;
    });
    window.addEventListener('click', function(){
        let circle = new grCircle(grmouseX, grmouseY, 0, 0, grcircleRadius);
        grcircles.push(circle);
    }, false);

    grinit();
    granimate();
}

function grinit() {
    // for (let i = 0; i<100;i++){
    //     let rx = randomIntFromInterval(grcircleRadius,window.innerWidth);
    //     let ry = randomIntFromInterval(grcircleRadius, window.innerHeight);
    //
    //     let circle = new grCircle(rx,ry,0,0,grcircleRadius);
    //     grcircles.push(circle);
    // }
}

//helper functions
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function grCircle(x, y, dx, dy, circleRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    let centerX = x + circleRadius;
    let centerY = y - circleRadius;
    let ax = 0;
    let ay = gravity;
    this.friction=Math.random()* (0.9-0.7)+0.7;

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = 'rgb(' + r + ',' + b + ',' + g + ')';

    this.grdraw = function () {
        grc.beginPath();
        grc.arc(x, y, circleRadius * 2, 0, Math.PI * 2, false);
        grc.strokeStyle = 'black';
        grc.fillStyle = color;
        grc.fill();
        grc.stroke();
    };

    this.grupdate = function () {


        dx += ax;
        dy += ay;
        x += dx;
        y += dy;


        //horizontal bounds
        if (x > window.innerWidth - circleRadius * 2.5) {
            x = window.innerWidth - circleRadius * 2.5;
        }
        if (x < circleRadius * 2.5) {
            x = circleRadius * 2.5;
        }
        //vertical bounds
        if (y < circleRadius * 2.5) {
            y = circleRadius * 2.5;
            dy *= -1;
            dy *= this.friction;
        }
        if (y > window.innerHeight - circleRadius * 2.5) {
            y = window.innerHeight - circleRadius * 2.5;
            dy *= -1;
            dy *= this.friction;
        }
    }
};

let grhandleMousemove = (event) => {
    grmouseX = event.x;
    grmouseY = event.y;
};

let grthrottle = (func, delay) => {
    let prev = Date.now() - delay;
    return (...args) => {
        let current = Date.now();
        if (current - prev >= delay) {
            prev = current;
            func.apply(null, args);
        }
    }
};

let grcircles = [];

function granimate() {

    if (stopGravityCanvas){
        return;
    }
    requestAnimationFrame(granimate);
    grc.clearRect(0, 0, window.innerWidth, window.innerHeight);
    grc.fillStyle = '#c9d0db';
    grc.fillRect(0, 0, canvasGravity.width, canvasGravity.height);

    if (grcircles === []) {
        // return;
    }

    for (let i = 0; i < grcircles.length; i++) {
        grcircles[i].grupdate();
        grcircles[i].grdraw();
    }


};
