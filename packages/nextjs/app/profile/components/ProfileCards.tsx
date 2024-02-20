import React, { MouseEventHandler } from "react";
import { formatEther } from "viem";
import { CampaignProgressBar } from "~~/components/scaffold-eth";
import CampaignButton from "~~/components/scaffold-eth/CampaignButton";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { daysLeft } from "~~/utils/scaffold-eth";

interface Campaign {
  id: bigint;
  title: string;
  description: string;
  image: string;
  raised: bigint;
  goal: bigint;
  deadline: bigint;
  owner: string;
  isArchived: boolean;
}

interface ProfileCardsProps {
  campaign: Campaign;
  ownerAddress: string;
  handleClick: MouseEventHandler<HTMLDivElement>;
}

const ProfileCard: React.FC<ProfileCardsProps> = ({ campaign }) => {
  const remainingDays = daysLeft(new Date(Number(campaign.deadline) * 1000));
  const raised = Number(formatEther(campaign.raised as bigint)).toFixed(2);
  const goal = Number(formatEther(campaign.goal as bigint)).toFixed(2);
  const progress = (Number(raised) / Number(goal)) * 100;

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "withdrawFunds",
    args: [campaign.id],
  });

  const handleClaimFunds = async () => {
    if (isLoading) return;
    try {
      await writeAsync();
    } catch (error) {
      console.error("Error claiming funds", error);
    }
  };

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] mb-2 m-4 bg-black p-3 relative group overflow-hidden transform transition-transform duration-700 hover:scale-105"
      style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)" }}
    >
      <h1 className="text-center justify-center font-serif font-bold text-slate-300 truncate">{campaign.title}</h1>
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col">
        <div className="block" style={{ height: "75px" }}>
          <p className="mt-[5px]  text-slate-300 items-center text-center justify-center">{campaign.description}</p>
        </div>

        <div className="flex justify-between flex-1 mt-[15px] gap-2 w-full">
          <CampaignProgressBar progress={progress} />
        </div>
        <div className="flex flex-wrap ">
          <div className="w-1/2">
            <h2 className="mt-[2px] text-slate-300">{`${remainingDays} Days Left`}</h2>
          </div>
          <div className="w-1/2">
            <h2 className="text-right text-slate-300 mt-[2px]">{`${raised}/${goal} ETH`}</h2>
          </div>
        </div>

        <div className="flex items-center mb-[10px] gap-[10px]">
          <div className="w-[30px] h-[30px] flex justify-center items-center">
            <img src="/favicon.png" alt="buidlguidl" className="bg-white rounded-[10px]" />
          </div>
          <p className="font-normal truncate">
            <span className="text-slate-500">{campaign.owner}</span>
          </p>
        </div>
        <div className="flex justify-center items-center mt-[2px]">
          <CampaignButton
            btnType="submit"
            title="Claim Funds"
            styles="bg-[#1dc071] rounded-[10px] transition duration-300 ease-in-out hover:bg-[#0f904f] text-center p-2"
            handleClick={handleClaimFunds}
          />
        </div>
      </div>
    </div>
  );
};

const ProfileCards: React.FC<{ campaigns: Campaign[]; ownerAddress: string }> = ({ campaigns, ownerAddress }) => {
  const ownerCampaigns = campaigns.filter(campaign => campaign.owner === ownerAddress && !campaign.isArchived);

  return (
    <div className="flex flex-wrap justify-left">
      {ownerCampaigns &&
        ownerCampaigns.map((campaign, index) => (
          <ProfileCard
            key={index}
            campaign={campaign}
            handleClick={() => {
              console.log("Clicked!");
            }}
            ownerAddress={""}
          />
        ))}
    </div>
  );
};

export default ProfileCards;
