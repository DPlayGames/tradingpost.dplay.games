TradingPost.Layout = CLASS((cls) => {
	
	let contentWrapper;
	
	let setContent = cls.setContent = (content) => {
		contentWrapper.empty();
		contentWrapper.append(content);
	};
	
	return {
		
		preset : () => {
			return VIEW;
		},
		
		init : (inner, self) => {
			
			let layout = DIV({
				style : {
					backgroundImage : '/TradingPost/R/background.png',
					position : 'relative'
				},
				c : [
				// 로고
				H1({
					style : {
						position : 'absolute',
						left : 25,
						top : 30
					},
					c : A({
						c : MSG('TITLE') + ' alpha',
						on : {
							tap : () => {
								TradingPost.GO('');
							}
						}
					})
				}),
				
				contentWrapper = DIV({
					style : {
						paddingBottom : 100
					}
				}),
				
				// 우측 상단 메뉴 버튼
				A({
					style : {
						position : 'absolute',
						right : 40,
						top : 40
					},
					c : IMG({
						style : {
							width : 15
						},
						src : '/TradingPost/R/menubutton.png'
					}),
					on : {
						tap : () => {
							openMenu();
						}
					}
				})]
			}).appendTo(BODY);
			
			let openMenu = self.openMenu = () => {
				
				let menu = UL({
					style : {
						position : 'absolute',
						right : 30,
						top : 70
					}
				}).appendTo(BODY);
				
				EACH([{
					title : MSG('MENU_MY_SALES_BUTTON'),
					uri : 'mysales'
				}, {
					title : MSG('MENU_SELL_RESOURCE_BUTTON'),
					uri : 'sell/resource'
				}, {
					title : MSG('MENU_SELL_ITEM_BUTTON'),
					uri : 'sell/item'
				}, {
					title : MSG('MENU_SELL_UNIQUE_ITEM_BUTTON'),
					uri : 'sell/uniqueitem'
				}], (menuInfo, index) => {
					
					menu.append(LI({
						style : {
							borderBottom : '1px solid #000',
							backgroundColor : '#333'
						},
						c : A({
							style : {
								width : 150,
								display : 'block',
								padding : 8,
								textAlign : 'center'
							},
							c : menuInfo.title,
							on : {
								touchstart : () => {
									TradingPost.GO(menuInfo.uri);
								}
							}
						})
					}));
				});
				
				EVENT_ONCE('touchstart', () => {
					menu.remove();
				});
			};
			
			inner.on('close', () => {
				layout.remove();
			});
		}
	};
});
