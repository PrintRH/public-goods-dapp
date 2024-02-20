import React, { useState } from "react";
import Modal from "react-modal";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface DonateButtonProps {
  campaignIndex: bigint;
  btnType: string;
  title: string;
  styles: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({ campaignIndex, btnType, title, styles }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "contributeToCampaign",
    args: [campaignIndex],
    value: parseEther(donationAmount),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await writeAsync();
    setDonationAmount("");
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#030712",
      borderRadius: "4px",
      width: "250px",
      padding: "30px",
    },
  };

  return (
    <>
      <button type={btnType as "submit" | "button"} className={styles} onClick={() => setModalIsOpen(true)}>
        {title}
      </button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles} ariaHideApp={false}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input
            type="text"
            value={donationAmount}
            onChange={e => setDonationAmount(e.target.value)}
            placeholder="Amount in ETH"
            className="text-black focus:text-white h-8 rounded-[10px] text-center bg-[#6b7280]"
          />
          <button
            type="submit"
            className="bg-[#5b21b6] text-black px-2 py-2 mt-[15px] rounded-[10px] group-hover:opacity-75 flex items-center text-center justify-center"
          >
            Donate
          </button>
        </form>
      </Modal>
    </>
  );
};

export default DonateButton;
