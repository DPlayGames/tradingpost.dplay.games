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
						c : IMG({
							style : {
								width : 109
							},
							src : '/TradingPost/R/logo.png'
						}),
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
							toggleMenu();
						}
					}
				})]
			}).appendTo(BODY);
			
			let menu;
			
			// 우측 상단 메뉴를 열거나 닫습니다.
			let toggleMenu = self.toggleMenu = () => {
				
				let hideMenu = () => {
					
					UANI.HIDE_SLIDE_UP({
						node : menu
					}, () => {
						menu.remove();
						menu = undefined;
					});
				};
				
				if (menu !== undefined) {
					hideMenu();
				}
				
				else {
					
					menu = UL({
						style : {
							position : 'absolute',
							right : 30,
							top : 70
						}
					}).appendTo(BODY);
					
					EACH([{
						title : '자원 판매',
						uri : 'resource/sell'
					}, {
						title : '아이템 판매',
						uri : 'item/sell'
					}], (menuInfo, index) => {
						
						menu.append(LI({
							style : {
								border : '1px solid #666',
								backgroundColor : '#333',
								marginTop : -1
							},
							c : A({
								style : {
									width : 150,
									display : 'block',
									padding : 10,
									textAlign : 'center'
								},
								c : menuInfo.title,
								on : {
									tap : () => {
										TradingPost.GO(menuInfo.uri);
										hideMenu();
									}
								}
							})
						}));
					});
					
					UANI.SHOW_SLIDE_DOWN({
						node : menu
					}, () => {
						
						EVENT_ONCE('tap', () => {
							hideMenu();
						});
					});
				}
			};
			
			inner.on('close', () => {
				layout.remove();
			});
		}
	};
});
