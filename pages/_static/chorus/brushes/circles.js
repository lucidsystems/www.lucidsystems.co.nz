function circles(context) {
	this.init(context);
}

circles.prototype = {
	context: null,

	prevx: null, prevy: null,

	points: null, count: null,

	init: function(context) {
		this.context = context;
		this.context.lineWidth = 1;
		this.context.globalCompositeOperation = 'source-over';

		this.points = new Array();
	},

	destroy: function() {
	},

	strokeStart: function(x, y) {
		this.prevx = x;
		this.prevy = y;
		
		this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.1)";		
	},

	stroke: function(x, y) {
		var i, dx, dy, d, cx, cy, steps, step_delta;

		this.points.push([ x, y ]);

		dx = x - this.prevx;
		dy = y - this.prevy;
		d = Math.sqrt(dx * dx + dy * dy) * 2;
		
		cx = Math.floor(x / 100) * 100 + 50;
		cy = Math.floor(y / 100) * 100 + 50;
		
		steps = Math.floor(Math.random() * 10);
		step_delta = d / steps;

		for (i = 0; i < steps; i++)
		{
			this.context.beginPath();
			this.context.arc(cx, cy, (steps - i) * step_delta, 0, Math.PI*2, true);
			this.context.stroke();
		}

		this.prevx = x;
		this.prevy = y;
	},

	strokeEnd: function() {
		
	}
}
