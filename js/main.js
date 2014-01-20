// pop up for formular tooltip
$(function ()
{ $(".popover-link").popover();
});

// hide navigation on click
$(function() {
    $('.nav a').on('click', function(){
        if($('.navbar-toggle').css('display') !='none'){
            $(".navbar-toggle").trigger( "click" );
            window.scrollTo(0,0);
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


// select all when focus
$(function() {
    $("#inputPercentage").focus(function () { this.setSelectionRange(0, 9999); return false; } ).mouseup( function () { return false; });

    $("#inputAmount").focus(function() { this.setSelectionRange(0, 9999) });
    $("#inputNoA").focus(function() { this.setSelectionRange(0, 9999) });
    $("#inputNoB").focus(function() { this.setSelectionRange(0, 9999) });
});


// correct decimal signs
$("#inputPercentage").keyup(function()
{
    this.value = correctDecimal(this.value);
});
$("#inputAmount").keyup(function()
{
    this.value = correctDecimal(this.value);
});
$("#inputNoA").keyup(function()
{
    this.value = correctDecimal(this.value);
});
$("#inputNoB").keyup(function()
{
    this.value = correctDecimal(this.value);
});


function correctDecimal (arg)
{
    if(!arg) {
        return arg;
    }

    if (!arg || arg.length < 1)
    {
        return parseFloat(str);
    }

    var str = arg.toString();

    var fixed = '';
    var separator = false;
    for(var i=str.length-1;i >= 0; i--)
    {
        var char = str.charAt(i);

        if ((char == ',' || char == '.'))
        {
            if(!separator)
            {
                fixed = '.' + fixed;
                separator = true;
            }
        }
        else
        {
            fixed = char + fixed;
        }
    }

    return fixed;
}