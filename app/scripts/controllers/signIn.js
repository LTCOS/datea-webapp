'use strict';

angular.module( 'dateaWebApp' )
.controller( 'SigninCtrl'
, [ '$scope'
  , 'Api'
  , 'localStorageService'
  , 'User'
  , '$location'
  , 'State'
  , 'config'
  , 'shareMetaData'
, function (
    $scope
  , Api
  , localStorageService
  , User
  , $location
  , State
  , config
  , shareMetaData
) {
	var ls = localStorageService
		, msg
	;

	State.isLanding = false;
	$scope.auth     = {};
	$scope.flow     = {};
	$scope.alerts   = [];
 	$scope.reset    = {};
	$scope.nav      = {};
	
	$scope.flow.activationMsg = config.accountMsgs.registerActivationCompleteMsg;

	$scope.nav.visible = true;
	$scope.flow.hideSocial = false;

	$scope.auth.passwordRequired = true;
	$scope.auth.showResetPassword = false;

	User.isSignedIn() && $location.path( '/' );

	shareMetaData.setData({title: "Datea | Ingresa", description: "Ingresa a tu cuenta en Datea."});

	if ($location.search().msg) {
		msg = $location.search().msg;
		if (msg === 'activationComplete') {
			$scope.flow.hideSocial = true;
		}
	}

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.addAlert = function ( givens ) {
		$scope.alerts.push( givens );
	}

	$scope.auth.signIn = function () {
		var isValid
		  , data
		  ;
		isValid = $scope.form.$valid;

		console.log($scope.form);

		data = { username : $scope.auth.username
		       , password : $scope.auth.password }

		if ( isValid ) {
			$scope.flow.loading = true;
			User.signIn( data )
			.then( function ( response ) {
				//User.updateUserDataFromStorage();
				Api.resetRscs();
				$location.path('/');
				$scope.flow.loading = false;
			}, function (reason) {
				if (reason.status == 401) {
					$scope.addAlert({type: 'danger', msg: config.accountMsgs.wrongUserOrPassword});
				}
				$scope.flow.loading = false;
			} );
		}
	}

	$scope.auth.withFacebook = function () {
		OAuth.popup('facebook', function ( error, result ) {
			var partyGivens = {};
			partyGivens.access_token = result.access_token;
			partyGivens.party = 'facebook';
			$scope.flow.loading = true;
			User.signInBy3rdParty( partyGivens )
			.then( function ( response ) {
				$location.path( '/' );
				$scope.flow.loading = false;
			}, function ( reason ) {
				console.log( reason );
				$scope.flow.loading = false;
			} );
		});
	}

	$scope.auth.withTwitter = function () {
		OAuth.popup('twitter', function ( error, result ) {
			var partyGivens = {};
			partyGivens.party = 'twitter';
			partyGivens.oauth_token = result.oauth_token;
			partyGivens.oauth_token_secret = result.oauth_token_secret;
			$scope.flow.loading = true;
			User.signInBy3rdParty( partyGivens )
			.then( function ( response ) {
				if ( response.status === 0 ) {
					$location.path( '/configuracion' );
				} else {
					$location.path( '/' );
				}
				$scope.flow.loading = false;
			}, function ( reason ) {
				console.log( 'auth.withTwitter error', reason );
				$scope.flow.loading = false;
			} );
		});
	}

	$scope.auth.resetPassword = function () {
		var resetGivens = {};
		resetGivens.email = $scope.reset.email;
		$scope.flow.loading = true;
		User.resetPassword( resetGivens )
		.then(function(response){
			$scope.addAlert({type: 'success', msg: config.accountMsgs.PasswdResetEmailMsg})
			$scope.flow.loading = false;
		}, function (reason) {
			$scope.flow.loading = false;
			$scope.addAlert({type: 'warning', msg: config.accountMsgs.PasswdResetNotFoundMsg});
		});
	}

	$scope.flow.toggleResetPassword = function () {
		$scope.auth.showResetPassword = !$scope.auth.showResetPassword;
	}


} ] );
