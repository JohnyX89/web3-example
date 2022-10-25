import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { InfoItem } from "../AccountInfo/AccountInfo.styled";
import { ButtonBlue } from "../ButtonBlue";
import { Headline } from "../Headline";

declare var window: any;

const ContractInfo = () => {
  const [supplyNFT, setSupplyNFT] = useState(Number);
  const [balanceNFT, setBalanceNFT] = useState(Number);
  const [addressNFT, setAddressNFT] = useState<string>("");
  const [tokenOwner, setTokenOwner] = useState<string>("");

  const [balance, setBalance] = useState<string>("");
  const [addressUTB, setAddressUTB] = useState<string>("");
  const [currentNumber, setCurrentNumber] = useState(Number);

  // let resolvedSigner: string | undefined;

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const contractNFT = new ethers.Contract(
    "0xcFeC956458cCcB78F10EC26AB14Df3706C531d56",
    [
      "function ownerOf(uint256 tokenId) view returns (address)",
      "function totalSupply() view returns(uint256)",
    ],
    provider
  );

  const contractUTB = new ethers.Contract(
    "0x49455B591A7C93d78b1d3C2dBc2CEDdef226261b",
    [
      "function totalSupply() view returns(uint256)",
      "function mint()",
      "function _baseURI() view returns (string)",
      "function getNumber() view returns (uint256)",
      "function multiply()",
    ],
    signer
  );

  const tokenID = 5;

  async function getSupplyAndBalanceNFT() {
    setAddressNFT(contractUTB.address);

    const supply = await contractNFT.totalSupply();
    setSupplyNFT(Number(supply - 1));

    const balance = await provider.getBalance(contractNFT.address);
    setBalanceNFT(Number(ethers.utils.formatEther(balance)));
  }

  async function getNftOwnerOf(id: number) {
    try {
      const tokenOwner = await contractNFT.ownerOf(id);
      console.log(tokenOwner);
      setTokenOwner(tokenOwner);
    } catch (e) {
      console.log(e);
    }
  }

  async function getUTBAddressAndBalance() {
    setAddressUTB(contractUTB.address);

    const balanceBN = await provider.getBalance(contractUTB.address);
    setBalance(ethers.utils.formatEther(balanceBN));
  }

  async function getNumber() {
    const number = await contractUTB.getNumber();
    setCurrentNumber(Number(number));
  }

  async function mulitplyNumber() {
    try {
      await contractUTB.multiply();
    } catch (e) {
      console.log(e);
    }
  }

  async function getURI() {
    try {
      const uri = await contractUTB._baseURI();
      console.log(uri);
    } catch (e) {
      console.log(e);
    }
  }

  async function updateURI() {
    try {
      await contractUTB.setBaseURI();
    } catch (e) {
      console.log(e);
    }
  }

  async function mint() {
    try {
      await contractUTB.mint().then(() => console.log(`minted`));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <hr />
      <Headline>Contract 01 - NFT collection</Headline>
      <ButtonBlue onClick={() => getSupplyAndBalanceNFT()}>
        Show NFT info
      </ButtonBlue>
      <InfoItem>Address: {addressNFT}</InfoItem>
      <InfoItem>Supply: {supplyNFT}</InfoItem>
      <InfoItem>Balance: {balanceNFT}</InfoItem>

      <ButtonBlue onClick={() => getNftOwnerOf(tokenID)}>
        Get NFT ownerOf
      </ButtonBlue>
      <InfoItem>
        Owner of token {tokenID}: {tokenOwner}
      </InfoItem>

      <hr />

      <Headline>Contract 02 - UTB</Headline>
      <ButtonBlue onClick={() => getUTBAddressAndBalance()}>
        Show UTB info
      </ButtonBlue>
      {addressUTB !== "" && <InfoItem>Address: {addressUTB}</InfoItem>}
      {balance !== "" && <InfoItem>Balance: {balance}</InfoItem>}
      <br />

      <ButtonBlue onClick={() => mint()}>Mint</ButtonBlue>
      <ButtonBlue onClick={() => getURI()}>Get URI</ButtonBlue>
      <ButtonBlue onClick={() => updateURI()}>Update</ButtonBlue>

      <br />

      <ButtonBlue onClick={() => getNumber()}>Show current number</ButtonBlue>
      <ButtonBlue onClick={() => mulitplyNumber()}>
        Multiply current number
      </ButtonBlue>
      {currentNumber !== undefined && (
        <>
          <InfoItem>Current number: {currentNumber}</InfoItem>
        </>
      )}
    </>
  );
};

export default ContractInfo;
