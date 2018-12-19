$("td").on("click", function(){
	console.log($(this).text());
});

$("h1").on("click", function(){
	console.log("show icons");
});

$(".fa-angle-left").on("click", function(event){
	console.log("show last month");
	event.stopPropagation();
});

$(".fa-angle-right").on("click", function(event){
	console.log("show next month");
	event.stopPropagation();
});