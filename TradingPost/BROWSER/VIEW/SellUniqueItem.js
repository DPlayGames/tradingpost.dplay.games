TradingPost.SellUniqueItem = CLASS({

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
				c : MSG('SELL_UNIQUE_ITEM_TITLE')
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
					placeholder : MSG('SELL_UNIQUE_ITEM_PRICE_INPUT')
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
						data.itemIds = [];
						
						EACH(itemForms, (itemForm) => {
							
							let itemData = itemForm.getData();
							
							if (itemData.itemAddress.trim() !== '') {
								data.itemAddresses.push(itemData.itemAddress);
								data.itemIds.push(itemData.itemId);
							}
						});
						
						// 실제 가격 환산
						data.price = DPlayCoinContract.getActualPrice(data.price);
						
						DPlayTradingPostContract.sellUniqueItem(data, () => {
							
							console.log('DONE!');
						});
					}
				}
			})]
		});
		
		let itemForms = [];
		
		REPEAT(4, () => {
			
			let checkItemPanel;
			
			let itemForm;
			itemList.append(itemForm = FORM({
				style : {
					padding : 10
				},
				c : [
				checkItemPanel = P(),
				
				UUI.FULL_INPUT({
					name : 'itemAddress',
					placeholder : MSG('UNIQUE_ITEM_CONTRACT_ADDRESS_INPUT')
				}),
				
				UUI.FULL_INPUT({
					name : 'itemId',
					placeholder : MSG('SELL_UNIQUE_ITEM_ID_INPUT'),
					on : {
						change : () => {
							
							let itemInfo = itemForm.getData();
							
							DPlayInventory.getNetworkName((networkName) => {
								
								let addresses = {};
								addresses[networkName] = itemInfo.itemAddress;
								
								let erc721 = OBJECT({
									preset : () => {
										return DPlaySmartContract;
									},
									params : () => {
										return {
											abi : [{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_approved","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_operator","type":"address"},{"indexed":false,"name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}],
											addresses : addresses
										};
									}
								});
								
								DPlayInventory.getAccountId((accountId) => {
									
									if (accountId !== undefined) {
										
										erc721.ownerOf(itemInfo.itemId, (owner) => {
											
											console.log(itemInfo, owner);
											
											checkItemPanel.empty();
											
											if (owner !== accountId) {
												checkItemPanel.append(MSG('NOT_HAVING_UNIQUE_ITEM_MESSAGE'));
											}
										});
									}
								});
							});
						}
					}
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