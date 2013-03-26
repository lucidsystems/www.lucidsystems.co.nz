$(function() {
	Chorus.createBackground(function(chorus) {
		chorus.cancel();
		
		var scale = chorus.canvas.height / 1024.0;
		var screenTransform = Chorus.scale([scale, scale]);
		
		var areaScale = (chorus.canvas.height * chorus.canvas.width) / (1280.0 * 1024.0);
/*
		chorus.getBrush('sketchy', function(brush) {
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
		
		chorus.getBrush('sketchy', function(brush) {
			brush.setScale(areaScale * 0.1);
			
			var sx = eS, sy = sx;
			if (Math.random() < 0.5) sx = sx * -1;

			chorus.draw(brush, Elephant, {
				transform: Chorus.translate([eX, eY], Chorus.scale([sx, sy], screenTransform))
			});
		});
		
		chorus.getBrush('longfur', function(brush) {
			brush.setScale(areaScale * 0.5)
			
			var x = chorus.canvas.width * Math.random(), y = chorus.canvas.height * 0.2 * Math.random();

			chorus.draw(brush, Sun, {
				transform: Chorus.translate([x, y], Chorus.scale([eS * 2.0, eS * 2.0], screenTransform)),
				interpolate: 8
			});
		});
/*
		if (Math.random() < 0.8) {
			chorus.getBrush('web', function(brush) {
				var sx = eS * 0.8 * Math.max(0.9, Math.random()), sy = sx;
				if (Math.random() < 0.5) sx = sx * -1;

				chorus.draw(brush, Elephant, {
					transform: Chorus.translate([eX - 500, eY], Chorus.scale([sx, sy]))
				});
			})
		}
*/
		chorus.getBrush('sketchy', function(brush) {
			brush.setScale(areaScale * 0.8);
			
			var x = (chorus.canvas.width / 5) + (100 * Math.random()), y = eY - 500;
			
			var sx = Math.max(2.8, Math.random() * 3.5), sy = sx;
			if (Math.random() < 0.5) sx = sx * -1;
			
			chorus.draw(brush, Tree, {
				transform: Chorus.translate([x, y], Chorus.scale([sx, sy], screenTransform))
			});
		})
	});
});
