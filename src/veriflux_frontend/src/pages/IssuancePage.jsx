// src/pages/IssuancePage.js
import React, { useState } from "react";
// import axios from "axios";
import { verifluxActor } from "../../../agent.js";

// import {certificateService} from "../../services/apiService.tsx";


function IssuancePage() {
  const [formData, setFormData] = useState({
    issuer: "",
    recipient: "",
    program: "",
    issuedAt: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifluxActor.issueCertificate(
        formData.issuer,
        formData.recipient,
        formData.program,
        parseInt(new Date(formData.issuedAt).getTime() / 1000), // Convert date to seconds
  
      );
      alert("Certificate issued successfully: " + response);
    } catch (error) {
      alert("Issuance failed: " + error.message);
    }
  };
 

  return (
    <main className="flex h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Issue a New Certificate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Issuer:
            <input
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            Recipient:
            <input
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Issue Certificate
          </button>
        </form>
      </div>
    </main>
  );
}

export default IssuancePage;
