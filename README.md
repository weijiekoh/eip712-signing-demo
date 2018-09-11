# EIP712 Signing Demo

This is a demonstration of EIP712 signing support via MetaMask's
`eth_signTypedData_v2` API call.

[Try it here](https://weijiekoh.github.io/eip712-signing-demo/index.html).

You need a version of MetaMask that supports eth_signTypedData_v2 to use this
demo. Prebuilt extensions can be downloaded from 
[metamaskbot](https://github.com/MetaMask/metamask-extension/pull/4803#issuecomment-420071748).

It includes copy-and-paste Solidity code that performs EIP712 hashing and
`ecrecover`y on-chain. 
