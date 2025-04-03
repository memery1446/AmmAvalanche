require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337, // ✅ force it here
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337, // ✅ also here
    },
  },
};
