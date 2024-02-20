"use client"

import ContributeCards from "./ContributeCards";
import type { NextPage } from "next";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Campaign } from "./ContributeCards";

const Campaign: NextPage = () => {
  const title = "All Campaigns";

  const { data: campaigns, isLoading: isGetCampaignLoading } = useScaffoldContractRead({
    contractName: "Crowdfunding",
    functionName: "getCampaigns",
    watch: true,
  });

return (
    <div>
        <h1 className="text-center block text-2xl font-bold mt-[10px]">{title}</h1>
        <h2 className="block text-m text-center ">Total Campaigns: ({campaigns?.length ?? 0})</h2>
        <div>
            {isGetCampaignLoading ? (
                <span className="loading loading-spinner"></span>
            ) : campaigns?.length ?? 0 ? (
                <ContributeCards campaigns={campaigns as unknown as Campaign[]} />
            ) : (
                <p className="text-center block text-2xl font-bold mt-[100px]">There are no campaigns created yet</p>
            )}
        </div>
    </div>
);
};

export default Campaign;
