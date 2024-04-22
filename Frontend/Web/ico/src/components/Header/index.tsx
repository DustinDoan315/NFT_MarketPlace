"use client";

declare var window: any;
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ethers } from "ethers";
import { setWalletInfo } from "@/redux/reducers/accounts/account.slice";
import WalletConnect from "../WalletConnect";
import WalletInfo from "../WalletInfo";
import Link from "next/link";

const { Header } = Layout;

const items1: MenuProps["items"] = ["Home", "investment"].map((key) => ({
  key,
  label:
    key === "Home" || key === "investment" ? (
      <Link href={`/${key === "Home" ? "" : key}`} key={key}>
        {key}
      </Link>
    ) : (
      key
    ),
}));
const HeaderComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const { wallet } = useAppSelector((state) => state.account);
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfAccountChanged = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum, undefined);
    try {
      const { ethereum } = window;
      ethereum.on("accountsChanged", (accounts: any) => {
        console.log("Account changed to:", accounts[0]);
        setCurrentAccount(accounts[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfAccountChanged();
  }, []);

  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum, undefined);
    if (window.ethereum) {
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      console.log("====================================");
      console.log(address);
      console.log("====================================");
      dispatch(
        setWalletInfo({
          address,
          bnb: Number.parseFloat(ethers.formatEther(balance)),
        })
      );
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["Home"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />

        {!wallet ? (
          <WalletConnect onClick={connectWallet} />
        ) : (
          <WalletInfo
            address={wallet?.address || ""}
            amount={wallet?.bnb || 0}
          />
        )}
      </Header>
    </Layout>
  );
};

export default HeaderComponent;