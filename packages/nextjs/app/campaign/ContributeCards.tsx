import React, { MouseEventHandler } from "react";
import { CampaignProgressBar } from "~~/components/scaffold-eth";
import { formatEther } from "viem";
import DonateButton from "~~/components/scaffold-eth/DonateButton";
import { daysLeft } from "~~/utils/scaffold-eth";

export interface Campaign {
  title: string;
  description: string;
  image: string;
  raised: bigint;
  goal: bigint;
  deadline: bigint;
  owner: string;
  id: bigint;
}

interface ContributeCardProps {
  campaign: Campaign;
  handleDonate: MouseEventHandler<HTMLButtonElement>;
  handleShare: (campaign: Campaign) => void; //new
}

const ContributeCard: React.FC<ContributeCardProps & { campaignId: bigint }> = ({
  campaign,
  handleShare,
  campaignId,
}) => {
  const remainingDays = daysLeft(new Date(Number(campaign.deadline) * 1000));
  const raised = Number(formatEther(campaign.raised as bigint)).toFixed(2);
  const goal = Number(formatEther(campaign.goal as bigint)).toFixed(2);
  const progress = (Number(raised) / Number(goal)) * 100;

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

      <button
        className="absolute bottom-2 left-5 w-1/2 h-1/12 bg-purple-600 text-white rounded-[10px] opacity-0 group-hover:opacity-75 transition-opacity duration-1000 flex items-center justify-center text-sm"
        onClick={() => handleShare(campaign)}
      >
        Share on Warpcast
      </button>

      <DonateButton
        campaignIndex={campaignId as bigint}
        btnType="submit"
        title="Donate"
        styles="absolute bottom-2 right-5 w-1/3 h-1/12 bg-blue-600 text-white  text-sm text-bold rounded-[10px] opacity-0 group-hover:opacity-75 transition-opacity duration-1000 flex items-center justify-center"
      />

      <div className="flex flex-col">
        <div className="block" style={{ height: "75px" }}>
          <p className="mt-[5px] text-slate-300 items-center text-center justify-center">{campaign.description}</p>
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
             <img src="/favicon.png" alt="buidlguidl" className="bg-white rounded-[10px]"/>
          </div>
          <p className="font-normal truncate">
            <span className="text-slate-500">{campaign.owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const ContributeCards: React.FC<{ campaigns: Campaign[] }> = ({ campaigns }) => {
  const handleDonate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleShare = (campaign: Campaign) => {
    const truncatedOwner = `${campaign.owner.slice(0, 2)}...${campaign.owner.slice(-4)}`;
    const text = `Owner (${truncatedOwner}) would like your help with their campaign: ${campaign.title}. Take a moment to hear their story.`;
    const url = "http://localhost:3000/campaign"; // Replace with your campaign link
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(
      url,
    )}`;

    window.open(warpcastUrl, "_blank");
  };

  return (
    <div className="flex flex-wrap justify-left">
      {campaigns &&
        campaigns.map(campaign => (
          <ContributeCard
            key={campaign.id.toString()}
            campaign={campaign}
            campaignId={campaign.id}
            handleDonate={event => handleDonate(event)}
            handleShare={handleShare}
          />
        ))}
    </div>
  );
};

export default ContributeCards;
