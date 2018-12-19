var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var d = new Date();
var currentMonth = d.getMonth();
var currentYear = d.getFullYear();

$("#month").text(months[currentMonth]);
$("#year").text(currentYear);

$("td").on("click", function(){
	console.log($(this).text());
});

$("h1").on("click", function(){
	console.log("show icons");
});

$(".fa-angle-left").on("click", function(event){
	if (currentMonth === 0){
		currentMonth = 11;
		currentYear--;
	}else{
		currentMonth--;
	}
	$("#month").text(months[currentMonth]);
	$("#year").text(currentYear);
	event.stopPropagation();
});

$(".fa-angle-right").on("click", function(event){
	if (currentMonth === 11){
		currentMonth = 0;
		currentYear++;
	}else{
		currentMonth++;
	}
	$("#month").text(months[currentMonth]);
	$("#year").text(currentYear);
	event.stopPropagation();
});