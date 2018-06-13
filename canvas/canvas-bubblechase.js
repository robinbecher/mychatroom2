let canvasBubblechase;
let c;
const circleRadius = 15;
const maxDist = 150;
let mouseX = 0;
let mouseY = 0;
let stopBubblechaseCanvas=true;

window.addEventListener('resize', function () {
    canvasBubblechase.width = window.innerWidth;
    canvasBubblechase.height = window.innerHeight;
})

function destroyBubblechaseCanvas(){
    stopBubblechaseCanvas=true;
}

function startBubblechaseCanvas(){
    stopBubblechaseCanvas=false;
    canvasBubblechase = document.getElementById('canvas-bubblechase');
    c = canvasBubblechase.getContext('2d');

    canvasBubblechase.width = window.innerWidth;
    canvasBubblechase.height = window.innerHeight;

    document.addEventListener('mousemove', throttle(handleMousemove, 10));
    canvasBubblechase.addEventListener('click', function () {
        let circle = new Circle(mouseX, mouseY, 0, 0, circleRadius);
        circles.push(circle);
    }, false);
    init();

    animate();
}

function init(){
    for (let i = 0; i<100;i++){
        let rx = randomIntFromInterval(circleRadius,window.innerWidth);
        let ry = randomIntFromInterval(circleRadius, window.innerHeight);

        let circle = new Circle(rx,ry,0,0,circleRadius);
        circles.push(circle);
    }
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


function Circle(x, y, dx, dy, circleRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    let centerX = x + circleRadius;
    let centerY = y - circleRadius;
    let ax = 0;
    let ay = 0;

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = 'rgb(' + r + ',' + b + ',' + g + ')';

    this.draw = function () {
        c.beginPath();
        c.arc(x, y, circleRadius*2, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.stroke();
    };

    this.update = function () {
        x += dx;
        y += dy;

        let a = x - mouseX;
        let b = y - mouseY;
        let distance = Math.sqrt(a * a + b * b);

        if (distance === 0) {
            distance = Math.random();
        }

        dx += ax;
        dy += ay;

        ax = a / distance * 0.5;
        ay = b / distance * 0.5;

        if (distance >= maxDist) {
            dx = dy = 0;
        }

        if (x > window.innerWidth - circleRadius*2.5) {
            x = window.innerWidth - circleRadius*2.5;
        }
        if (x < 0 + circleRadius*2.5) {
            x = 0 + circleRadius*2.5;
        }
        if (y < 0 + circleRadius*2.5) {
            y = 0 + circleRadius*2.5;
        }
        if (y > window.innerHeight - circleRadius*2.5) {
            y = window.innerHeight - circleRadius * 2.5;
        }
    }
};

let handleMousemove = (event) => {
    mouseX = event.x;
    mouseY = event.y;
};

let throttle = (func, delay) => {
    let prev = Date.now() - delay;
    return (...args) => {
        let current = Date.now();
        if (current - prev >= delay) {
            prev = current;
            func.apply(null, args);
        }
    }
};

let x = Math.floor(Math.random() * window.innerWidth - circleRadius);
let dx = (Math.random() - 0.5) * 8;
let y = Math.floor(Math.random() * window.innerHeight - circleRadius);
let dy = (Math.random() - 0.5) * 8;

let circles = [];

function animate() {
    if(stopBubblechaseCanvas){
        return;
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.fillStyle = '#c9d0db';
    c.fillRect(0, 0, canvasBubblechase.width, canvasBubblechase.height);

    if (circles === []){
        return;
    }

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
        circles[i].draw();
    }

};
