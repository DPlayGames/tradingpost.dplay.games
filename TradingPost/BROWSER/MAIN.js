TradingPost.MAIN = METHOD({

	run : () => {
		
		// 나눔 명조 폰트 추가
		ADD_FONT({
			name : 'Nanum Myeongjo',
			style : 'normal',
			weight : 400,
			woff2 : '/TradingPost/R/font/NanumMyeongjo-Regular.woff2',
			woff : '/TradingPost/R/font/NanumMyeongjo-Regular.woff',
			ttf : '/TradingPost/R/font/NanumMyeongjo-Regular.ttf'
		});
		
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = 'input[type="range"]::-webkit-slider-thumb { width:30px; height:30px; } * { font-family:\'Nanum Myeongjo\'; -webkit-tap-highlight-color:transparent; } input, textarea { user-select:auto; -webkit-user-select:auto; }';
		document.getElementsByTagName('head')[0].appendChild(style);
		
		MSG.loadCSV('/TradingPost/R/text.csv', () => {
			
			TradingPost.MATCH_VIEW({
				uri : '**',
				target : TradingPost.Layout
			});
			
			TradingPost.MATCH_VIEW({
				uri : '',
				target : TradingPost.Home
			});
			
			TradingPost.MATCH_VIEW({
				uri : 'resource/sell',
				target : TradingPost.SellResource
			});
			
			TradingPost.MATCH_VIEW({
				uri : 'item/sell',
				target : TradingPost.SellItem
			});
		});
	}
});
