'use strict';

var datea = angular.module( 'dateaWebApp'
, [ 'ui.bootstrap'
  , 'ngResource'
  , 'LocalStorageModule'
  , 'wxBirdangularModule'
  , 'facebook' ] )
.config( [ '$routeProvider', '$httpProvider', 'FacebookProvider',
	function ( $routeProvider, $httpProvider, FacebookProvider ) {
		// var fbAppId = '240185656082013';
		var fbAppId = '203191529863567';

		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		FacebookProvider.init( fbAppId );

		$routeProvider
		.when( '/'
		  , { templateUrl : 'views/main.html'
		    , controller  : 'MainCtrl'
		    } )
		.when( '/registrate'
		  , { templateUrl : 'views/signup.html'
		    , controller  : 'SignupCtrl'
		    } )
		.when( '/signup'
		  , { templateUrl : 'views/signupForm.html'
		    , controller  : 'SignupformCtrl'
		    } )
		.when( '/twitter-callback'
		  , { templateUrl : 'views/twitter-callback.html'
		    , controller  : 'TwitterCallbackCtrl'
		    } )
		.otherwise( { redirectTo : '/' } );

	} ] );
