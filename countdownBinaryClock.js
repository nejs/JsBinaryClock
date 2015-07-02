Date.prototype.addHours= function(h){
	this.setHours(this.getHours()+h);
	return this;
}

Date.prototype.diffClock = function(dateEnd){
	var now = new Date();
        var diffH = parseInt(Math.abs((end - now)/36e5));
        var diffM = parseInt(Math.abs((end - now)/6e4))%60;
        var diffS = parseInt(Math.abs((end - now)/1e3))%60;

	return [diffH, diffM, diffS];
}

var screen = function(){

	var _data = null;
	var _pins = null;

	console.log("Create Screen");

	var _update = function(_diff){
		var mask = ["1000","0100","0010","0001"];

	  var decimal;
		var unit;
		var i,j,k;

		for(k=0; k<6; k +=2){
			decimal = (_diff[k/2])/10;
			unit = (_diff[k/2])%10;
			for(i=3; i>=1; i--){
				this.data[i][k] = ~~!!(decimal&parseInt(mask[i],2));
			}
			for (j=3; j>=0; j--){
				this.data[j][k+1] = ~~!!(unit&parseInt(mask[j],2));
			}

		}

		return this.data;
	}

	var _flush = function(){

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 6; j--) {
				//TODO
			};
		};

	}

	var _init = function(){
		_data = [
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0]
		];

		//TODO pins Matrix

	}();
	return{
		data:_data,
		pins:_pins,
		update: _update,
		flush: _flush
	}

}

var end = new Date().addHours(parseInt(process.argv[2]));

var screen = new screen();


setInterval(function(){

	var diff = new Date().diffClock(end);
	screen.update(diff);
	console.log(screen.data);


},1000);
