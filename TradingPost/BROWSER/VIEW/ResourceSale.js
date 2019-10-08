TradingPost.ResourceSale = CLASS({

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
				c : MSG('RESOURCE_SALE_TITLE')
			})
			]
		});
		
		inner.on('paramsChange', (params) => {
			
			let saleId = params.saleId;
			
			DPlayTradingPostContract.getResourceSaleInfo(saleId, (seller, resourceAddress, resourceAmount, price, description, createTime) => {
				
				content.append(DIV({
					style : {
						padding : 20
					},
					c : [DIV({
						c : saleId
					}), DIV({
						c : seller
					}), DIV({
						c : resourceAddress
					}), DIV({
						c : resourceAmount
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
									
									TradingPost.Prompt({
										content : MSG('BUY_RESOURCE_SALE_PROMPT')
									}, (amount) => {
										
										DPlayTradingPostContract.buyResource({
											saleId : saleId,
											amount : amount
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
							c : MSG('UPDATE_SALE_DESCRIPTION_BUTTON'),
							on : {
								tap : () => {
									
									TradingPost.Prompt({
										content : MSG('UPDATE_SALE_DESCRIPTION_PROMPT'),
										value : description
									}, (newDescription) => {
										
										DPlayTradingPostContract.updateResourceSaleDescription({
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
										content : MSG('CANCEL_RESOURCE_SALE_CONFIRM')
									}, () => {
										
										DPlayTradingPostContract.cancelResourceSale(saleId, () => {
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