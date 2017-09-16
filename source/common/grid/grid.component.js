import controller from './grid.controller';

const appGridComponent = {
    restrict: 'E',
    templateUrl: 'common/grid/grid.html',
    bindings: {
        info: '=',
        myoptions: '='
    },
    controller,
    controllerAs: 'vm'    
};

export default appGridComponent;
