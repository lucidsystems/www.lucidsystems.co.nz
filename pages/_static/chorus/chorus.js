
// ECMAScript 5! Why wasn't this done before!?
if (!Function.prototype.bind) {
	Function.prototype.bind = function (target) {
		var args = Array.prototype.slice.call(arguments, 1), fn = this;

		return function () {
			return fn.apply(target, args);
		};
	};
}

function Chorus (canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.brushes = [];
}

Chorus.Brushes = {}

Chorus.createBackground = function(drawFunction) {
	var container = $('<div id="chorus-background" style="margin: 0; padding: 0; z-index: -1; position: fixed;"></div>')
	$('body').prepend(container);

	var canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	container.append(canvas);

	if (!canvas.getContext) return;
	
	var context = canvas.getContext("2d");
	var chorus = new Chorus(canvas);
	
	var onWindowResize = null;
	if (drawFunction) {
		onWindowResize = function() {
			/* change the size */
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			
			drawFunction(chorus);
		};
	} else {
		onWindowResize = function() {
			/* make a copy */
			var canvasCopy = document.createElement("canvas");
			canvasCopy.width = canvas.width;
			canvasCopy.height = canvas.height;
			canvasCopy.getContext("2d").drawImage(canvas, 0, 0);

			/* change the size */
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			/* draw the copy */
			context.drawImage(canvasCopy, 0, 0);
		}
	}
	
	window.addEventListener('resize', onWindowResize, false);
	onWindowResize(null);
	
	return chorus;
}

Chorus.cubicInterpolate = function(t, a, b, c, d) {
	function SUB(a, b) {
		return [a[0] - b[0], a[1] - b[1]];
	}

	function MUL(a, b) {
		return [a[0] * b, a[1] * b];
	}

	function ADD(a, b, c, d) {
		return [a[0] + b[0] + c[0] + d[0], a[1] + b[1] + c[1] + d[1]];
	}

	var p = SUB(SUB(d, c), SUB(a, b));
	var q = SUB(SUB(a, b), p);
	var r = SUB(c, a);
	var s = b;

	return ADD(MUL(p, t*t*t), MUL(q, t*t), MUL(r, t), s);
}

Chorus.interpolate = function(coords, t) {
	var i = Math.floor(t);
	var a = coords[(i - 1 + coords.length) % coords.length];
	var b = coords[i];
	var c = coords[(i + 1) % coords.length];
	var d = coords[(i + 2) % coords.length];
	
	return Chorus.cubicInterpolate(t - i, a, b, c, d);
}

Chorus.permute = function(coords) {
	var permuted = [];
	var f = 20;
	
	for (var i = 0; i < coords.length; i++) {
		permuted.push([
			coords[i][0] + (Math.random() * f),
			coords[i][1] + (Math.random() * f)
		]);
	}
	
	return permuted;
}

Chorus.smooth = function(coords, subdivisions) {
	if (coords.length >= 3) {
		var smoothed = [];
		
		for (var i = 0; i < coords.length; i++) {
			for (var j = 0; j < subdivisions; j++) {
				var t = j / subdivisions;
				
				smoothed.push(Chorus.interpolate(coords, i + t));
			}
		}
		
		return smoothed;
	}
	
	return coords;
}

Chorus.prototype.stroke = function(brush, coords, interpolate, callback) {
	if (interpolate)
		coords = Chorus.smooth(coords, interpolate);
	
	function S(c) {
		brush.stroke(c[0], c[1]);
	}
	
	function Sf(c) {
		brush.strokeEnd(c[0], c[1]);
		
		if (callback)
			callback();
	}
	
	brush.strokeStart(coords[0][0], coords[0][1])
	
	var i;
	for (i = 0; i < coords.length; i++) {
		setTimeout(S.bind(this, coords[i]), i * 10);
	}
	
	setTimeout(Sf.bind(this, coords[i-1]), i * 10);
}

Chorus.prototype.draw = function(brush, strokes, options) {
	var last = function(){};
	
	for (var i = 0; i < strokes.length; i++) {
		var color = strokes[i][0], coords;
		if (color[0] < 1) {
			color[0] = Math.floor(color[0] * 255);
			color[1] = Math.floor(color[1] * 255);
			color[2] = Math.floor(color[2] * 255);
		}
		
		if (options.transform) {
			coords = [];
			
			for (var j = 0; j < strokes[i][1].length; j++) {
				coords.push(options.transform(strokes[i][1][j]))
			}
		} else {
			coords = strokes[i][1];
		}
		
		last = (function(color, coords, last) {
			brush.color = color;
			this.stroke(brush, coords, false, last);
		}).bind(this, color, coords, last);
	}
	
	last();
}

Chorus.prototype.cancel = function() {
	for (var i = 0; i < this.brushes.length; i++) {
		this.brushes[i].cancel();
	}
	
	this.brushes = [];
}

Chorus.prototype.getBrush = function(name, callback) {
	var brush = new Chorus.Brushes[name](this.context);
	
	this.brushes.push(brush);
	
	callback(brush);
}

Chorus.translate = function(t, f) {
	return function(c) {
		if (f) {
			c = f(c);
		}
		
		return [c[0] + t[0], c[1] + t[1]]
	}
}

Chorus.scale = function(t, f) {
	return function(c) {
		if (f) {
			c = f(c);
		}
		
		return [c[0] * t[0], c[1] * t[1]]
	}
}
