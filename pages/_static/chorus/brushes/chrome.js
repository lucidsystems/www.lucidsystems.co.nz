function chrome(context) {
	this.init(context);
}

chrome.prototype = {
	context: null,

	prevx: null, prevy: null,

	points: null, count: null,

	init: function(context) {
		this.context = context;
		this.context.lineWidth = 1;
		
		if (RegExp(" AppleWebKit/").test(navigator.userAgent))
			this.context.globalCompositeOperation = 'darker';

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

		this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.1)";
		this.context.beginPath();
		this.context.moveTo(this.prevx, this.prevy);
		this.context.lineTo(x, y);
		this.context.stroke();

		for (i = 0; i < this.points.length; i++)
		{
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
			d = dx * dx + dy * dy;

			if (d < 1000)
			{
				this.context.strokeStyle = "rgba(" + Math.floor(Math.random() * color[0]) + ", " + Math.floor(Math.random() * color[1]) + ", " + Math.floor(Math.random() * color[2]) + ", 0.1)";
				this.context.beginPath();
				this.context.moveTo(this.points[this.count][0] + (dx * 0.2), this.points[this.count][1] + (dy * 0.2));
				this.context.lineTo(this.points[i][0] - (dx * 0.2), this.points[i][1] - (dy * 0.2));
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
