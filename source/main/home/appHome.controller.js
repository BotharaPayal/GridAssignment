class appHomeController {

    constructor($state, $sce, moment) {
        "ngInject";

        const vm = this;
        vm.day = moment();

        vm.info = [{
            name: 'Roy',
            designation: 'MTS',
            joiningdate: '15/09/2017',
            dob: '09/15/1992',
            probation: 30,
            salary: 10000
        }, {
            name: 'John',
            designation: 'MTS',
            joiningdate: '15/09/2017',
            dob: '05/08/1992',
            probation: 30,
            salary: 10000
        }, {
            name: 'Emily',
            designation: 'Jr.Software Engineer',
            joiningdate: '15/09/2017',
            dob: '03/07/1995',
            probation: 60,
            salary: 9000
        }, {
            name: 'Harry',
            designation: 'Software Engineer',
            joiningdate: '15/09/2017',
            dob: '12/06/1990',
            probation: 30,
            salary: 12000
        }, {
            name: 'Rachel',
            designation: 'SMTS',
            joiningdate: '15/09/2017',
            probation: 90,
            dob: '11/09/1990',
            salary: 15000
        }];

        vm.myoptions = {
            data: vm.info,
            sortField: Object.keys(vm.info[0])[0],
            sortReverse: false,
            title: 'Employee Data',
            dataColumns: [{
                field: 'name',
                name: 'Name',
                visible: true,
                width: 120
            }, {
                field: 'designation',
                name: 'Designation',
                visible: true,
                width: 120
            }, {
                field: 'joiningdate',
                name: 'Joining Date',
                visible: false,
                width: 120
            }, {
                field: 'dob',
                name: 'Date of Birth',
                visible: true,
                template: $sce.trustAsHtml('<input class="id1" type="text" ng-model="employee[col.field]" ng-keydown="vm.updateChange()"></input><div style="display:none"><calendar selected="employee[col.field]" current="vm.currentSelected"></calendar></div>'),
                width: 120
            }, {
                field: 'probation',
                name: 'Probation Period',
                visible: false,
                width: 120
            }, {
                field: 'salary',
                name: 'Salary',
                visible: false,
                width: 120
            }]
        };
    }

}

export default appHomeController;
