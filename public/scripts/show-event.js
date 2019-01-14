// if main delete button pressed
$("#del-btn-1").on("click", function(event){
    $(".event-details").css("opacity", "0.1");

    // hide all the present buttons
    $(".btn-set-1").each(function(i){
        $(this).css("visibility", "hidden");
    });

    // show deletion confirmation overlay
    $(".confirm-overlay").css("opacity", "1");
});

// if cancel button pressed on deletion confirmation overlay
$(".back-btn-2").on("click", function(event){
    $(".event-details").css("opacity", "1");

    //  reveal the buttons hid by the overlay
    $(".btn-set-1").each(function(i){
        $(this).css("visibility", "visible");
    });

    // hide the overlay
    $(".confirm-overlay").css("opacity", "0");
})

