
window.onload = function () {
var range = $('.input-range'),
    value = $('.range-value');
    
value.html(range.attr('value'));

range.on('input', function(){
    value.html(this.value);
}); 
	$.getJSON("output.json", function (res) {
	document.getElementById("nba-game-date").innerHTML=res.gamedate+"";
	document.getElementById("nba-game-against").innerHTML=res.against+"";
	document.getElementById("nba-game-time").innerHTML=res.gametime+"";
	});
}