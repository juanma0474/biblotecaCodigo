'use strict';

/**
 * @ngdoc service
 * @Author Juan Manuel López Bedoya (juanma0474@hotmail.com)
 * @description
 * # loginService   : Servicio para realizar login, logout de un usaurio del sistema por medio de Json Web Token
 * # requestService : Servicio para verificar el estado del usaurio (si se encuentra logueado o no)
 * service of the biblotecaApp
 */
angular.module('biblotecaApp')
.service('loginService', function ($http, socket) {
	var loginSvc = {};
	loginSvc.login = function(user){
		return $http({
			method :"POST",
			skipAuthorization : true,
			url :'/api/login',
			data : {username: user.username, password: user.password}
		})
	},
	loginSvc.logout = function(){

		socket.disconnect();
		return $http({
			method :"POST",
			skipAuthorization : true,
			url :'/api/logout'
		})

	},
	loginSvc.chagePassword = function (changePass){
		return $http({
			method :"POST",
			skipAuthorization : true,
			url :'/api/updatePassword',
			data : changePass
		})

	}
	return loginSvc;
})
.service('requestService', function ($window, jwtHelper, $rootScope){
	var auth = {
		isLogged: false,
		check: function() {
			var token = window.localStorage.getItem("token");
			if (token && jwtHelper.isTokenExpired(token) == false) {
				this.isLogged = true;
				this.user =  JSON.parse($window.localStorage.getItem("user"));
			} else {
				this.isLogged = false;
				delete this.user;
				delete $window.localStorage.token;
				$window.localStorage.clear();
				delete $window.localStorage.user;
				$rootScope.userIn = "";

			}
		}
	}

	return auth;
});
