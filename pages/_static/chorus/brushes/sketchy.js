Chorus.Brushes.Sketchy = function(context) {
	this.init(context);
}

Chorus.Brushes.Sketchy.prototype = {
	context: null,

	prevx: null, prevy: null,

	points: null, count: null,

	init: function(context) {
		this.context = context;

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

		this.context.lineWidth = 1;
		this.context.globalCompositeOperation = 'source-over';

		this.context.strokeStyle = "rgba(" + this.color + ", 0.9)";
		this.context.beginPath();
		this.context.moveTo(this.prevx, this.prevy);
		this.context.lineTo(x, y);
		this.context.stroke();

		this.context.strokeStyle = "rgba(" + this.color + ", 0.6)";

		for (i = 0; i < this.points.length; i++)
		{
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
			d = dx * dx + dy * dy;

			if (d < 4000 && Math.random() > d / 2000)
			{
				this.context.beginPath();
				this.context.moveTo(this.points[this.count][0] + (dx * 0.3), this.points[this.count][1] + (dy * 0.3));
				this.context.lineTo(this.points[i][0] - (dx * 0.3), this.points[i][1] - (dy * 0.3));
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
