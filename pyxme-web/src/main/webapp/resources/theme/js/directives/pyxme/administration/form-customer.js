angular.module('app').directive('miCliente', ['Alertify','restInvoiceService','$timeout','$http','blockUI', function(Alertify,RestInvoiceService,$timeout,$http,blockUI) {
    return {
      restrict: 'AE',
      scope: {
        clienteDinamico: '=cliente',
        valorValidador : '=valorValidador'
      },
      link: function(scope, el, attr) {

      },
      templateUrl: 'js/directives/pyxme/administration/form-customer.html',
      controller: ['$scope', function($scope) {
          var ctrl = this;
          ctrl.customerObj = undefined;
          $scope.invalidNumber = false;
          ctrl.personObj = undefined;
          ctrl.findPerson = function(idNumber){
        	  if(idNumber && idNumber.length==10){
        		  ctrl.findPersonById(idNumber);
        	  } else{
        		  if(idNumber.length>10){
        			  Alertify.success('Debe ingresar 10 digitos');
            	  }
        	  }
          }
          
          ctrl.submitCustomerItem = function (person) {
        	  $scope.clienteDinamico = {
          			person : person,
          			comercialName: (person.firstName == undefined || person.firstName =="" ? "" : person.firstName ) +" "+(person.secondName == undefined || person.secondName =="" ? "" : person.secondName ) ,
          			razonSocial:(person.firstLastName == undefined || person.firstLastName =="" ? "" : person.firstLastName ) +" "+(person.secondLastName == undefined || person.secondLastName =="" ? "" : person.secondLastName ) ,
          			address:person.address,
          			identificationNumber:person.identificationNumber,
          			email:person.email
          			};
        	  ctrl.searhCustomer (person.identificationNumber);
          };
          
          ctrl.searhCustomer = function (number){
        	  RestInvoiceService.findCustomerByfilter(number).then(function(data){
        		  if (data.id == null) {
        			  $scope.invalidNumber = true;  
        		  }else {
        			  $scope.invalidNumber = false;
        			  Alertify.error('El cliente seleccionado ya existe');
        		  }
              }, function(reason){
            	  console.log(reason);
              });
          };
          
          
          
          ctrl.searchPerson = function ($select) {
              if($select.search != ""){
                  RestInvoiceService.findPersonByFilter($select.search).then(function(data){
                	  ctrl.personList = data;
                      if (ctrl.personList.length>0){
                      	console.log ("Posee clientes");                   	
                      }else {
                    	  ctrl.customerDto = {
                      			person: {
                      				id:undefined
                      			}
                      	} 
                      }
                  }, function(reason){
                      alert('error');
                  });
              }

          };
          
         
          
          ctrl.loadCustomer =  function(customer){        	
          	controller.customer= {
          	"comercialName": ctrl.personObj.firstName +" "+  ctrl.personObj.secondName + " "+ctrl.personObj.firstLastName + " "+ctrl.personObj.secondLastName,
          	"address": ctrl.personObj.address,
          	"email":  ctrl.personObj.email,
          	"identificationNumber":  ctrl.personObj.identificationNumber,
          	"ivaLoader": true,        	
          	"person":ctrl.personObj,
          	"status":true
          	}
          	
          }
          
      }],
      controllerAs: 'vm'
    };
}]);