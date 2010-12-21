$(function() {
	Chorus.createBackground(function(chorus) {
		chorus.cancel();
		
		chorus.getBrush('LongFur', function(brush) {
			brush.color = [255, 255, 155];
			var x = chorus.canvas.width * Math.random(), y = chorus.canvas.height * 0.1 * Math.random();

			chorus.stroke(brush, [
				[x + 100, y + 100], [x + 200, y + 100], [x + 200, y + 200], [x + 100, y + 200],
				[x + 110, y + 110], [x + 210, y + 110], [x + 210, y + 210], [x + 110, y + 210],
				[x + 100, y + 100], [x + 200, y + 100], [x + 200, y + 200], [x + 100, y + 200],
				[x + 110, y + 110], [x + 210, y + 110], [x + 210, y + 210], [x + 110, y + 210]
			], 16);
		});
/*
		chorus.getBrush('Sketchy', function(brush) {
			brush.color = [80, 200, 60];
			setTimeout(function() {
				var w = chorus.canvas.width, h = chorus.canvas.height - 50;

				var path = [];
				for (var i = 0; i < w; i = i + 5) {
					path.push([i, h - (10 * (i % 10))]);
				}

				path = Chorus.permute(path);

				chorus.stroke(brush, path, 4);
			}, Math.random() * 1000);
		});
*/
		var eX = chorus.canvas.width * Math.min(0.2 + Math.random(), 0.8), eY = chorus.canvas.height * 0.5;
		eY -= eY * 0.2 * Math.random();
		var eS = Math.max(0.8, Math.random());
		
		chorus.getBrush('Sketchy', function(brush) {
			var sx = eS, sy = sx;
			if (Math.random() < 0.5) sx = sx * -1;

			chorus.draw(brush, Elephant, {
				transform: Chorus.translate([eX, eY], Chorus.scale([sx, sy]))
			});
		})
/*
		if (Math.random() < 0.8) {
			chorus.getBrush('Web', function(brush) {
				var sx = eS * 0.8 * Math.max(0.9, Math.random()), sy = sx;
				if (Math.random() < 0.5) sx = sx * -1;

				chorus.draw(brush, Elephant, {
					transform: Chorus.translate([eX - 500, eY], Chorus.scale([sx, sy]))
				});
			})
		}
*/
		chorus.getBrush('Sketchy', function(brush) {
			var x = (chorus.canvas.width / 5) + (100 * Math.random()), y = eY - 500;
			
			var sx = Math.max(2.8, Math.random() * 3.5), sy = sx;
			if (Math.random() < 0.5) sx = sx * -1;
			
			chorus.draw(brush, Tree, {
				transform: Chorus.translate([x, y], Chorus.scale([sx, sy]))
			});
		})
	});
});
