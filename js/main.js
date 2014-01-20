// pop up for formular tooltip
$(function ()
{ $(".popover-link").popover();
});

// hide navigation on click
$(function() {
    $('.nav a').on('click', function(){
        if($('.navbar-toggle').css('display') !='none'){
            $(".navbar-toggle").trigger( "click" );
        }
    });
});

