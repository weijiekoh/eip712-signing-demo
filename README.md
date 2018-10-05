# EIP712 Signing Demo

This is a demonstration of EIP712 signing support via MetaMask's
`eth_signTypedData_v3` API call.

[Try it here](https://weijiekoh.github.io/eip712-signing-demo/index.html).

You need a version of MetaMask that supports eth_signTypedData_v3 to use this
demo.

Please use [version 4.10.0](https://github.com/MetaMask/metamask-extension/releases/tag/v4.10.0)
as at the time of writing, [version 4.13.0](https://github.com/MetaMask/metamask-extension/releases/tag/v4.13.0)
is a temporary revert to 4.11.1, which in turn does not support EIP712.

It includes copy-and-paste Solidity code that performs EIP712 hashing and
`ecrecover`y on-chain. 
