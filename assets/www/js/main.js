$.ajax({cache:false});
/* 
 * Main.js - generated by IBM MFP, used to initialize worklight js calls.
 * Manages the push notification implementation related to IBM MFP's push notification services.
 * Can be excluded when moving out of IBM MFP.
*/
var App={};
App.viewModels={};
App.viewModels.extensions={};

//Definition of FinacleMobileApp
//var finacleMobileApp = angular.module('FinacleMobileApp', [
//'ngRoute',
//'AppController',
//'uiGmapgoogle-maps'
//]);


var finacleMobileApp = angular.module('FinacleMobileApp', [
                                                           'ngRoute',
                                                           'ngTouch',
                                                           'AppController'
                                                           ]);
//Define a module for controllers and services
var AppController = angular.module("AppController", ['ngSanitize',
                                                     'ngMaterial',
                                                     'ngMessages']);
var rootScope;

finacleMobileApp.run(function($rootScope){
	console.log("App is running");
	rootScope=$rootScope;
});


//Config for the mobile app
finacleMobileApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/navigation/:feature/resources/:page', {
		templateUrl: function (parameters) {
			// Here, we dynamically create the url for the template
			// The url of the page is just a .html added to
			// the url.
			return 'navigation/' + parameters.feature + '/resources/' +
			parameters.page + '.html';
		},
		controller: 'AppController'
	});
}]);
