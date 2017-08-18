'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadorCtrl
 * @description
 * # EspecificadorCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('EmpresaCtrl', function (Restangular, $scope, $http, $state, $q, Notification, moment) {
	
	var promisesInit = [];	
	$scope.empresa1 = {};
	$scope.submited = false;	
	
	$scope.novo = $state.params.novo;
	$scope.view = $state.params.view;
	
	if(typeof $state.params.novo === 'undefined'){
			$state.go('empresas');
	}
		
	console.log($scope.user);
	if($state.params.novo){
		$scope.operacao = 'Nova';		
	}else{
		if($scope.view){
			$scope.operacao = 'Visualizar';			
		}else {
			$scope.operacao = 'Editar';			
		}		
		$scope.empresa1 = $state.params.empre;
		console.log($scope.empresa1)
	}
	
	function init() {
		
	
	}
	
	function editarNomeEmpre() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, nome : $scope.empresa1.nome  };		
		Restangular.all('api/empresaUpdateNome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarSegmentoEmpre() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, segmento : $scope.empresa1.segmento  };		
		Restangular.all('api/empresaUpdateSegmento').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}	
	
	function editarCep() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, cep : $scope.empresa1.cep  };		
		Restangular.all('api/empresaUpdateCep').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarEndereco() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, endereco : $scope.empresa1.endereco  };		
		Restangular.all('api/empresaUpdateEndereco').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarNumero() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, numero : $scope.empresa1.numero  };		
		Restangular.all('api/empresaUpdateNumero').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarBairro() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, bairro : $scope.empresa1.bairro  };		
		Restangular.all('api/empresaUpdateBairro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarCidade() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, cidade : $scope.empresa1.cidade  };		
		Restangular.all('api/empresaUpdateCidade').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}	
	
	function editarUf() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, uf : $scope.empresa1.uf  };		
		Restangular.all('api/empresaUpdateUf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	
	function editarNomeUsuario() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, nome_usuario : $scope.empresa1.nome_usuario  };		
		Restangular.all('api/empresaUpdateNomeUsuario').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarTelefone1() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, telefone : $scope.empresa1.telefone  };		
		Restangular.all('api/empresaUpdateTelefone1').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarTelefone2() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.empresa1.id, celular : $scope.empresa1.celular  };		
		Restangular.all('api/empresaUpdateTelefone2').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarSenhaPerfil() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.empresa1.id_login, senha : $scope.empresa1.senha  };		
		Restangular.all('/api/perfilUpdateSenha').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	
	
	function salvarEmpre() {			
		var deffered  = $q.defer();
		//converter a data		
		var params = {  empresa : $scope.empresa1 };	
		Restangular.all('api/saveEmpre').post(JSON.stringify(params)).then(function(empre) {					
			if (empre.error) {
				 deffered.reject(empre.error);
			}
			var email = empre.email;
			var params1 = {  destino : email, assunto: 'Cadastro de Empresa', msg : 'Bem Vindo ao Prata da casa!'};								
			Restangular.all('api/sendMail').post(JSON.stringify(params1)).then(function(email) {		
				if (email.error) {
					 deffered.reject(email.error);
				}
				deffered.resolve(empre);
			});		
		});
		return deffered.promise;
	}
	
	function getInfoEmpresa() {			
		var params = {  id_empresa : $scope.empresa1.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/getInfoEmpresa').post(JSON.stringify(params)).then(function(emp) {		
			console.log(emp);
			if (emp.error) {
				 deffered.reject(emp.error);
			}else{				
				$scope.empresa1.email = emp[0].email;
				$scope.empresa1.nome_usuario = emp[0].nome;
				$scope.empresa1.id_login = emp[0].id_login;
				deffered.resolve(emp);
			}
			
		});
		return deffered.promise;
	}
	
	function showNotification() {
        Notification.success('Empresa cadastrada com sucesso!');
    }
	
	function showNotificationEditar() {
        Notification.success('Empresa Editada com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro, title: 'Erro ao cadastrar a empresa!'});
    }
	
	function showErrorNotificationEditar(erro) {
	   Notification.error({message: erro, title: 'Erro ao editar a empresa!'});
    }	
	
	
	$scope.salvar = function (formEmpre) {			
		$scope.submited = true;
		var promises = [];	
		console.log(formEmpre);
		//Novo
		if($state.params.novo){	
			if(!formEmpre.$invalid){
				promises.push(salvarEmpre());	
				$q.all(promises).then(function(retorno) {
					if(retorno[0].type===1){
						showErrorNotification(retorno[0].msg);
					}else{
						showNotification();		
						$state.go('empresas');							
					}			
				});
			}	
		//Edicao
		}else{
			if(!formEmpre.$invalid){				
				if(formEmpre.nome.$dirty){
					promises.push(editarNomeEmpre());	
				}
				
				if(formEmpre.segmento.$dirty){
					promises.push(editarSegmentoEmpre());	
				}
				
				if(formEmpre.cep.$dirty){
					promises.push(editarCep());	
				}
				
				if(formEmpre.endereco.$dirty){
					promises.push(editarEndereco());	
				}
				
				if(formEmpre.numero.$dirty){
					promises.push(editarNumero());	
				}
				
				if(formEmpre.bairro.$dirty){
					promises.push(editarBairro());	
				}
				
				if(formEmpre.cidade.$dirty){
					promises.push(editarCidade());	
				}
				
				if(formEmpre.uf.$dirty){
					promises.push(editarUf());	
				}

				if(formEmpre.nomeUsuario.$dirty){
					promises.push(editarNomeUsuario());	
				}

				if(formEmpre.telefone1.$dirty){
					promises.push(editarTelefone1());	
				}

				if(formEmpre.telefone2.$dirty){
					promises.push(editarTelefone2());	
				}

				if(formEmpre.senha.$dirty && formEmpre.repetir_senha.$dirty){
					if($scope.empresa1.repetir_senha == $scope.empresa1.senha  ){
						promises.push(editarSenhaPerfil());	
					}else{
						var erro = {}
						erro.code = 'As senhas não são iguais';
						showErrorNotificationEditar(erro);
					}
						
				}
				
				$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotificationEditar(retorno[0].msg);
						}else{
							showNotificationEditar();		
							$state.go('empresas');							
						}			
				});				
			}		
		}
	};
	
	$scope.cancelar = function () {	
		$state.go('empresas');		
	};
	
	if(!$scope.novo){
		console.log($scope.novo);
		promisesInit.push(getInfoEmpresa());	
	}
	
	$q.all(promisesInit).then(function() {
			console.log();
			init();		
		}	
	);
	
	
  });
  
