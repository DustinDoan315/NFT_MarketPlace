"use client";

declare var window: any;

import React, { useEffect } from "react";
import { HeaderComponent, WalletConnect, WalletInfo } from "@/components";
import MarketContract from "../../../contracts/MarketContract";

export default function InvestView() {
  const marketContract = new MarketContract();
  useEffect(() => {
    const getFeePercent = async () => {
      const data = await marketContract.getPriceItem(1);
    };
    getFeePercent();
  }, []);

  return <div>{/* <HeaderComponent /> */}</div>;
}
