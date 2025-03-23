// src/pages/VerificationPage.js
import React, { useState } from "react";
// import axios from "axios";
import { verifluxActor } from "../../../agent.js";
import Navbar from "../components/Navbar.jsx";

function VerificationPage() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleChange = (e) => {
  //   // setHash(e.target.value);
  // };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!hash) {
      setError("Please enter a certificate hash");
      return;
    }
    setIsLoading(true) ;  
    setError(null);
    setResult(null);
    try {
      const response = await verifluxActor.verifyCertificate(hash);
      setResult(response);
    } catch (error) {
      alert("Verification failed:" + error.message);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex h-screen justify-center items-center bg-[url(/bg-issuance.jpg)]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Verify Certificate
          </h1>

          {/* // input field for certificate hash */}
          <div className="mb-6">
            <label
              htmlFor="hash"
              className="block text-sm font-medium text-gray-700"
            >
              Certificate Hash
            </label>
            <input
              type="text"
              id="hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="Enter certificate hash"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {/* verify button */}
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {isLoading ? "Verifying..." : "Verify Certificate"}
          </button>
          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {/* Verification Result */}
          {result && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-green-800 ">
                Verification Result:
              </h2>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gary-700">
                  <span>Issuer:</span> {result.issuer}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Recipient:</span> {result.recipient}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Program:</span> {result.program}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Status:</span> {result.status}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VerificationPage;
