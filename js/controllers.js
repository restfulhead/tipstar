var percenterApp = angular.module('percenterApp', []);

percenterApp.controller('PercenterCtrl', function ($scope)
{
    $scope.percentage = 0;
    $scope.amount = 0;
    $scope.compareNumberA = 0;
    $scope.compareNumberB = 0;


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

    function recalculateApply()
    {
        var percentage = parseFloat($scope.percentage);
        var amount = parseFloat($scope.amount);

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
        var numberA = parseFloat($scope.compareNumberA);
        var numberB = parseFloat($scope.compareNumberB);

        $scope.resultNoAPercentage = (numberA / numberB) * 100;
        $scope.resultNoBPercentage = (numberB / numberA) * 100;
        $scope.resultCompareIncrease = ((numberB / numberA) * 100) - 100;
        $scope.resultCompareDecrease = 100 - ((numberA / numberB) * 100);
    }

});