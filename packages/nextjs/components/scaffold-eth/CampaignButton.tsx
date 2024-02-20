import React from "react";

interface CampaignButtonProps {
  btnType: "button" | "submit" | "reset";
  title: string;
  handleClick?: () => void;
  styles: string;
}

const CampaignButton: React.FC<CampaignButtonProps> = ({ btnType, title, handleClick, styles }) => {
  return (
    <button type={btnType} className={styles} onClick={handleClick}>
      {title}
    </button>
  );
};

export default CampaignButton;
