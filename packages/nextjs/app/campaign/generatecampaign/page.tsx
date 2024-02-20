"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import CampaignButton from "../../../components/scaffold-eth/CampaignButton";
import FormField from "../../../components/scaffold-eth/FormField";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import Upload from "~~/components/scaffold-eth/Upload";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CreateCampaign = () => {
  const router = useRouter();
  const { address: connectedAddress } = useAccount();

  // form below is an object
  const [form, setForm] = useState({
    title: "",
    description: "",
    amountRequested: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName: string, e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [fieldName]: e.currentTarget.value });
  };

  let bigIntTime;
  if (form.deadline) {
    const date = new Date(form.deadline);
    const timeInSeconds = Math.floor(date.getTime() / 1000);
    if (!isNaN(timeInSeconds)) {
      bigIntTime = BigInt(timeInSeconds);
    } else {
      console.error("Invalid date:", form.deadline);
    }
  }

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "createCampaign",
    args: [connectedAddress, form.title, form.description, parseEther(form.amountRequested), bigIntTime, form.image],
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const success = await writeAsync();
    console.log(form);
    if (success) {
      router.push("/campaign");
    }
  };

  const handleUpload = (fileOrLink: File | string) => {
    if (typeof fileOrLink === "string") {
      setForm({ ...form, image: fileOrLink });
    } else {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          setForm({ ...form, image: e.target.result as string });
        }
      };
      if (fileOrLink instanceof Blob) {
        // Check if fileOrLink is a Blob
        reader.readAsDataURL(fileOrLink);
      }
    }
  };

  const handleEtherInputChange = (newValue: string) => {
    setForm({ ...form, amountRequested: newValue });
  };

  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 bg-black ml-2 mr-2 mt-2">
      {isLoading && "Loader..."}
      <div className="flex justify-center items-center p-[16px] rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px]">🌟 Create Your Campaign! 🌟</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[10px] flex flex-col gap-[30px] ">
        <FormField
          labelName="Campaign Name *"
          placeholder="Public Goods Fundoorr"
          type="text"
          value={form.title}
          handleChange={e => handleFormFieldChange("title", e)}
          isTextArea={false}
        />
        <label className="font-medium text-[14px] leading-[22px]">
          Campaign Photo (Optional)
          <Upload onUpload={handleUpload} />
          {form.image && <img src={form.image} alt="campaign" />}
        </label>
        <FormField
          labelName="Campaign Description *"
          placeholder="Tell us your story"
          type="text"
          value={form.description}
          handleChange={e => handleFormFieldChange("description", e)}
          isTextArea={true}
        />
        <div className="flex gap-32">
          <div className="flex-1">
            <label className="font-medium text-[14px] leading-[22px]">Funds Needed* </label>
            <EtherInput
              placeholder="Input amount in ETH"
              value={form.amountRequested}
              onChange={handleEtherInputChange}
            />
          </div>
          <div className="flex-1">
            <FormField
              labelName="Campaign End Date *"
              placeholder="End Date"
              type="date"
              value={form.deadline}
              handleChange={e => handleFormFieldChange("deadline", e)}
              isTextArea={false}
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-[40px]">
          <CampaignButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071] rounded-[10px] transition duration-300 ease-in-out hover:bg-[#0f904f] text-center p-4"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
