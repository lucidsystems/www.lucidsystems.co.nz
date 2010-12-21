function fur(context) {
	this.init(context);
}

fur.prototype = {
	context: null,

	prevx: null, prevy: null,

	points: null, count: null,

	init: function(context) {
		this.context = context;
		this.context.lineWidth = 1;

		this.points = new Array();
		this.count = 0;
	},

	destroy: function() {
	},

	strokeStart: function(x, y) {
		this.prevx = x;
		this.prevy = y;
		
		this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.1)";		
	},

	stroke: function(x, y) {
		var i, dx, dy, d;

		this.points.push([ x, y ]);

		this.context.beginPath();
		this.context.moveTo(this.prevx, this.prevy);
		this.context.lineTo(x, y);
		this.context.stroke();

		for (i = 0; i < this.points.length; i++)
		{
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
			d = dx * dx + dy * dy;

			if (d < 2000 && Math.random() > d / 2000)
			{
				this.context.beginPath();
				this.context.moveTo(x + (dx * 0.5), y + (dy * 0.5));
				this.context.lineTo(x - (dx * 0.5), y - (dy * 0.5));
				this.context.stroke();
			}
		}

		this.prevx = x;
		this.prevy = y;

		this.count ++;
	},

	strokeEnd: function() {
		
	}
}
