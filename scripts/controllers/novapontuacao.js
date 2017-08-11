'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('NovaPontuacaoCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, $rootScope) {	
	
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;
	
	
	$scope.especificadores = [];	
	var promises = [];		
	
	function init() {			
	}	
	
	function getAllEspec() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspec').getList().then(function(users) {
			console.log(users);
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}	
	
	function getCampanhaAtiva() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getCampanhaAtiva').getList().then(function(ativa) {
			console.log(ativa);
			$scope.campanha = ativa[0];
			deffered.resolve($scope.campanha);
		});
		return deffered.promise;
	}
	
	
	function showNotification() {
        Notification.success('Especificador excluido com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro, title: 'Erro ao buscar campanha ativa!'});
    }
	
	
	$scope.nova = function(espec) {
		if($scope.user.login.id_tipo_login ==1){
			$scope.user.empresa = [];
			$scope.user.empresa.usuario_id = 27;
		}			
		if(!$scope.campanha){
			showErrorNotification('Favor cadastrar uma campanha ativa!(data fim maior que a data de hoje)!')
		}else{			
			var scope = $rootScope.$new();
			scope.params = {especificador: espec.id, id_campanha : $scope.campanha.id, id_usuario : $scope.user.empresa.usuario_id };
			ModalService.showModal({
				scope: scope,
				templateUrl: '/views/modal/novaPontuacaoModal.html',
				controller: 'novaPontuacaoModalCtrl'		
			}).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						var promisseModal = [];
						promisseModal.push(getAllEspec());
						$q.all(promisseModal).then(
							function() {
								init();		
							}	
						);
					}				  
				});
			});
		}		
	};

	$scope.visualizar = function(espec) {
		console.log(espec);		
		var scope = $rootScope.$new();
		scope.params = {espec_id: espec.id};
          ModalService.showModal({
				scope: scope,
				templateUrl: '/views/modal/visualizarPontuacao.html',
				controller: 'VisualizarPontuacao'				
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){	
						
					}				  
				});
			  });
	};		
	
	
	promises.push(getAllEspec());	
	promises.push(getCampanhaAtiva());
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
