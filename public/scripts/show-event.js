$("#del-btn-1").on("click", function(event){
    $(".event-details").css("opacity", "0.1");
    $(".btn-set-1").each(function(i){
        $(this).css("visibility", "hidden");
    });

    $(".confirm-overlay").css("opacity", "1");
});

$(".back-btn-2").on("click", function(event){
    $(".event-details").css("opacity", "1");
    $(".btn-set-1").each(function(i){
        $(this).css("visibility", "visible");
    });

    $(".confirm-overlay").css("opacity", "0");
})

