function squares(context) {
	this.init(context);
}

squares.prototype = {
	context: null,

	prevx: null, prevy: null,

	init: function(context) {
		this.context = context;
		this.context.globalCompositeOperation = 'source-over';
		this.context.fillStyle = "rgb(255, 255, 255)";
		this.context.lineWidth = 1;
	},

	destroy: function() {
	},

	strokeStart: function(x, y) {
		this.prevx = x;
		this.prevy = y;
		
		this.context.strokeStyle = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";		
	},

	stroke: function(x, y) {
		var dx, dy, angle, px, py;
		
		dx = x - this.prevx;
		dy = y - this.prevy;
		angle = 1.57079633;
		px = Math.cos(angle) * dx - Math.sin(angle) * dy;
		py = Math.sin(angle) * dx + Math.cos(angle) * dy;

		this.context.beginPath();
		this.context.moveTo(this.prevx - px, this.prevy - py);
		this.context.lineTo(this.prevx + px, this.prevy + py);
		this.context.lineTo(x + px, y + py);
		this.context.lineTo(x - px, y - py);
		this.context.lineTo(this.prevx - px, this.prevy - py);
		this.context.fill();
		this.context.stroke();

		this.prevx = x;
		this.prevy = y;
	},

	strokeEnd: function() {
		
	}
}
