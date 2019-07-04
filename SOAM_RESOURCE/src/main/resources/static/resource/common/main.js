
//JS资源配置
var paths = {
	'jquery': '/resource/eui/jquery_release.min',
	'eui': '/resource/eui/eui',
	'angular': '/resource/eui/angular_release.min'
}
//CSS资源配置
var euicss = 'css!/resource/eui/eui.min';

//追加HTML页面中配置的JS
var modules = [];
if( scripts ) {
	for( var i in scripts ) {
		var key = "KEY_" + Math.random();
		paths[ key ] = scripts[ i ];
		modules.push( key );
	}
}

//根据不同环境，改变加载地址
if( window.location.host.indexOf( 'localhost' ) > -1 ) {
	euicss = 'css!http://123.207.3.51/resource/eui/eui.min';
	for( var key in paths ) {
		if( paths[ key ].startsWith( '/resource' ) ) {
			paths[ key ] = 'http://123.207.3.51' + paths[ key ];
		}
	}
}

requirejs.config( {
	paths: paths,
	waitSeconds: 0, //加载等待时间，0为无限制
	map: {
		'*': {
			'css': 'css.min'
		}
	},
	shim: {
		'jquery': {
			exports: 'jquery'
		},
		'angular': {
			deps: [],
			exports: 'angular'
		},
		'eui': {
			deps: [ 'jquery', 'angular' ],
			exports: 'eui'
		}
	}
} );

//异步加载资源
require( [euicss, 'jquery', 'angular', 'eui' ], function() {
	require( modules, function() {
		//angularJS渲染页面
		angular.euiPageLoad();
		//将遮罩层隐藏
		//aaaMask.hide();
		//将body显示
		document.body.style.visibility = 'visible';
	} );
} );