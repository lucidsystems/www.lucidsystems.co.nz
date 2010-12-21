function shaded(context) {
	this.init(context);
}

shaded.prototype = {
	context: null,

	prevx: null, prevy: null,

	points: null, count: null,

	init: function(context) {
		this.context = context;
		this.context.lineWidth = 1;
		this.context.globalCompositeOperation = 'source-over';

		this.points = new Array();
		this.count = 0;
	},

	destroy: function() {
	},

	strokeStart: function(x, y) {
		this.prevx = x;
		this.prevy = y;
	},

	stroke: function(x, y) {
		var i, dx, dy, d;

		this.points.push([ x, y ]);

		for (i = 0; i < this.points.length; i++)
		{
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
			d = dx * dx + dy * dy;

			if (d < 1000)
			{
				this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + ((1 - (d / 1000)) * 0.1) + ")";

				this.context.beginPath();
				this.context.moveTo(this.points[this.count][0], this.points[this.count][1]);
				this.context.lineTo(this.points[i][0], this.points[i][1]);
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
