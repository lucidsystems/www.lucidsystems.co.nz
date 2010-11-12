$(function() {
	Chorus.createBackground(function(chorus) {
		chorus.cancel();
		
		chorus.getBrush('LongFur', function(brush) {
			brush.color = [255, 255, 155];
			var x = chorus.canvas.width * Math.random(), y = chorus.canvas.height * 0.2 * Math.random();

			chorus.stroke(brush, [
				[x + 100, y + 100], [x + 200, y + 100], [x + 200, y + 200], [x + 100, y + 200],
				[x + 110, y + 110], [x + 210, y + 110], [x + 210, y + 210], [x + 110, y + 210],
				[x + 100, y + 100], [x + 200, y + 100], [x + 200, y + 200], [x + 100, y + 200],
				[x + 110, y + 110], [x + 210, y + 110], [x + 210, y + 210], [x + 110, y + 210]
			], 16);
		});
/*
		chorus.getBrush('LongFur', function(brush) {
			brush.color = [80, 200, 60];
			setTimeout(function() {
				var w = chorus.canvas.width, h = chorus.canvas.height - 50;

				var path = [];
				for (var i = 0; i < w; i = i + 5) {
					path.push([i, h - (10 * (i % 10))]);
				}

				path = Chorus.permute(path);

				chorus.stroke(brush, path, 2);
			}, Math.random() * 1000);
		});
*/
		var eX = chorus.canvas.width * Math.min(0.2 + Math.random(), 0.8), eY = chorus.canvas.height * 0.6;
		eY -= eY * 0.2 * Math.random();
		
		chorus.getBrush('Web', function(brush) {
			var sx = Math.max(0.8, Math.random()), sy = sx;
			if (Math.random() < 0.5) sx = sx * -1;

			chorus.draw(brush, Elephant, {
				transform: Chorus.translate([eX, eY], Chorus.scale([sx, sy]))
			});
		})
		
		chorus.getBrush('Web', function(brush) {
			var x = chorus.canvas.width * Math.random(), y = eY - 200 + (Math.random() * 100);
			
			var sx = Math.max(0.8, Math.random()), sy = sx;
			if (Math.random() < 0.5) sx = sx * -1;
			
			chorus.draw(brush, Tree, {
				transform: Chorus.translate([x, y], Chorus.scale([sx, sy]))
			});
		})
	});
});
