'use strict';

angular
.module('dateaWebApp')
.constant('config',
	{ app     : { name : 'Datea.pe'
	            , url  : 'http://localhost:9000/#/' }
	, api     : { url    : 'http://api.datea.pe/api/v2/'
	            , imgUrl : 'http://api.datea.pe/' }
  , dateo   : { sizeImgMax    : 35000
	            , sizeImgMaxMsg : 'Su archivo es muy grande'
	            }
	, headers : { 'Authorization' : 'Apikey root:106b7be6c0028671fa6e2d57209f53ad42e14a20' }
	, defaultMap : { center   : { lat: -12.05, lng: -77.06, zoom: 14 }
	               , defaults : { scrollWheelZoom: false }
	               , markers  : {}
	               }
	}
);
