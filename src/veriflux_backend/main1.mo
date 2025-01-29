// // Import required libraries

// import Text "mo:base/Text";
// import Array "mo:base/Array";
// import Blob "mo:base/Blob";
// import List "mo:base/List";
// import Persistent "mo:base/Persistent";

// actor VerifluxChain {
//     //  private stable var files: List.List<(Text, Blob)> = List.nil();
//     // Define a type to represent a certificate
//     type Certificate = {
//         issuer: Text,
//         recipient: Text,
//         program: Text,
//         issuedAt: Int,
//         hash: Text,
//         status: Text,
//     };

//     // Storage for certificates (array of certificates)
//    var certificates : [Certificate] = []; {
//     init = Persistent.read_all(List.nil());
//     post = (v : [Certificate]) => Persistent.write_all(v);
//     };

//     public shared func uploadFile(filename: Text, data: Blob) : async Text {
//             files := List.push((filename, data), files);
//             return "file uploaded successfully"
//         };
       
//     // Function to issue a new certificate
//     public func issueCertificate(issuer: Text, recipient: Text, program: Text, issuedAt: Int, hash: Text) : async Text {
//         let cert: Certificate = {
//             issuer = issuer;
//             recipient = recipient;
//             program = program;
//             issuedAt = issuedAt;
//             hash = hash;
//             status = "Valid";
//         };
        


        
//         // Add certificate to the list
//         certificates := Array.append(certificates, [cert]);
        
//         return "Certificate issued successfully!";
//     };

//     // Function to verify a certificate by hash
//     public query func verifyCertificate(hash: Text) : async ?Certificate {
//         for (cert in certificates.vals()) {
//             if (cert.hash == hash) {
//                 return ?cert;
//             }
//         };
//         return null;
//     };

//     // Function to list all certificates
//     public query func listCertificates() : async [Certificate] {
//         return certificates;
//     };

//     // public func mintCertificate(issuer: Text, recipient: Text, program:Text, hash:Text ) : async Certificate {
//     //     let id = hash;
//     //     let issuedAt = Time.now();

//     //     let cert = Record {
//     //         id: id,
//     //         issuer: issuer,
//     //         recipient: recipient,
//     //         issuedAt: issuedAt,
//     //         program: program
//     //     };

//     //     return cert;
//     // }
// }
