export const profileABI =  [
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "productId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "merchant",
						"type": "address"
					}
				],
				"name": "ProductAdded",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "enum Marketplace.Role",
						"name": "role",
						"type": "uint8"
					}
				],
				"name": "UserCreated",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_imageUrl",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_price",
						"type": "uint256"
					}
				],
				"name": "addProduct",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					},
					{
						"internalType": "enum Marketplace.Role",
						"name": "_role",
						"type": "uint8"
					}
				],
				"name": "createUser",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getAllProducts",
				"outputs": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "description",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "imageUrl",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "merchant",
								"type": "address"
							}
						],
						"internalType": "struct Marketplace.Product[]",
						"name": "",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "_productId",
						"type": "uint256"
					}
				],
				"name": "getProduct",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getProductCount",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_merchantAddress",
						"type": "address"
					}
				],
				"name": "getProductsByMerchant",
				"outputs": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "description",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "imageUrl",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "merchant",
								"type": "address"
							}
						],
						"internalType": "struct Marketplace.Product[]",
						"name": "",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_userAddress",
						"type": "address"
					}
				],
				"name": "getUserByAddress",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					},
					{
						"internalType": "enum Marketplace.Role",
						"name": "",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "products",
				"outputs": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "merchant",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "users",
				"outputs": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "enum Marketplace.Role",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		]