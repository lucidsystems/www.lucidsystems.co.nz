Chorus.Brushes.LongFur = function(context) {
	this.init(context);
}

Chorus.Brushes.LongFur.prototype = {
	context: null,

	points: null, count: null,

	init: function(context) {
		this.context = context;
		this.points = new Array();
		this.count = 0;
		this.cancelled = false;
	},

	cancel: function() {
		this.cancelled = true;
	},

	strokeStart: function(x, y) {
	},

	stroke: function(x, y) {
		if (this.cancelled) return;
		
		var i, size, dx, dy, d;
		
		this.context.lineWidth = 1;
		this.context.globalCompositeOperation = 'source-over';
		
		this.context.strokeStyle = "rgba(" + this.color + ", 0.1)";
		this.points.push([x, y]);

		for (i = 0; i < this.points.length; i++)
		{
			size = -Math.random();
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
			d = dx * dx + dy * dy;

			if (d < 4000 && Math.random() > d / 4000)
			{
				this.context.beginPath();
				this.context.moveTo(this.points[this.count][0] + (dx * size), this.points[this.count][1] + (dy * size));
				this.context.lineTo(this.points[i][0] - (dx * size) + Math.random() * 2, this.points[i][1] - (dy * size) + Math.random() * 2);
				this.context.stroke();
			}
		}
		
		this.count++;
	},

	strokeEnd: function() {
	}
}
