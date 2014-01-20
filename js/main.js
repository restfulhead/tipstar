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

// listen to navigation change events and notify home controller
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e)
{
    var scope = angular.element($("#home")).scope();
    scope.$apply(function(){
        scope.currentLink = e.target;
    })

})
