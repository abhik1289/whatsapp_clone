import React from "react";
import { MdAddAPhoto } from "react-icons/md";
interface ProfilePhotoProps {
  inputRef: React.RefObject<HTMLInputElement>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ProfilePhoto({
  inputRef,
  selectedFile,
  setSelectedFile,
  preview,
  setPreview,
}: ProfilePhotoProps) {
  function handleFileUpload() {
    if (inputRef.current) {
      inputRef.current?.click();
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  return (
    <div>
      <div className="image_show_box m-2">
        {selectedFile && (
          <div>
            {preview && (
              <img
                src={preview}
                alt="Selected"
                className="rounded-full"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </div>
        )}
      </div>
      <input
        onChange={handleFileChange}
        ref={inputRef}
        type="file"
        hidden
        name="file"
      />
      <div
        onClick={handleFileUpload}
        className="file_upload_btn flex gap-2 items-center font-font2 cursor-pointer bg-green_2 w-[150px] px-3 rounded-[15px] h-[40px]"
      >
        <MdAddAPhoto /> Upload File
      </div>
    </div>
  );
}
