var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthsWith31Days = [0, 2, 4, 6, 7, 9, 11];
var d = new Date();
var currentDay = d.getDate();
var currentMonth = d.getMonth();
var currentYear = d.getFullYear();

init();

$(".fas").on("click", function(event){
	if ($(this).hasClass("fa-angle-left")){
		if (currentMonth === 0){
			currentMonth = 11;
			currentYear--;
		}else{
			currentMonth--;
		}
	}else{
		if (currentMonth === 11){
			currentMonth = 0;
			currentYear++;
		}else{
			currentMonth++;
		}
	}

	changeMonth(currentMonth, currentYear);
	event.stopPropagation();
});

$("#close-button").on("click", function(){
	$(".pop-up-container").fadeOut(function(){
		$(this).css("display", "none");
	});
});

$("#test").on("click", function(){
	$(".pop-up-container").hide();
	$(".pop-up-container").fadeIn();
	$(".pop-up-container").css("display", "flex");
});

function init(){

	$("#content").hide();

	$("#header td").each(function(i){
		$(this).text(days[i]);
	});

	buildCalendarMonth(currentMonth, currentYear);

	$("#content").fadeIn(500);
}

function changeMonth(month, year){
	$("#content").fadeOut(500, function(){
		buildCalendarMonth(month, year);
	});
	$("#content").fadeIn(500);
}

function buildCalendarMonth(month, year){

	$("#month").text(months[currentMonth]);
	$("#year").text(currentYear);

	// get the no. of days in the month
	var nDaysInMonth = getDaysInMonth(month, year);

	// get the index of the first day of the month
	var firstDayIdx = getFirstDayInMonth(month, year);

	$(".date-val").each(function(i){

		if ((i < firstDayIdx) || (i - firstDayIdx >= nDaysInMonth)){
			$(this).text("•");
			$(this).removeClass("include");
			return;
		}

		$(this).text(i - firstDayIdx + 1);
		$(this).addClass("include");
	});

	if (month === d.getMonth() && year === d.getFullYear()){
		$(".include:contains(" + currentDay + ")").html('<span class="current">' + currentDay + '</span>');
	}
}

function getFirstDayInMonth(month, year){
	return (new Date(year, month, 1)).getDay();
}

function getDaysInMonth(month, year){

	// if February, check if in leap year
	if (month === 1){
		return isLeapYear(year) ? 29 : 28;
	}

	return monthsWith31Days.includes(month) ? 31 : 30;
}

function getPreviousMonth(month){
	return month === 0 ? 11 : month--;
}


function isLeapYear(year){
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
