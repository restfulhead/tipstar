var tipStarApp = angular.module('TipStarApp', ['angulartics', 'angulartics.google.analytics']);

tipStarApp.controller('TipStarCtrl', ['$scope', '$rootScope', '$analytics', '$timeout', function ($scope, $rootScope, $analytics, $timeout) {
    readCookies();

    if (!$scope.roundUp) {
        $scope.roundUp = true;
    }

    if (!$scope.dividedBy) {
        $scope.dividedBy = 1;
    }

    if (!$scope.percentage) {
        $scope.percentage = 0;
    }

    var timeoutPromise;
    var delayInMs = 2000;

    $scope.$watch('percentage', function (newValue, oldValue) {
        $timeout.cancel(timeoutPromise);
        timeoutPromise = $timeout(function() {
            recalculateApply('percentage', newValue);
        }, delayInMs);
    }, true);

    $scope.$watch('amount', function (newValue, oldValue) {
        recalculateApply('amount', newValue);
    }, true);

    $scope.$watch('dividedBy', function (newValue, oldValue) {
        recalculateApply('dividedBy', newValue);
    }, true);

    $scope.$watch('roundUp', function (newValue, oldValue) {
        recalculateApply('roundUp', newValue);
    }, true);

    $scope.$watch('compareNumberA', function (newValue, oldValue) {
        recalculateCompare('compareNumberA', newValue);
    }, true);

    $scope.$watch('compareNumberB', function (newValue, oldValue) {
        recalculateCompare('compareNumberB', newValue);
    }, true);


    $rootScope.$on('applyPercentage', function(event, param) {
        $scope.percentage = param[0];
        $scope.amount = param[1];

        if (param.length > 2) {
            $scope.dividedBy = param[2];
        } else {
            $scope.dividedBy = 1;
        }

        recalculateApply('applyPercentage', param[0]);
    });

    function recalculateApply(source, newValue) {
        try {
            var percentage = parseFloat($scope.percentage.toString());
            var amount = parseFloat($scope.amount.toString());
            var dividedBy = parseFloat($scope.dividedBy.toString());
            var roundUp = $scope.roundUp;

            $analytics.eventTrack('RecalculatePercentage', {  category: 'App', label: source, value: newValue });

            $scope.resultPercentage = (percentage / 100) * amount;
            $scope.resultPercentageDiv = $scope.resultPercentage / dividedBy;

            $scope.resultAmount = amount / (percentage / 100);
            $scope.resultAmountDiv = $scope.resultAmount / dividedBy;

            $scope.resultAdd = amount + ((percentage / 100) * amount);
            $scope.resultAddDiv = $scope.resultAdd / dividedBy;

            if (roundUp) {
                $scope.resultAdd = Math.ceil($scope.resultAdd);
                $scope.resultAddDiv = Math.ceil($scope.resultAddDiv);

            }

            $scope.resultSubtract = amount - ((percentage / 100) * amount);
            $scope.resultSubtractDiv = $scope.resultSubtract / dividedBy;

            var reducedPercentage = $scope.reducedPercentage = 100 - percentage;
            $scope.resultReduced = amount / (reducedPercentage / 100);
            $scope.resultReducedDiv = $scope.resultReduced / dividedBy;

            var increasedPercentage = $scope.increasedPercentage = 100 + percentage;
            $scope.resultIncreased = amount / (increasedPercentage / 100);
            $scope.resultIncreasedDiv = $scope.resultIncreased / dividedBy;
        }
        catch (ex) {
            $scope.resultPercentage = null;
            $scope.resultPercentageDiv = null;

            $scope.resultAmount = null;
            $scope.resultAmountDiv = null;

            $scope.resultAdd = null;
            $scope.resultAddDiv = null;

            $scope.resultSubtract = null;
            $scope.resultSubtractDiv = null;

            $scope.resultReduced = null;
            $scope.resultReducedDiv = null;

            $scope.resultIncreased = null;
            $scope.resultIncreasedDiv = null;

            return;
        }

        writeCookies();
    }

    function recalculateCompare(source, newValue) {
        try {
            var numberA = parseFloat($scope.compareNumberA);
            var numberB = parseFloat($scope.compareNumberB);

            $analytics.eventTrack('ComparePercentage', {  category: 'App', label: source, value: newValue });

            $scope.resultNoAPercentage = (numberA / numberB) * 100;
            $scope.resultNoBPercentage = (numberB / numberA) * 100;
            $scope.resultCompareIncrease = ((numberB / numberA) * 100) - 100;
            $scope.resultCompareDecrease = 100 - ((numberA / numberB) * 100);
        }
        catch (ex) {
            $scope.resultNoAPercentage = null;
            $scope.resultNoBPercentage = null;
            $scope.resultCompareIncrease = null;
            $scope.resultCompareDecrease = null;

        }
        writeCookies();
    }

    function readCookies() {
        $.cookie.json = true;
        var cookieData = $.cookie('tipstar');
        if (cookieData)
        {
            if (!$scope.percentage && cookieData.percentage) {
                $scope.percentage = cookieData.percentage;
            }
            if (!$scope.amount && cookieData.amount) {
                $scope.amount = cookieData.amount;
            }
            if (!$scope.dividedBy && cookieData.dividedBy) {
                $scope.dividedBy = cookieData.dividedBy;
            }
            if (!$scope.roundUp && cookieData.roundUp) {
                $scope.roundUp = cookieData.roundUp;
            }
            if (!$scope.compareNumberA && cookieData.compareNumberA) {
                $scope.compareNumberA = cookieData.compareNumberA;
            }
            if (!$scope.compareNumberB && cookieData.compareNumberB) {
                $scope.compareNumberB = cookieData.compareNumberB;
            }
        }
    }
    
    function writeCookies() {
        var cookieData = {
            "percentage" : $scope.percentage,
            "amount" : $scope.amount,
            "dividedBy" : $scope.dividedBy,
            "roundUp" : $scope.roundUp,
            "compareNumberA" : $scope.compareNumberA,
            "compareNumberB" : $scope.compareNumberB,
        };

        $.cookie('tipstar', cookieData, { expires: 365 });
    }

}]);

