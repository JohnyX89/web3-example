import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { InfoItem } from "./AccountInfo.styled";
import { ButtonBlue } from "../ButtonBlue";
import { Headline } from "../Headline";

declare var window: any;

const AccountInfo = () => {
  const [dataAccount, setdataAccount] = useState({
    Address: "",
    Balance: "",
  });

  useEffect(() => {
    handleAccountInfo();
  });

  const handleAccountInfo = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: any) => getAccountInfo(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  const getAccountInfo = (address: string) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance: number) => {
        setdataAccount({
          Address: address,
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  return (
    <>
      {dataAccount.Address !== "" ? (
        <>
          <Headline>Metamask</Headline>
          <InfoItem> Account: {dataAccount.Address} </InfoItem>
          <InfoItem> Balance: {dataAccount.Balance} ETH </InfoItem>
        </>
      ) : (
        <ButtonBlue onClick={() => handleAccountInfo()}>
          Connect wallet
        </ButtonBlue>
      )}
    </>
  );
};

export default AccountInfo;
