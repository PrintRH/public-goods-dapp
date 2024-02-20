import React from "react";

type CampaignProgressBarProps = {
  progress: number;
};

export function CampaignProgressBar({ progress }: CampaignProgressBarProps) {
  return (
    <div
      style={{
        height: "20px",
        width: "100%",
        backgroundColor: "#808080",
        borderRadius: "50px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundImage:
            "linear-gradient(45deg, #00FF00 25%, transparent 25%, transparent 50%, #00FF00 50%, #808080 75%, transparent 75%, transparent)",
          backgroundSize: "40px 40px",
          backgroundColor: "#00FF00",
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