tipStarApp.controller('HomeScreenCtrl', ['$scope', '$rootScope', '$analytics', function ($scope, $rootScope, $analytics) {
    $scope.activeTabId = "calculateTip";

    $scope.$watch('currentLink', function (newValue, oldValue) {
        if (newValue) {
            var tabName = newValue.toString();
            $scope.activeTabId = tabName.substr(tabName.indexOf('#') + 1, tabName.length - tabName.indexOf('#') -1);
            $analytics.pageTrack("/" + $scope.activeTabId);
        }
    }, false);

    $scope.$watch('showDetails', function (newValue, oldValue) {
        if (newValue) {
            $scope.details = "partials/how-to-add-tip-star-to-home-screen.html";
        }
        else {
            $scope.details = null;
        }
    }, true);

    $scope.showExample = function(number) {
        var param = new Array();

        $('#resultPercentageColumn').removeClass('highlight');
        $('#resultAddColumn').removeClass('highlight');
        $('#resultSubtractColumn').removeClass('highlight');
        $('#resultIncreasedColumn').removeClass('highlight');

        switch (number) {
            case 1:
                param[0] = 18;
                param[1] = 30;
                $('#resultPercentageColumn').addClass('highlight');
                $('#resultAddColumn').addClass('highlight');
                break;

            case 2:
                param[0] = 18;
                param[1] = 50;
                param[2] = 2;
                $('#resultPercentageColumn').addClass('highlight');
                $('#resultAddColumn').addClass('highlight');
                break;

            case 3:
                param[0] = 18;
                param[1] = 70;
                param[2] = 4;
                $('#resultPercentageColumn').addClass('highlight');
                $('#resultAddColumn').addClass('highlight');
                break;

            case 4:
                param[0] = 40;
                param[1] = 60;
                $('#resultPercentageColumn').addClass('highlight');
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
}]);