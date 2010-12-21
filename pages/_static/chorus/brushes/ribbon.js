Chorus.Brushes.Ribbon = function(context) {
	this.init(context);
}

Chorus.Brushes.Ribbon.prototype = {
	context: null,

	x: null, y: null,

	painters: null,

	interval: null,

	init: function(context) {
		this.context = context;
		var screenWidth = context.width, screenHeight = context.height;

		this.x = screenWidth / 2;
		this.y = screenHeight / 2;

		this.painters = new Array();
		
		for (var i = 0; i < 50; i++) {
			this.painters.push({dx: screenWidth / 2, dy: screenHeight / 2, ax: 0, ay: 0, div: 0.1, ease: Math.random() * 0.2 + 0.6});
		}

		var callback = function() {
			this.update();
			return false;
		}
		
		this.interval = setInterval(callback.bind(this), 1000/60);
	},
	
	destroy: function() {
		clearInterval(this.interval);
	},

	strokeStart: function(x, y) {
		this.x = x;
		this.y = y

		this.context.lineWidth = 1;
		this.context.globalCompositeOperation = 'source-over';
		this.context.strokeStyle = "rgba(" + this.color + ", 0.05)";
		
		for (var i = 0; i < this.painters.length; i++)
		{
			this.painters[i].dx = x;
			this.painters[i].dy = y;
		}

		this.shouldDraw = true;
	},

	stroke: function(x, y) {
		this.x = x;
		this.y = y;
	},

	strokeEnd: function() {
	
	},

	update: function() {
		var i;

		this.context.lineWidth = 1;
		this.context.globalCompositeOperation = 'source-over';
		this.context.strokeStyle = "rgba(" + this.color + ", 0.05)";

		for (i = 0; i < this.painters.length; i++)
		{
			this.context.beginPath();
			this.context.moveTo(this.painters[i].dx, this.painters[i].dy);

			this.painters[i].dx -= this.painters[i].ax = (this.painters[i].ax + (this.painters[i].dx - this.x) * this.painters[i].div) * this.painters[i].ease;
			this.painters[i].dy -= this.painters[i].ay = (this.painters[i].ay + (this.painters[i].dy - this.y) * this.painters[i].div) * this.painters[i].ease;
			this.context.lineTo(this.painters[i].dx, this.painters[i].dy);
			this.context.stroke();
		}
	}
}
