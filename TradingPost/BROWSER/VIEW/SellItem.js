TradingPost.SellItem = CLASS({

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
				c : MSG('SELL_ITEM_TITLE')
			}),
			
			FORM({
				style : {
					backgroundColor : 'rgba(0, 0, 0, 0.5)',
					padding : 10
				},
				c : [
				
				itemList = DIV(),
				
				UUI.FULL_INPUT({
					name : 'price',
					placeholder : MSG('SELL_ITEM_PRICE_INPUT')
				}),
				
				UUI.FULL_TEXTAREA({
					name : 'description',
					placeholder : MSG('SELL_DESCRIPTION_INPUT')
				}),
				
				UUI.FULL_SUBMIT({
					style : {
						marginTop : 10
					},
					value : MSG('SELL_SUBMIT')
				})],
				
				on : {
					submit : (e, form) => {
						
						let data = form.getData();
						
						data.itemAddresses = [];
						data.itemAmounts = [];
						
						EACH(itemForms, (itemForm) => {
							
							let itemData = itemForm.getData();
							
							if (itemData.itemAddress.trim() !== '') {
								data.itemAddresses.push(itemData.itemAddress);
								data.itemAmounts.push(itemData.itemAmount);
							}
						});
						
						// 실제 가격 환산
						data.price = DPlayCoinContract.getActualPrice(data.price);
						
						DPlayTradingPostContract.sellItem(data, () => {
							
							console.log('DONE!');
						});
					}
				}
			})]
		});
		
		let itemForms = [];
		
		REPEAT(4, () => {
			
			let havingItemAmountPanel;
			
			let itemForm;
			itemList.append(itemForm = FORM({
				style : {
					padding : 10
				},
				c : [
				havingItemAmountPanel = P(),
				
				UUI.FULL_INPUT({
					name : 'itemAddress',
					placeholder : MSG('ITEM_CONTRACT_ADDRESS_INPUT'),
					on : {
						change : (e, input) => {
							
							DPlayInventory.getNetworkName((networkName) => {
								
								let addresses = {};
								addresses[networkName] = input.getValue();
								
								let erc20 = OBJECT({
									preset : () => {
										return DPlaySmartContract;
									},
									params : () => {
										return {
											abi : [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
											addresses : addresses
										};
									}
								});
								
								DPlayInventory.getAccountId((accountId) => {
									
									if (accountId !== undefined) {
										
										erc20.decimals((decimals) => {
											erc20.balanceOf(accountId, (balance) => {
												
												havingItemAmountPanel.empty();
												havingItemAmountPanel.append(MSG('HAVING_ITEM_AMOUNT') + ' : ' + balance);
											});
										});
									}
								});
							});
						}
					}
				}),
				
				UUI.FULL_INPUT({
					name : 'itemAmount',
					placeholder : MSG('SELL_ITEM_AMOUNT_INPUT')
				})]
			}));
			
			itemForms.push(itemForm);
		});
		
		TradingPost.Layout.setContent(content);
		
		inner.on('close', () => {
			content.remove();
		});
	}
});