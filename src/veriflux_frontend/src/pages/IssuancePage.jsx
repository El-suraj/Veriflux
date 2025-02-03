// src/pages/IssuancePage.js
import React, { useState } from "react";
// import axios from "axios";
import { verifluxActor } from "../../../agent.js";
// import {certificateService} from "../../services/apiService.tsx";
imp

console.log("alert")

function IssuancePage() {
  const [formData, setFormData] = useState({
    issuer: "",
    recipient: "",
    program: "",
    issuedAt: "",
    hash: "",
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
        formData.hash
      );
      alert("Certificate issued successfully: " + response);
    } catch (error) {
      alert("Issuance failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-dark-100 text-white p-4">
      <h2>Issue a New Certificate</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Issuer:
          <input
            type="text"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Recipient:
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Program:
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Issued Date:
          <input
            type="date"
            name="issuedAt"
            value={formData.issuedAt}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Issue Certificate</button>
        
      </form>
    </div>
  );
}

export default IssuancePage;
