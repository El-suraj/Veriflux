import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
// import { Button } from "../ui";

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader_label text-light-3">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box ">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-meduim text-light-2 mb:2 mt:6">
            Drag Photo here
          </h3>
          <p className="text-light-4 small-regular mb:6"> SVG,PNG, JPEG</p>
          <button className="shad-button_dark_4">Select from computer</button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;