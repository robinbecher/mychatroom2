let canvas;
let c;
const circleSize = 30;
const maxDist=200;
let mouseX = 0;
let mouseY = 0;

window.onload = function () {

    canvas = document.getElementById('canvas');
    c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener('mousemove', throttle(handleMousemove, 10));
    canvas.addEventListener('click', function () {
        let circle = new Circle(mouseX, mouseY, 0, 0, circleSize);
        circles.push(circle);
    }, false);

    animate();
};


function Circle(x, y, dx, dy, circleSize) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.centerX = x + circleSize / 2;
    this.centerY = y - circleSize / 2;
    let ax=0;
    let ay=0;

    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    let color = 'rgb('+r+','+b+','+g+')';

    this.draw = function () {
        c.beginPath();
        c.arc(x, y, circleSize, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.stroke();
    }

    this.update = function () {
        x += dx;
        y += dy

        let a = x - mouseX;
        let b = y - mouseY;
        let distance = Math.sqrt(a * a + b * b);

        if (distance ===0){
            distance = Math.random()-0.5;
        }

        // dx = -1 * a * 0.001 * distance;
        // dy = -1 * b * 0.001 * distance;

        dx+=ax;
        dy+=ay;

        ax= a / distance*0.5;
        ay= b / distance*0.5;

        if (distance>=maxDist){
            dx=dy=0;
        }

        if (x > innerWidth - circleSize) {
            x = innerWidth-circleSize;
        }if(x < 0 + circleSize){
            x=0+circleSize;
        }
        if (y < 0 + circleSize) {
            y = 0+circleSize;
        }if(y > innerHeight - circleSize){
            y=innerHeight-circleSize;
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

let x = Math.floor(Math.random() * innerWidth - circleSize);
let dx = (Math.random() - 0.5) * 8;
let y = Math.floor(Math.random() * innerHeight - circleSize);
let dy = (Math.random() - 0.5) * 8;

let circles = [];

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
        circles[i].draw();
    }

};
