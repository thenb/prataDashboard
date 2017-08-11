'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('novaPontuacaoModalCtrl',  function ($scope, close, $q, Restangular, Notification, $element) {	
	
	console.log($scope.params);
	$scope.id_espec = $scope.params.especificador;
	$scope.id_campanha = $scope.params.id_campanha;
	$scope.id_usuario = $scope.params.id_usuario;
	$scope.pontuacao = {};
	$scope.submited = false;
	
	function novaPontuacao(empresa) {			
		var params = {  id_espec : $scope.id_espec, pontuacao : $scope.pontuacao , id_campanha : $scope.id_campanha, id_usuario : $scope.id_usuario };	
		var deffered  = $q.defer();				
		Restangular.all('api/novaPontuacao').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{				
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}	

	function showNotification() {
        Notification.success('Pontos cadastrado com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao cadastrar os pontos!'});
    }	
	
	
	$scope.close = function(result) {
		close(result, 1500); // close, but give 500ms for bootstrap to animate
	};
	
	$scope.save = function(formNovaPontuacao) {
		console.log(formNovaPontuacao);
		var promises = [];			
		$scope.submited = true;
		if(!formNovaPontuacao.$invalid){
			promises.push(novaPontuacao($scope.pontuacao));	
			
			$q.all(promises).then(function(retorno) {
				if(retorno[0].type===1){
					showErrorNotification(retorno[0].msg);
				}else{
					showNotification();							
					$element.modal('hide');	
					close({
						  name: $scope.name,
						  age: $scope.age
						}, 500); 					
				}			
			});		
		}		
	};
	
 });
