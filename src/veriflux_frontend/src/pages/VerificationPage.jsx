// // src/pages/VerificationPage.js
// import React, { useState } from "react";
// // import axios from "axios";
// import { certificateService } from "../../services/apiService.tsx";

// function VerificationPage() {
//   const [hash, setHash] = useState("");
//   const [result, setResult] = useState(null);

//   const handleChange = (e) => {
//     // setHash(e.target.value);
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await certificateService.verifyCertificate(hash);
//       setResult(response.data);
//     } catch (error) {
//       alert("Verification failed:" + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Verify Certificate</h2>
//       <form onSubmit={handleVerify}>
//         <label>
//           Certificate Hash:
//           <input type="text" value={hash} onChange={handleChange} required />
//         </label>
//         <button type="submit">Verify</button>
//       </form>
//       {result && (
//         <div>
//           <h3>Verification Result:</h3>
//           <p>Issuer: {result.issuer}</p>
//           <p>Recipient: {result.recipient}</p>
//           <p>Program: {result.program}</p>
//           <p>Status: {result.status}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerificationPage;
