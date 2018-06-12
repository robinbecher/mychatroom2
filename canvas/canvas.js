let canvas;
let c;
const circleSize = 30;
let mouseX = 0;
let mouseY = 0;

window.onload = function () {

    canvas = document.getElementById('canvas');
    c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener('mousemove', throttle(handleMousemove, 10));
    canvas.addEventListener('click', function(){
        let circle = new Circle(mouseX, mouseY, 0, 0, circleSize);
        circles.push(circle);
    }, false);

    animate();
};

function onClick(){

}

function Circle(x, y, dx, dy, circleSize) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.centerX = x + circleSize / 2;
    this.centerY = y - circleSize / 2;

    this.draw = function () {
        c.beginPath();
        c.arc(x, y, circleSize, 0, Math.PI * 2, false);
        c.strokeStyle = 'orange';
        c.stroke();
    }

    this.update = function () {
        x += dx;
        y += dy

        let a = x - mouseX;
        let b = y - mouseY;
        let distance = Math.sqrt(a * a + b * b);

        dx = -1 * a * distance * 0.001;
        dy = -1 * b * distance * 0.001;

        // dx += Math.random()*10;
        // dy +=Math.random()*10;

        // dx = ;
        // dy = mouseY - y;

        if (x >= innerWidth - circleSize || x <= 0 + circleSize) {
            x -= 1;
        }
        if (y <= 0 + circleSize || y > innerHeight - circleSize) {
            y -= 1;
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
