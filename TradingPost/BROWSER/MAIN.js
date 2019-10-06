TradingPost.MAIN = METHOD({

	run : () => {
		
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
