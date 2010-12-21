function grid(context) {
	this.init(context);
}

grid.prototype = {
	context: null,

	init: function(context) {
		this.context = context;
		this.context.lineWidth = 1;

		if (RegExp(" AppleWebKit/").test(navigator.userAgent))
			this.context.globalCompositeOperation = 'darker';
	},

	destroy: function() {
	},

	strokeStart: function(x, y) {
		this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.01)";	
	},

	stroke: function(x, y) {
		var i, cx, cy, dx, dy;
		
		cx = Math.round(x / 100) * 100;
		cy = Math.round(y / 100) * 100;
		
		dx = (cx - x) * 10;
		dy = (cy - y) * 10;

		for (i = 0; i < 50; i++)
		{
			this.context.beginPath();
			this.context.moveTo(cx, cy);
			this.context.quadraticCurveTo(x + Math.random() * dx, y + Math.random() * dy, cx, cy);
			this.context.stroke();
		}
	},

	strokeEnd: function() {
		
	}
}
