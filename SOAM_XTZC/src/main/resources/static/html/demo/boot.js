( function() {

	var testEnv = "http://123.207.3.51";
	var origin = window.location.origin;

	var jsPath = [
		"/resource/eui/jquery_release.min.js",
		"/resource/eui/angular_release.min.js",
		"/resource/eui/eui.min.js",
		"/resource/common/constants.js"
	];

	var cssPath = [
		"/resource/eui/eui.css"
	];

	//加载公共css文件
	for( var i in cssPath ) {
		if( cssPath[ i ].startsWith( '/resource' ) && /[localhost]/.test( origin ) ) {
			cssPath[ i ] = testEnv + cssPath[ i ];
		}
		document.write( '<link href=' + cssPath[ i ] + ' rel="stylesheet" type="text/css" />' );
	}

	//加载公共js文件
	for( var i in jsPath ) {
		if( jsPath[ i ].startsWith( '/resource' ) && /[localhost]/.test( origin ) ) {
			jsPath[ i ] = testEnv + jsPath[ i ];
		}
		document.write( '<script src=' + jsPath[ i ] + ' type="text/javascript"></script>' );
	}

	//获取head内的eui-resource元素，注意：eui-resource必须放在boot.js前面，否在加载不到
	var euiNodes = document.getElementsByTagName( "eui-resource" );
	for( var i in euiNodes ) {
		
		var euiNode = euiNodes[ i ];
		
		for( var n in euiNode.attributes ) { //循环eui-resource元素内的属性
			if( euiNode.attributes[ n ].name == 'src' ) {
				//获得元素内src属性的value值
				var path = euiNode.attributes[ n ].value;
				
				//假如为本机开发环境，并且src属性值为"/resource"开头，进行资源重定向，转为网上地址
				if( path.startsWith( '/resource' ) && /[localhost]/.test( origin ) ) {
					path = testEnv + path;
				}
				//将JS资源载入
				document.write( '<script src="' + path + '" type="text/javascript"></script>' );
				break;
			}
		}
	}

} )();