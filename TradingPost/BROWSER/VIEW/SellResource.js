TradingPost.SellResource = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let content = DIV({
			style : {
				paddingTop : 110,
				margin : 'auto',
				width : 1000
			},
			c : [
			FORM({
				style : {
					backgroundColor : 'rgba(0, 0, 0, 0.5)',
					padding : 10
				},
				c : [
				UUI.FULL_INPUT({
					name : 'resource1Address',
					placeholder : '자원1의 주소'
				}),
				UUI.FULL_INPUT({
					name : 'resource1Amount',
					placeholder : '자원1의 수량'
				}),
				
				UUI.FULL_INPUT({
					style : {
						marginTop : 10
					},
					name : 'resource2Address',
					placeholder : '자원2의 주소'
				}),
				UUI.FULL_INPUT({
					name : 'resource2Amount',
					placeholder : '자원2의 수량'
				}),
				
				UUI.FULL_INPUT({
					style : {
						marginTop : 10
					},
					name : 'resource3Address',
					placeholder : '자원3의 주소'
				}),
				UUI.FULL_INPUT({
					name : 'resource3Amount',
					placeholder : '자원3의 수량'
				}),
				
				UUI.FULL_INPUT({
					style : {
						marginTop : 10
					},
					name : 'resource4Address',
					placeholder : '자원4의 주소'
				}),
				UUI.FULL_INPUT({
					name : 'resource4Amount',
					placeholder : '자원4의 수량'
				}),
				
				UUI.FULL_TEXTAREA({
					style : {
						marginTop : 10
					},
					name : 'description',
					placeholder : '설명'
				}),
				UUI.FULL_SUBMIT({
					style : {
						marginTop : 10
					},
					value : '판매 시작'
				})],
				on : {
					submit : (e, form) => {
						//TODO:
					}
				}
			})]
		});
		
		TradingPost.Layout.setContent(content);
		
		inner.on('close', () => {
			content.remove();
		});
	}
});