# EIP712 Signing Demo

This is a demonstration of EIP712 signing support via MetaMask's
`eth_signTypedData_v3` API call. It includes copy-and-paste
Solidity code that performs EIP712 hashing and `ecrecover`y on-chain.

[Try it here](https://weijiekoh.github.io/eip712-signing-demo/index.html).

Please use MetaMask [version 4.14.0](https://github.com/MetaMask/metamask-extension/releases/)
and above as earlier versions do not necessarily support `eth_signTypedData_v3`.
