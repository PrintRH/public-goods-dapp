"use client";

import ProfileCards from "./components/ProfileCards";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Profile: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: campaigns, isLoading: isGetCampaignLoading } = useScaffoldContractRead({
    contractName: "Crowdfunding",
    functionName: "getCampaigns",
    watch: true,
  });

  const ownerCampaigns =
    campaigns?.filter(campaign => campaign.owner === connectedAddress && !campaign.isArchived) || [];

  return (
    <div>
      <h1 className="text-center block text-2xl font-bold mt-[10px]">Personal Campaigns</h1>
      <h2 className="block text-m text-center ">Total Personal Campaigns:({ownerCampaigns.length})</h2>
      {isGetCampaignLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <ProfileCards campaigns={ownerCampaigns} ownerAddress={connectedAddress ?? ""} />
      )}
    </div>
  );
};

export default Profile;
