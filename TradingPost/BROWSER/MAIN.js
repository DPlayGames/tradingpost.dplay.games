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
				uri : 'sell/resource',
				target : TradingPost.SellResource
			});
			
			TradingPost.MATCH_VIEW({
				uri : 'sell/item',
				target : TradingPost.SellItem
			});
			
			TradingPost.MATCH_VIEW({
				uri : 'sell/uniqueitem',
				target : TradingPost.SellUniqueItem
			});
		});
	}
});
