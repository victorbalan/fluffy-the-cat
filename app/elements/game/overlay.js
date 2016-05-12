function Overlay(stage, n, squareLength){
	var overlay = [];
	console.log(n, squareLength);
	for(var i=0;i<n;i++){
		var rowOverlay = [];
		for(var j=0;j<n;j++){
			var x = j * squareLength;
			var y = i * squareLength;
			var square = new createjs.Shape();
			var overlayShape = new createjs.Shape();
			overlayShape.graphics.beginFill("black").drawRect(x, y, squareLength, squareLength);
			overlayShape.setBounds(x, y, squareLength, squareLength);
			overlayShape.alpha = 1;
			rowOverlay.push(overlayShape);
			stage.addChild(overlayShape);
		}
		overlay.push(rowOverlay);
	}
	stage.update();

	function update(player){
		// player`s current position in the matrix
		var ci = Math.round(player.getBounds().y/(squareLength + 1));
		var cj = Math.round(player.getBounds().x/(squareLength + 1));
		for(var i=0;i<overlay.length;i++){
			var overlayRow = overlay[i];
			for(var j=0;j<overlayRow.length;j++){
					if(i===ci && j===cj){
						overlay[i][j].alpha = 0;
					}else if((i===ci-1 && j===cj) || (i===ci+1 && j===cj) || (j===cj-1 && i===ci) 	|| (j===cj+1 && i===ci)){
						overlay[i][j].alpha = 0.5;
					}else{
						overlay[i][j].alpha = 1;
					}
				}
		}
		stage.update();
	}

	return {
		update: update
	}
}
