
let canvasRects = document.querySelector('#canvas').getBoundingClientRect();
const STORE = {
	colors: ['red','orange','yellow','white','black','green','pink','purple','#d59be8','lime'],
	canvasSize: {
		width: canvasRects.width,
		height: canvasRects.height
	},
	balls: {}
}

class Ball {
	constructor(id) {
		this.color = STORE.colors[Math.random().toFixed(1) * 10];

		let _radius = this.getRandomNums(5, 40);

		this.id = id;
		this.posX = this.getRandomNums(_radius, 500 - _radius);
		this.posY = this.getRandomNums(_radius, 500 - _radius);
		this.speedX = this.getRandomNums(-20, 20);
		this.speedY = this.getRandomNums(-20, 20);
		this.radius = _radius;
	}

	changeData() {
		STORE.balls[this.id].posX += STORE.balls[this.id].speedX;
		STORE.balls[this.id].posY += STORE.balls[this.id].speedY;

		if (STORE.balls[this.id].posX >= STORE.canvasSize.width - STORE.balls[this.id].radius || STORE.balls[this.id].posX < STORE.balls[this.id].radius) {
			STORE.balls[this.id].color = STORE.colors[Math.random().toFixed(1) * 10];
			STORE.balls[this.id].speedX *= -1;
		}

		if (STORE.balls[this.id].posY >= STORE.canvasSize.width - STORE.balls[this.id].radius || STORE.balls[this.id].posY < STORE.balls[this.id].radius) {
			STORE.balls[this.id].color = STORE.colors[Math.random().toFixed(1) * 10];
			STORE.balls[this.id].speedY *= -1;
		}
	}

	getRandomNums(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	}


}

class Toy {
	constructor(quantity = 1) {
		this.quantity = quantity - 1;
		this.fps = 40;
		this.DOMelem = document.querySelector('#canvas');
		this.canvas = this.DOMelem.getContext('2d');
		this.gradient = this.canvas.createLinearGradient(0, 0, 500, 500)
		this.gradient.addColorStop(0, "skyblue");
		this.gradient.addColorStop(1, "darkblue");

		for (let i = 0; i <= this.quantity; i++) {
			STORE.balls[i] = new Ball(i);
		}

		this.rewriteCanvas();
	}

	rewriteCanvas() {
		setInterval(this.change.bind(this), 1000/this.fps);
	}

	change() {
		this.canvas.fillStyle = this.gradient;
		this.canvas.fillRect(0, 0, 500, 500);

		 for (let i = 0; i <= this.quantity; i++) {
		 	this.canvas.beginPath();
			this.canvas.arc(STORE.balls[i].posX, STORE.balls[i].posY, STORE.balls[i].radius, 0, 2 * Math.PI);
			this.canvas.fillStyle = STORE.balls[i].color;
			this.canvas.fill();
			this.canvas.stroke();
		 	STORE.balls[i].changeData();
		 }
	}
}

new Toy(25);