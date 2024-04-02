import { artifacts, ethers } from "hardhat";

const tokenName: string = "DTC";
const marketName: string = "Marketplace";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactories and Signers here.
  const NFT = await ethers.getContractFactory(tokenName);
  const Marketplace = await ethers.getContractFactory(marketName);
  // deploy contracts
  const nft = await NFT.deploy();
  const marketplace = await Marketplace.deploy(1);
  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(marketplace, marketName);
  saveFrontendFiles(nft, tokenName);
}

function saveFrontendFiles(contract: any, name: string) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../../Frontend/ContractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.target }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
