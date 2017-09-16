import angular from 'angular';
import uiRouter from 'angular-ui-router';
import $ from 'jquery';
import ngSanitize from 'angular-sanitize';
import angularUIBootstrap from 'angular-ui-bootstrap';
require('moment');
import angularMoment from 'angular-moment';
import commonModule from './common/common.js';
import calenderDirective from './common/calender/calender.directive.js';
import appHomeModule from './main/home/appHome.js';
import appGridModule from './common/grid/grid.js';

var app = angular.module('app', [uiRouter, ngSanitize, angularMoment, angularUIBootstrap, appGridModule.name, appHomeModule.name, commonModule.name]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
        requireBase: true,
        enabled: true
    }).hashPrefix('!');
    $stateProvider.state('home', {
        url: '/home',
        template: '<app-home></app-home>'
    });
    $urlRouterProvider.otherwise('/home');
});

app.directive('compile', function($compile, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $timeout(function() {
                $compile(elem.contents())(scope);
            });
        }
    };
});

app.directive('calendar', calenderDirective);
