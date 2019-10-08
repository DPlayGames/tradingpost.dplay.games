TradingPost.UniqueItemSale = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let itemList;
		
		let content = DIV({
			style : {
				paddingTop : 110,
				margin : 'auto',
				width : 1000
			},
			c : [
			H1({
				c : MSG('UNIQUE_ITEM_SALE_TITLE')
			})
			]
		});
		
		inner.on('paramsChange', (params) => {
			
			let saleId = params.saleId;
			
			DPlayTradingPostContract.getUniqueItemSaleInfo(saleId, (seller, itemAddresses, itemIds, price, description, createTime) => {
				
				content.append(DIV({
					style : {
						padding : 20
					},
					c : [DIV({
						c : saleId
					}), DIV({
						c : seller
					}), DIV({
						c : itemAddresses
					}), DIV({
						c : itemIds
					}), DIV({
						c : price
					}), DIV({
						c : description
					}), DIV({
						c : createTime
					}), DIV({
						style : {
							marginTop : 20
						},
						c : [A({
							c : MSG('BUY_BUTTON'),
							on : {
								tap : () => {
									
									TradingPost.Confirm({
										content : MSG('BUY_UNIQUE_ITEM_SALE_CONFIRM')
									}, () => {
										
										DPlayTradingPostContract.buyUniqueItem(saleId, () => {
											REFRESH();
										});
									});
								}
							}
						}), A({
							style : {
								marginLeft : 10
							},
							c : MSG('UPDATE_SALE_DESCRIPTION_BUTTON'),
							on : {
								tap : () => {
									
									TradingPost.Prompt({
										content : MSG('UPDATE_SALE_DESCRIPTION_PROMPT'),
										value : description
									}, (newDescription) => {
										
										DPlayTradingPostContract.updateUniqueItemSaleDescription({
											saleId : saleId,
											description : newDescription
										}, () => {
											REFRESH();
										});
									});
								}
							}
						}), A({
							style : {
								marginLeft : 10
							},
							c : MSG('CANCEL_SALE_BUTTON'),
							on : {
								tap : () => {
									
									TradingPost.Confirm({
										content : MSG('CANCEL_UNIQUE_ITEM_SALE_CONFIRM')
									}, () => {
										
										DPlayTradingPostContract.cancelUniqueItemSale(saleId, () => {
											REFRESH();
										});
									});
								}
							}
						})]
					})]
				}));
			});
		});
		
		TradingPost.Layout.setContent(content);
		
		inner.on('close', () => {
			content.remove();
		});
	}
});