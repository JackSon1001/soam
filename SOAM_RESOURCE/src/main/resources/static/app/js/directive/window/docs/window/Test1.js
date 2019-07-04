'use strict';

angular
		.module('test.Test1', [ 'catServices', 'ui.bootstrap' ])

		.controller(
				'test1Controller',
				function($scope, $timeout) {
					// 检查浏览器是否支持
					if (!mxClient.isBrowserSupported()) {
						// 如果浏览器不支持，则显示错误信息
						mxUtils.error('Browser is not supported!', 200, false);
					} else {
						console.log('mxGraph is supported!')
					}

					var node = document.getElementById('id-of-graph-container');
					//var graph = new mxGraph(node);
					var editor = new mxEditor();
					var graph = editor.graph;
					editor.setGraphContainer(node);
					
					var model = new mxGraphModel();
					var parent = graph.getDefaultParent();

					// Installs a handler for double click events in the graph
					// that shows an alert box
					graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt) {
						var cell = evt.getProperty('cell');
						mxUtils
								.alert('Doubleclick: ' + ((cell != null) ? 'Cell' : 'Graph'));
						evt.consume();
					});
					
					// Installs a popupmenu handler using local function (see below).
					graph.panningHandler.factoryMethod = function(menu, cell, evt)
					{
						createPopupMenu(editor, graph, menu, cell, evt);
					};
					// Function to create the entries in the popupmenu
					function createPopupMenu(editor, graph, menu, cell, evt)
					{
						if (cell != null)
						{
							if (graph.isHtmlLabel(cell))
							{
								menu.addItem('Properties', '../components/mxGraph/examples/editors/images/properties.gif', function()
								{
									editor.execute('properties', cell);
								});
						
								menu.addSeparator();
							}

							menu.addItem('Delete', '../components/mxGraph/examples/images/delete2.png', function()
							{
								editor.execute('delete', cell);
							});
						
							menu.addSeparator();
						}

						menu.addItem('Undo', '../components/mxGraph/examples/images/undo.png', function()
						{
							editor.execute('undo', cell);
						});
						
						menu.addItem('Redo', '../components/mxGraph/examples/images/redo.png', function()
						{
							editor.execute('redo', cell);
						});
					};

					model.beginUpdate();
					try {
						var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30,
								'rounded;strokeColor=red;fillColor=green');
						var v2 = graph
								.insertVertex(parent, null, 'World!', 200, 50, 80, 30);
						var e1 = graph.insertEdge(parent, null, '', v1, v2);
					} finally {
						// Updates the display
						// 更新显示
						model.endUpdate();
					}
					var enc = new mxCodec();
					var node = enc.encode(graph.getModel());

					// console.log("node=" + node.outerHTML);
					console.log("node=" + mxUtils.getXml(node));

					$scope.xmlContent = node.outerHTML;

					$scope.loadXml = function() {
						var container = document.getElementById('lala');
						container.innerHTML = "";
						// container.style.position = 'absolute';
						// container.style.overflow = 'hidden';
						// container.style.left = '0px';
						// container.style.top = '0px';
						// container.style.right = '0px';
						// container.style.bottom = '0px';
						// document.body.appendChild(container);

						var model = new mxGraphModel();
						var graph = new mxGraph(container, model);
						var style = new Object();
						style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
						style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
						style[mxConstants.STYLE_IMAGE] = 'images/login_user.png';
						style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
						style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
						style[mxConstants.STYLE_FONTCOLOR] = '#000000';
						style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
						graph.getStylesheet().putCellStyle('start-s', style);
						graph.getModel().beginUpdate();
						try {
							// var req = mxUtils.load('./js/test/test1.xml');
							// var root = req.getDocumentElement();
							// var dec = new mxCodec(root);
							// dec.decode(root, graph.getModel());

							var doc = mxUtils.parseXml($scope.xmlContent);
							var dec = new mxCodec(doc);
							dec.decode(doc.documentElement, graph.getModel());
						} finally {
							// 更新显示
							graph.getModel().endUpdate();
						}
					}
				});
