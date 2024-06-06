import React, { useState, useRef } from "react";
import ProfilePhoto from "../../PhotoUpload";

const Steps3: React.FC = () => {
  const [bio, setBio] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  return (
    <div className="my-4">
      <ProfilePhoto
        inputRef={fileInputRef}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        preview={preview}
        setPreview={setPreview}
      />
      <div className="status_box my-7">
        <label className="block text-dark_text_2 text-sm font-bold mb-2">
          Write Your Bio
        </label>
        <input
          value={bio}
          onChange={handleBioChange}
          type="text"
          className="shadow appearance-none border-1 rounded-[05px] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:border-blue-500 border border-dark_bg_5"
        />
      </div>
    </div>
  );
};

export default Steps3;
