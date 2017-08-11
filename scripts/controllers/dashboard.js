'use strict';

/**
* @ngdoc function
* @name prataAngularApp.controller:PontuacaoCtrl
* @description
* # PontuacaoCtrl
* Controller of the prataAngularApp
*/
angular.module('prataAngularApp')
.controller('DashboardCtrl', function (Restangular, $scope, $q) {      
	var promises = [];	
	  
	function init() {					
	}  

	function getAllPontByIdEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.user.especificador.id };		
		Restangular.all('api/getAllPontByIdEspec').post(JSON.stringify(params)).then(function(pont) {			
			var total =  0;
			pont.map(function(item){
				total+= item.pontos;				
			});			
			deffered.resolve(total);
			$scope.pontuacaoAtual = total;
		});
		return deffered.promise;
	}	

	function getTotalIndicacoes() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.user.especificador.id };		
		Restangular.all('api/getTotalIndicacoes').post(JSON.stringify(params)).then(function(qtd) {				
			deffered.resolve(qtd);
			$scope.totalIndicacoes = qtd[0].qtd;
		});
		return deffered.promise;
	} 

	function getAllEmpresasVisited() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.user.login.id_login };		
		Restangular.all('api/getAllEmpresasVisited').post(JSON.stringify(params)).then(function(empresas) {			
			deffered.resolve(empresas);
			$scope.totalVisitas = empresas.length;			
		});
		return deffered.promise;
	} 

	function getTotalEspec() {			
		var deffered  = $q.defer();	
		Restangular.one('api/getTotalEspec').getList().then(function(qtd) {
			$scope.totalEspecificadores = qtd[0].qtd;							
			deffered.resolve($scope.totalClientes);
		});		
		return deffered.promise;
	} 	

	function getTotalClientes() {			
		var deffered  = $q.defer();	
		Restangular.one('api/getTotalClientes').getList().then(function(qtd) {
			$scope.totalClientes = qtd[0].qtd;							
			deffered.resolve($scope.totalClientes);
		});		
		return deffered.promise;
	} 

	function getTotalEmpresas() {			
		var deffered  = $q.defer();	
		Restangular.one('api/getTotalEmpresas').getList().then(function(qtd) {
			$scope.totalEmpresas = qtd[0].qtd;							
			deffered.resolve($scope.totalClientes);
		});		
		return deffered.promise;
	} 

	function getTotalPresencasByEmpresa() {		
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.user.empresa.id };		
		Restangular.all('api/getAllPresencaByEmpresa').post(JSON.stringify(params)).then(function(presencas) {			
			console.log(presencas);		
			$scope.totalPresencasByEmpresa = presencas[0].qtdPresencaCampanhaAtiva;
			deffered.resolve($scope.totalPresencasByEmpresa);
		});
		return deffered.promise;
	}
	
	function getTotalIndicacoesEmpresa() {
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.user.empresa.id };		
		Restangular.all('api/getTotalIndicacoesEmpresa').post(JSON.stringify(params)).then(function(ind) {			
			console.log(ind);		
			$scope.qtdIndicacaoEmpresa = ind[0].qtdIndicacaoEmpresa;
			deffered.resolve($scope.qtdIndicacaoEmpresa);
		});
		return deffered.promise;
	}

	//console.log($scope.user.login.id_tipo_login);
	if($scope.user.login.id_tipo_login !=1 || $scope.user.login.id_tipo_login !=2 ){
		promises.push(getAllEmpresasVisited());
	}

	if($scope.user.especificador){
		promises.push(getAllPontByIdEspec());
		promises.push(getTotalIndicacoes());
	}

	if($scope.user.login.id_tipo_login == 2 ){
		promises.push(getTotalPresencasByEmpresa());	
		promises.push(getTotalIndicacoesEmpresa());
	}	



	if($scope.user.login.id_tipo_login == 1 ){
		promises.push(getTotalEspec());
		promises.push(getTotalClientes());
		promises.push(getTotalEmpresas());
	}	

	$q.all(promises).then(
		function() {
			init();		
		}	
	);




});
