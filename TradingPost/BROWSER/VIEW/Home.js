TradingPost.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let resourceSaleList;
		let itemSaleList;
		let uniqueItemSaleList;
		
		let content = DIV({
			style : {
				paddingTop : 110,
				margin : 'auto',
				width : 1000
			},
			
			c : [resourceSaleList = DIV({
				c : [MSG('RESOURCE_SALE_TAB_TITLE')]
			}), itemSaleList = DIV({
				style : {
					marginTop : 20
				},
				c : [MSG('ITEM_SALE_TAB_TITLE')]
			}), uniqueItemSaleList = DIV({
				style : {
					marginTop : 20
				},
				c : [MSG('UNIQUE_ITEM_SALE_TAB_TITLE')]
			})]
		}).appendTo(BODY);
		
		TradingPost.Layout.setContent(content);
		
		DPlayTradingPostContract.getResourceSaleCount((resourceSaleCount) => {
			
			REPEAT(resourceSaleCount, (saleId) => {
				
				DPlayTradingPostContract.getResourceSaleInfo(saleId, (seller, resourceAddress, resourceAmount, price, description, createTime) => {
					
					resourceSaleList.append(DIV({
						style : {
							padding : 20,
							cursor : 'pointer'
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
						})],
						on : {
							tap : () => {
								
								TradingPost.GO('resource/' + saleId);
							}
						}
					}));
				});
			});
		});
		
		DPlayTradingPostContract.getItemSaleCount((itemSaleCount) => {
			
			REPEAT(itemSaleCount, (saleId) => {
				
				DPlayTradingPostContract.getItemSaleInfo(saleId, (seller, itemAddresses, itemAmounts, price, description, createTime) => {
					
					itemSaleList.append(DIV({
						style : {
							padding : 20,
							cursor : 'pointer'
						},
						c : [DIV({
							c : saleId
						}), DIV({
							c : seller
						}), DIV({
							c : itemAddresses
						}), DIV({
							c : itemAmounts
						}), DIV({
							c : price
						}), DIV({
							c : description
						}), DIV({
							c : createTime
						})],
						on : {
							tap : () => {
								
								TradingPost.GO('item/' + saleId);
							}
						}
					}));
				});
			});
		});
		
		DPlayTradingPostContract.getUniqueItemSaleCount((uniqueItemSaleCount) => {
			
			REPEAT(uniqueItemSaleCount, (saleId) => {
				
				DPlayTradingPostContract.getUniqueItemSaleInfo(saleId, (seller, itemAddresses, itemIds, price, description, createTime) => {
					
					uniqueItemSaleList.append(DIV({
						style : {
							padding : 20,
							cursor : 'pointer'
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
						})],
						on : {
							tap : () => {
								
								TradingPost.GO('uniqueitem/' + saleId);
							}
						}
					}));
				});
			});
		});
		
		inner.on('close', () => {
			content.remove();
		});
	}
});