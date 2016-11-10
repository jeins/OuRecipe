angular
    .module('app.shared')
    .directive('orPagination', PaginationDirective);

PaginationDirective.$inject = [];
function PaginationDirective() {
    return {
        restrict: 'EA',
        scope: {
            orPages: '=',
            orAlign:"@",
            orAlignModel: '=',
            orPageChanged: '&',
            orSteps: '=',
            orCurrentPage: '='
        },
        controller: PaginationController,
        controllerAs: 'vm',
        template: [
            '<div layout="row" layout-align="{{ orAlign || orAlignModel }}">',
                '<md-button class="md-icon-button md-raised md-warn" aria-label="First" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>',
                '<md-button class="md-icon-button md-raised" aria-label="Previous" ng-click="vm.gotoPrev()" ng-show="vm.index - 1 >= 0">&#8230;</md-button>',
                '<md-button class="md-icon-button md-raised" aria-label="Go to page {{i+1}}" ng-repeat="i in vm.stepInfo"',
                ' ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" ',
                ' ng-class="{\'md-primary\': vm.page[vm.index + i] == orCurrentPage}">',
                ' {{ vm.page[vm.index + i] }}',
                '</md-button>',
                '<md-button class="md-icon-button md-raised" aria-label="Next" ng-click="vm.gotoNext()" ng-show="vm.index + vm.orSteps < orPages">&#8230;</md-button>',
                '<md-button class="md-icon-button md-raised md-warn" aria-label="Last" ng-click="vm.gotoLast()">{{ vm.last }}</md-button>',
            '</div>'
        ].join('')
    };
}

PaginationController.$inject = ['$log', '$scope'];
function PaginationController($log, $scope) {
    var vm = this;
    vm.goto = goto;
    vm.gotoPrev = gotoPrev;
    vm.gotoNext = gotoNext;
    vm.gotoFirst = gotoFirst;
    vm.gotoLast = gotoLast;

    init();

    function init() {
        vm.first = '<<';
        vm.last = '>>';
        vm.index = 0;
        vm.orSteps = $scope.orSteps;

        $scope.$watch('orCurrentPage', function (value) {
            vm.index = parseInt((value - 1) / vm.orSteps) * vm.orSteps;
            $scope.orPageChanged();
        });

        $scope.$watch('orPages', function () {
            vm.stepInfo = (function () {
                var result = [];
                for (var i = 0; i < vm.orSteps; i++) {
                    result.push(i);
                }
                return result;
            })();

            vm.page = (function () {
                var result = [];
                for (var i = 1; i <= $scope.orPages; i++) {
                    result.push(i);
                }
                return result;
            })();
        });
    }

    function goto(index) {
        $scope.orCurrentPage = vm.page[index];
    }

    function gotoPrev() {
        $scope.orCurrentPage = vm.index;
        vm.index -= vm.orSteps;
    }

    function gotoNext() {
        vm.index += vm.orSteps;
        $scope.orCurrentPage = vm.index + 1;
    }

    function gotoFirst() {
        vm.index = 0;
        $scope.orCurrentPage = 1;
    }

    function gotoLast() {
        vm.index = parseInt($scope.orPages / vm.orSteps) * vm.orSteps;

        if(vm.index === $scope.orPages){
            vm.index = vm.index - vm.orSteps;
        } else{
            vm.index = '';
        }

        $scope.orCurrentPage = $scope.orPages;
    }
}