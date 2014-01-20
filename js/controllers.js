var percenterApp = angular.module('percenterApp', []);

percenterApp.controller('PercenterCtrl', function ($scope, $rootScope)
{
    $scope.$watch('percentage', function (newValue, oldValue) {
        recalculateApply();
    }, true);

    $scope.$watch('amount', function (newValue, oldValue) {
        recalculateApply();
    }, true);


    $scope.$watch('compareNumberA', function (newValue, oldValue) {
        recalculateCompare();
    }, true);

    $scope.$watch('compareNumberB', function (newValue, oldValue) {
        recalculateCompare();
    }, true);

    $rootScope.$on('applyPercentage', function(event, param)
    {
        $scope.percentage = param[0];
        $scope.amount = param[1];
        recalculateApply();
    });

    function recalculateApply()
    {
        var percentage = parseFloatX($scope.percentage.toString());
        var amount = parseFloatX($scope.amount.toString());

        $scope.resultPercentage = (percentage / 100) * amount;
        $scope.resultAmount = amount / (percentage/100);
        $scope.resultAdd = amount + ((percentage / 100) * amount)
        $scope.resultSubtract = amount - ((percentage / 100) * amount)

        var reducedPercentage = $scope.reducedPercentage = 100 - percentage;
        $scope.resultReduced = amount / (reducedPercentage/100);

        var increasedPercentage = $scope.increasedPercentage = 100 + percentage;
        $scope.resultIncreased = amount / (increasedPercentage/100);
    }

    function recalculateCompare()
    {
        var numberA = parseFloatX($scope.compareNumberA);
        var numberB = parseFloatX($scope.compareNumberB);

        $scope.resultNoAPercentage = (numberA / numberB) * 100;
        $scope.resultNoBPercentage = (numberB / numberA) * 100;
        $scope.resultCompareIncrease = ((numberB / numberA) * 100) - 100;
        $scope.resultCompareDecrease = 100 - ((numberA / numberB) * 100);
    }

    function parseFloatX (arg)
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

        return parseFloat(fixed);
    }
});

percenterApp.controller('HomeScreenCtrl', function ($scope, $rootScope)
{
    $scope.activeTabId = "applyPercentage";

    $scope.$watch('currentLink', function (newValue, oldValue)
    {
        if (newValue) {
            var tabName = newValue.toString();
            $scope.activeTabId = tabName.substr(tabName.indexOf('#') + 1, tabName.length - tabName.indexOf('#') -1);
        }
    }, false);

    $scope.$watch('showDetails', function (newValue, oldValue)
    {
        if (newValue) {
            $scope.details = "partials/how-to-add-percenter-to-home-screen.html";
        }
        else {
            $scope.details = null;
        }
    }, true);

    $scope.showExample = function(number) {
        var param = new Array();

        $('#resultAddColumn').removeClass('highlight');
        $('#resultSubtractColumn').removeClass('highlight');
        $('#resultIncreasedColumn').removeClass('highlight');

        switch (number)
        {
            case 1:
                param[0] = 18;
                param[1] = 30;
                $('#resultAddColumn').addClass('highlight');
                break;

            case 2:
                param[0] = 18;
                param[1] = 50;
                $('#resultAddColumn').addClass('highlight');
                break;

            case 3:
                param[0] = 18;
                param[1] = 70;
                $('#resultAddColumn').addClass('highlight');
                break;

            case 4:
                param[0] = 40;
                param[1] = 60;
                $('#resultSubtractColumn').addClass('highlight');
                break;

            case 5:
                param[0] = 8.375;
                param[1] = 399;
                $('#resultAddColumn').addClass('highlight');
                break;

            case 6:
                param[0] = 20;
                param[1] = 99;
                $('#resultIncreasedColumn').addClass('highlight');
                break;

            default:
        }

        $rootScope.$broadcast('applyPercentage', param);
        window.scrollTo(0,0);

    };
});