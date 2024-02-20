import React, { ChangeEvent, useState } from "react";

interface UploadProps {
  onUpload: (file: File | string) => void;
}

const Upload: React.FC<UploadProps> = ({ onUpload }) => {
  const [link, setLink] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLink(e.target.value);
  };

  const handleLinkUpload = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default action
    e.stopPropagation(); // Stop event propagation
    onUpload(link);
  };

  return (
    <div className="flex gap-32">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Or paste a link"
          value={link}
          onChange={handleLinkChange}
          className="input focus-within:border-white focus:outline-white focus:text-white h-[2.2rem] min-h-[2.2rem] px-4 border bg-[#334155] w-full font-medium text-white rounded-[10px]"
        />
        <button onClick={handleLinkUpload} className="btn btn-primary rounded-[10px] mt-2 h-[2.0rem] min-h-[2.0rem]">
          Upload link
        </button>
      </div>
      <div className="flex-1">
        <input type="file" onChange={handleFileChange} className="opacity-50" />
      </div>
    </div>
  );
};

export default Upload;
