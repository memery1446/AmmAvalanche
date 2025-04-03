const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory('Token')

  // Deploy Token 1
  let dapp = await Token.deploy('Dapp Token', 'DAPP', '1000000')
  await dapp.deployed()
  console.log(`Dapp Token deployed to: ${dapp.address}\n`)

  // Deploy Token 2
  const usd = await Token.deploy('USD Token', 'USD', '1000000')
  await usd.deployed()
  console.log(`USD Token deployed to: ${usd.address}\n`)

  // Deploy AMM
  const AMM = await hre.ethers.getContractFactory('AMM')
  const amm = await AMM.deploy(dapp.address, usd.address)
  await amm.deployed()
  console.log(`AMM contract deployed to: ${amm.address}\n`)

  // Optional: Save addresses to config
  const fs = require('fs')
  const { chainId } = await hre.ethers.provider.getNetwork()

  const config = {
    [chainId]: {
      dapp: {
        address: dapp.address
      },
      usd: {
        address: usd.address
      },
      amm: {
        address: amm.address
      }
    }
  }

  fs.writeFileSync('src/config.json', JSON.stringify(config, null, 2))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
