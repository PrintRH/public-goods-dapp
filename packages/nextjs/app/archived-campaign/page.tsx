"use client";

import ArchivedCards from "./components/ArchivedCards";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const ArchivedCampaign: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: campaigns, isLoading: isGetCampaignLoading } = useScaffoldContractRead({
    contractName: "Crowdfunding",
    functionName: "getCampaigns",
    watch: true,
  });

  const ownerCampaigns =
    campaigns?.filter(campaign => campaign.owner === connectedAddress && campaign.isArchived) || [];

  return (
    <div>
      <h1 className="text-center block text-2xl font-bold mt-[10px]">Archives </h1>
      <h2 className="block text-m text-center ">Total Archived Campaigns:({ownerCampaigns.length})</h2>
      {isGetCampaignLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <ArchivedCards campaigns={ownerCampaigns} ownerAddress={connectedAddress ?? ""} />
      )}
    </div>
  );
};

export default ArchivedCampaign;
