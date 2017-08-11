'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:PontuacaoCtrl
 * @description
 * # PontuacaoCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('TemplateCtrl', function ($scope, $q, Restangular, $window, ModalService, $rootScope) {
    
	
	var promises = [];	
	$scope.user = {};	
	
	
	function init() {			
		var decoded = jwt_decode(localStorage.getItem("token"));	
		$scope.user = decoded.user;
		$rootScope.user = decoded.user;
		console.log($scope.user);
	}	
	
	

	function getUserById() {
		
		var deffered  = $q.defer();
		console.log(localStorage.getItem("token"));
		if(localStorage.getItem("token")!='null'){
			var decoded = jwt_decode(localStorage.getItem("token"));	
			
			var params = {  user : decoded.userId };
			Restangular.all('api/getUserById').post(JSON.stringify(params)).then(function(espec) {	
				console.log(espec);
				if (espec.error) {
					 deffered.reject(espec.error);
				}else{
					deffered.resolve(espec);
				}				
			});
		}else{
			$window.location.href = 'index.html';
			
		}		
		return deffered.promise;		
	}	
	
	$scope.doLogout = function(user) {		
		ModalService.showModal({
			templateUrl: '/views/modal/logout.html',
			controller: 'AprovarCtrl'
		}).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						$window.localStorage['token'] = null;
						$scope.user = null;
						//localStorage.setItem("token", {});
						$window.location.href = 'index.html';
					}				  
				});
			});
			
	};	
	
	//promises.push(getUserById());	
	
	//$q.all(promises).then(
	//	function(user) {
	//		console.log(user[0]);
	//		var userTemp = user[0]
	init();		
	//	}	
	//);
	
	
	
  });
