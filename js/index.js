(function (root) {
    var map = root.grid.GRID_20,
    	clearMap = root.grid.CLEARGRID_20;

    	root.grid.getCoord = function() {
			return items;
		}

	var items = root.grid.solutionStart(map);

	document.body.onkeydown = function(e){
		root.grid.moving(e);
	};    


setTimeout(function() {

	 document.querySelector('.outer').appendChild(
        root.grid.render(map, items)
    );
}, 800);
   
root.grid.loop = setInterval(function() {
		map = [];

	for (var i = 0; i < clearMap.length; i++) {
		map.push(clearMap[i].slice());
	}


	var go = root.grid.solution(items),
		field = document.querySelector('.grid'); 
	if(field) {
		field.remove();
		document.querySelector('.outer').appendChild(
	        root.grid.render(map, go)
	    );
	}
}, 800);

})(this);
