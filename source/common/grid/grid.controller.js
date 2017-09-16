class appGridController {

    constructor($state, moment, $scope) {
        "ngInject";

        const vm = this;
        vm.currentSelected = moment();

        vm.$onInit = () => {
            vm.sortType = vm.myoptions.sortField;
            vm.sortReverse = vm.myoptions.sortReverse;
            vm.myoptions.data.forEach(function(item, index) {
                item.dob = moment(item.dob).format('MM/DD/YYYY');
            });
        };

        vm.classCaret = "dropdown";
        vm.changeSort = function(type) {
            vm.sortType = type.field;
            vm.sortReverse = !vm.sortReverse;
            if (vm.sortReverse) {
                vm.classCaret = "dropup";
            } else {
                vm.classCaret = "dropdown";
            }
        }

        vm.updateChange = function() {
            var divElement = event.target.nextElementSibling;
            divElement.style.display = 'block';
        }

        $scope.$watch("vm.currentSelected", function(newValue) {            
            var ele = document.getElementsByClassName('id1');
            Array.prototype.forEach.call(ele, function(item, index) {
                if (item.nextElementSibling.style.display === 'block') {
                    item.nextElementSibling.style.display = 'none';
                }
            })
        });
    }

}

export default appGridController;
