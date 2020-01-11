'use strict';

angular.module('myApp').factory('InventoryService', ['$http', '$q', '$httpBackend', function($http, $q, $httpBackend){

   var REST_SERVICE_URI = '/api/v1/inventory';

   // Mock interception of REST api calls.
   // Comment this section, and it will attempt to use real api
   var mockInventory = {coffee: 99, milk: 99, sugar: 99, chocolate: 99};
   $httpBackend.whenRoute('GET', '/api/v1/inventory')
   .respond(function(method, url, data, headers, params) {
     return [200, mockInventory];
   });
   $httpBackend.whenRoute('PUT', '/api/v1/inventory')
   .respond(function(method, url, data, headers, params) {
     let obj = JSON.parse(data);
     mockInventory.coffee += parseInt(obj.coffee);
     mockInventory.milk +=  parseInt(obj.milk);
	 mockInventory.sugar += parseInt(obj.sugar);
	 mockInventory.chocolate += parseInt(obj.chocolate);
     return [201, mockInventory];
   });
   // end mock interception

   // Services
   var factory = {
           getInventory: getInventory,
           updateInventory: updateInventory
   };

   return factory;

   function getInventory() {
       var deferred = $q.defer();
       $http.get(REST_SERVICE_URI)
           .then(
           function (response) {
               deferred.resolve(response.data);
           },
           function(errResponse){
               console.error('Error while getting inventory');
               deferred.reject(errResponse);
           }
       );
       return deferred.promise;
   } 

   function updateInventory(inventory) {
       var deferred = $q.defer();
       $http.put(REST_SERVICE_URI, inventory)
           .then(
           function (response) {
               deferred.resolve(response.data);
           },
           function(errResponse){
               console.error('Error while updating Inventory');
               deferred.reject(errResponse);
           }
       );
       return deferred.promise;
   }

}]);