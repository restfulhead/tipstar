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
    });
});


// select all when focus
$(function() {
    $("#inputTipAmount").focus(function () { this.setSelectionRange(0, 9999); } );
    $("#inputTipPercentage").focus(function () { this.setSelectionRange(0, 9999); } );
    $("#inputTipDividedBy").focus(function () { this.setSelectionRange(0, 9999); } );

    $("#inputPercentage").focus(function () { this.setSelectionRange(0, 9999); } );
    $("#inputAmount").focus(function () { this.setSelectionRange(0, 9999); } );
    $("#inputDividedBy").focus(function () { this.setSelectionRange(0, 9999); } );

    $("#inputNoA").focus(function () { this.setSelectionRange(0, 9999); } );
    $("#inputNoB").focus(function () { this.setSelectionRange(0, 9999); } );
});


// correct decimal signs and validate input
$("#inputTipAmount").keyup(function()
{
    validateInput(this);
});
$("#inputTipPercentage").keyup(function()
{
    validateInput(this);
});
$("#inputTipDividedBy").keyup(function()
{
    validateInput(this);
});

$("#inputPercentage").keyup(function()
{
    validateInput(this);
});
$("#inputAmount").keyup(function()
{
    validateInput(this);
});
$("#inputDividedBy").keyup(function()
{
    validateInput(this);
});

$("#inputNoA").keyup(function()
{
    validateInput(this);
});
$("#inputNoB").keyup(function()
{
    validateInput(this);
});

function validateInput(elem)
{
    if (!elem.value)
    {
        addErrorClass(elem);
    }
    else {
        this.value = correctDecimal(elem.value);
        removeErrorClass(elem);
    }
}

function addErrorClass(elem)
{
    if (!elem.className.contains("form-control-error")) {
        elem.className = elem.className + " form-control-error";
    }
}
function removeErrorClass(elem)
{
    if (elem.className.contains("form-control-error")) {
        elem.className = elem.className.substr(0, elem.className.length-19);
    }
}

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