function simple(context) {
	this.init(context);
}

simple.prototype = {
	context: null,

	prevx: null, prevy: null,

	init: function(context) {
		this.context = context;
		this.context.globalCompositeOperation = 'source-over';
		this.context.lineWidth = 0.5;
	},

	destroy: function() {
	},

	strokeStart: function(x, y) {
		this.prevx = x;
		this.prevy = y;
		
		this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.5)";		
	},

	stroke: function(x, y) {
		this.context.beginPath();
		this.context.moveTo(this.prevx, this.prevy);
		this.context.lineTo(x, y);
		this.context.stroke();

		this.prevx = x;
		this.prevy = y;
	},

	strokeEnd: function() {
		
	}
}
