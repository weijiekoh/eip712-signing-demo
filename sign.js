function parseSignature(signature) {
  // Extract R, S, V
  var r = signature.substring(0, 64);
  var s = signature.substring(64, 128);
  var v = signature.substring(128, 130);

  // Return formatted values
  return {
    r: "0x" + r,
    s: "0x" + s,
    v: parseInt(v, 16),
  };
}

function genSolidityVerifier(signature, signer, chainId) {
  // Replace placeholders in solidity code and return
  return solidityCode
    .replace("<CHAINID>", chainId)
    .replace("<SIGR>", signature.r)
    .replace("<SIGS>", signature.s)
    .replace("<SIGV>", signature.v)
    .replace("<SIGNER>", signer);
}

async function getProvider() {
  // Get injected provider
  const provider = window.ethereum;

  // Throw if no provider
  if (provider == undefined) {
    alert("No Metamask");
    throw new Error("No Metamask");
  }

  // Trigger connect prompt by requesting accounts
  await provider.request({ method: "eth_requestAccounts" }).catch((error) => {
    // Alert
    alert(error.message);

    // Throw
    throw new Error(error.message);
  });

  // Return provider
  return provider;
}

async function sign() {
  // Get provider
  const provider = await getProvider();

  // Domain type
  const domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];

  // Identity type
  const identity = [
    { name: "userId", type: "uint256" },
    { name: "wallet", type: "address" },
  ];

  // Bid type
  const bid = [
    { name: "amount", type: "uint256" },
    { name: "bidder", type: "Identity" },
  ];

  // Get chain ID
  const chainId = parseInt(
    await provider.request({ method: "eth_chainId" }),
    10
  );

  // Domain data
  const domainData = {
    name: "My amazing dApp",
    version: "2",
    chainId: chainId,
    verifyingContract: "0x1C56346CD2A2Bf3202F771f50d3D14a367B48070",
    salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558",
  };

  // Message
  const message = {
    amount: 100,
    bidder: {
      userId: 323,
      wallet: "0x3333333333333333333333333333333333333333",
    },
  };

  // EIP712 data
  const data = JSON.stringify({
    types: {
      EIP712Domain: domain,
      Bid: bid,
      Identity: identity,
    },
    domain: domainData,
    primaryType: "Bid",
    message: message,
  });

  // Get signer address
  const signer = (await provider.request({ method: "eth_requestAccounts" }))[0];

  // Sign message
  const rawSignature = await provider
    .request({
      method: "eth_signTypedData_v3",
      params: [signer, data],
      from: signer,
    })
    .catch((error) => {
      // Alert
      alert(error.message);

      // Throw
      throw new Error(error.message);
    });

  // Parse signature
  const signature = parseSignature(rawSignature.substring(2));

  // Show response box
  const res = document.getElementById("response");
  res.style.display = "block";

  // Set value to generated solidity code
  res.value = genSolidityVerifier(signature, signer, chainId);
}

window.onload = () => {
  // Hide response box
  const res = document.getElementById("response");
  res.style.display = "none";

  // Bind sign function to sign button
  document.getElementById("signBtn").onclick = sign;
};
