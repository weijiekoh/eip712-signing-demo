function parseSignature(signature) {
  var r = signature.substring(0, 64);
  var s = signature.substring(64, 128);
  var v = signature.substring(128, 130);

  return {
      r: "0x" + r,
      s: "0x" + s,
      v: parseInt(v, 16)
  }
}

function genSolidityVerifier(signature, signer, chainId) {
	  
  return solidityCode
    .replace("<CHAINID>", chainId)
    .replace("<SIGR>", signature.r)
    .replace("<SIGS>", signature.s)
    .replace("<SIGV>", signature.v)
    .replace("<SIGNER>", signer);
}

window.onload = function (e) {
  var res = document.getElementById("response");
  res.style.display = "none";

  // force the user to unlock their MetaMask
  if (web3.eth.accounts[0] == null) {
    alert("Please unlock MetaMask first");
    // Trigger login request with MetaMask
    web3.currentProvider.enable().catch(alert)
  }

  var signBtn = document.getElementById("signBtn");
  signBtn.onclick = function(e) {
    if (web3.eth.accounts[0] == null) {
      return;
    }

    const domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
    ];

    const bid = [
      { name: "amount", type: "uint256" },
      { name: "bidder", type: "Identity" },
    ];

    const identity = [
      { name: "userId", type: "uint256" },
      { name: "wallet", type: "address" },
    ];

    const chainId = parseInt(web3.version.network, 10);
  
    const domainData = {
      name: "My amazing dApp",
      version: "2",
      chainId: chainId,
      verifyingContract: "0x1C56346CD2A2Bf3202F771f50d3D14a367B48070",
      salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558"
    };

    var message = {
      amount: 100,
      bidder: {
        userId: 323,
        wallet: "0x3333333333333333333333333333333333333333"
      }
    };
    
    const data = JSON.stringify({
      types: {
        EIP712Domain: domain,
        Bid: bid,
        Identity: identity,
      },
      domain: domainData,
      primaryType: "Bid",
      message: message
    });

    const signer = web3.toChecksumAddress(web3.eth.accounts[0]);

    web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData_v3",
        params: [signer, data],
        from: signer
      }, 
      function(err, result) {
        if (err || result.error) {
          return console.error(result);
        }

        const signature = parseSignature(result.result.substring(2));

        res.style.display = "block";
        res.value = genSolidityVerifier(signature, signer, chainId);
      }
    );
  };
}
