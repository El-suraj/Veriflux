// src/pages/IssuancePage.js
import React, { useCallback, useState } from "react";

import { verifluxActor } from "../../../agent.js";
import FileUploader from "../components/FileUploader.jsx";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar.jsx";
// import {certificateService} from "../../services/apiService.tsx";

function IssuancePage() {
  const [formData, setFormData] = useState({
    issuer: "",
    recipient: "",
    program: "",
    issuedAt: "",
  });

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //input validatiion
    if (
      !formData.issuer ||
      !formData.recipient ||
      !formData.program ||
      !formData.issuedAt ||
      !file
    ) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const fileData = fileReader.result;
        //call the issueCertificate function from the agent.js
        const response = await verifluxActor.issueCertificate(
          formData.issuer,
          formData.recipient,
          formData.program,
          parseInt(new Date(formData.issuedAt).getTime() / 1000), // Convert date to seconds
          fileData //pass the file data
        );
        toast.success("Certificate issued successfully: " + response);
        setFormData({
          issuer: "",
          recipient: "",
          program: "",
          issuedAt: "",
        });
        setFile(null); //reset the file
      };
      fileReader.readAsDataURL(file); //read the file as data URL
    } catch (error) {
      toast.error("Issuance failed: " + error.message);
      console.error("error issuing certificate", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen justify-center items-center bg-[url(/bg-issuance.jpg)]">
      <div>
        <Navbar/>
      </div>
      <div className="container w-auto mx-auto p-4 items-center bg-blue-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Issue a New Certificate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Issuer:
            <input
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              required
              className="w-auto p-2 border rounded"
              placeholder="enter the issuer"
            />
          </label>
          <label className="block">
            Recipient:
            <input
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              required
              className="w-auto p-2 border rounded"
              placeholder="enter the recipient"
            />
          </label>
          <label className="block">
            Program:
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className="w-auto p-2 border rounded"
              placeholder="enter the program"
            />
          </label>
          <label className="block">
            Issued Date:
            <input
              type="date"
              name="issuedAt"
              value={formData.issuedAt}
              onChange={handleChange}
              required
              className="w-auto p-2 border rounded"
            />
          </label>
          <label className="block">
            Upload File (for NFT):
            {/* <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-auto p-2 border rounded"
            /> */}
            <FileUploader
              // fieldChange={field.onChange}
              mediaUrl={file?.imageUrl}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
          >
            Issue Certificate
          </button>
        </form>
      </div>
    </main>
  );
}

export default IssuancePage;
