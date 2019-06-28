TradingPost.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let content = DIV({
			style : {
				paddingTop : 110,
				margin : 'auto',
				width : 1000
			}
		});
		
		TradingPost.Layout.setContent(content);
		
		inner.on('close', () => {
			content.remove();
		});
	}
});