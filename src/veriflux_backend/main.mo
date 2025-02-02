// Import required libraries
// import Debug "mo:base/Debug";
// import List "mo:base/List";
// import Nat32 "mo:base/Nat32";
// import Hash "mo:base/Hash";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import CertifiedData "mo:base/CertifiedData";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Sha256 "mo:sha2/Sha256";

// Define the actor

actor VerifluxChain {
    //define a list of authorized issuers
    private stable var authorizedIssuers : [Principal] = [Principal.fromText("4sxcy-uffsq-raca2-u5fdh-6u5tg-yz6bl-jgtns-eoctr-u6wen-svor7-xae")];
    private stable var adminPrincipal : Principal = Principal.fromText("4sxcy-uffsq-raca2-u5fdh-6u5tg-yz6bl-jgtns-eoctr-u6wen-svor7-xae");
    private var certificatesEntries : [(Text, Certificate)] = [];
    private var certificates = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);
    // private stable var isInitialized : Bool = false;

    system func preupgrade() {
        certificatesEntries := Iter.toArray(certificates.entries());
    };

    system func postupgrade() {
        certificates := HashMap.fromIter<Text, Certificate>(certificatesEntries.vals(), 10, Text.equal, Text.hash);
        certificatesEntries := [];
    };

    // Function to add an authorized issuer(should be called by admin)
    public shared (msg) func addAuthorizedIssuer(issuer : Principal) : async Text {
        // debug_show("Caller: " # Principal.toText(msg.caller));
        if (msg.caller != adminPrincipal) {
            return "Error: Only admin can add authorized issuers";
        };
        //check if the issuer is already in the list
        if (Array.find(authorizedIssuers, func(p : Principal) : Bool { p == issuer }) != null) {
            return "Error: Issuer already exists";
        };

        authorizedIssuers := Array.append(authorizedIssuers, [issuer]);
        Debug.print("New authorized issuer added: " # Principal.toText(issuer));
        return "New authorized issuer added successfully";
    };


    //function to add a new admin (should be called by the current admin)
 /*
   public shared(msg) func addAdmin(newAdmin : Principal) : async () {
        // After initialization, enforce normal authentication
        assert (msg.caller == adminPrincipal and Array.find(authorizedIssuers, func(p : Principal) : Bool { p == msg.caller }) != null);
        authorizedIssuers := Array.append(authorizedIssuers, [newAdmin]);
        Debug.print("New admin added: " # Principal.toText(newAdmin));
    
};
*/

public shared(msg) func addAdmin(newAdmin : Principal) : async Text {
    if (msg.caller != adminPrincipal and Array.find(authorizedIssuers, func(p : Principal) : Bool { p == msg.caller }) == null) {
        return "Error: Only admin or authorized issuers can add new admins";
    };
    authorizedIssuers := Array.append(authorizedIssuers, [newAdmin]);
    Debug.print("New admin added: " # Principal.toText(newAdmin));
    return "New admin added successfully";
};


    // Define a type to represent a certificate
    type Certificate = {
        issuer : Text;
        recipient : Text;
        program : Text;
        issuedAt : Int;
        hash : Text;
        status : Text;
    };

    // Storage for certificates (array of certificates)
    // stable var certificates : [Certificate] = [];

    //define the canister interface
    type Canister = actor {
        write : shared (Text, Blob) -> async { ok : Bool; error_message : Text };
    };
    // Create an instance of the canister
    // let canister : Canister = actor "bd3sg-teaaa-aaaaa-qaaba-cai" : Canister;

    // Function to issue a new certificate
    public shared (msg) func issueCertificate(recipient : Text, program : Text, issuedAt : Int) : async Text {
        assert (Array.find(authorizedIssuers, func(p : Principal) : Bool { p == msg.caller }) != null);

        let issuer =  Principal.toText(msg.caller);

        //generate the hash of the certificate
        let hashInput = issuer # recipient # program # Int.toText(issuedAt);
        let hashBlob = Text.encodeUtf8(hashInput);
        let hash = Sha256.fromBlob(#sha256, hashBlob);

        //convert hash to hexadecimal string
        let hashHex = blobToHex(hash);

        let cert : Certificate = {
            issuer = issuer;
            recipient = recipient;
            program = program;
            issuedAt = issuedAt;
            hash = hashHex;
            status = "Valid";
        };

        // Add certificate to the list
        certificates.put(hashHex, cert);
        // Update the certified data
        updateCertifiedData();
        // Upload the certificate to the canister
        // let filename = "certificate_" # hashHex;
        // let data = Text.encodeUtf8(debug_show(cert));
        // let uploadResult = await uploadFile(filename, data);
        return "Certificate issued successfully! Hash:" # hashHex # " " # hashHex;

    };

    //helper function to convert a blob to hexadecimal string
    private func blobToHex(blob : Blob) : Text {
         let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var result = "";
    for (byte in Blob.toArray(blob).vals()) {
        result #= hex[Nat8.toNat(byte) / 16] # hex[Nat8.toNat(byte) % 16];
    };
    result
    };

    // public func uploadFile(filename : Text, data : Blob) : async Text {
    //     //store the file in canister memory
    //     let result = await canister.write(filename, data);
    //     //check if if the write was successfull
    //     if (result.ok) {
    //         return "File uploaded successfully: " # result.error_message;
    //     } else {
    //         return "Error uploading file: " # result.error_message;
    //     };
    // };

    private func updateCertifiedData() {
        let certifiedData = to_candid (Iter.toArray(certificates.vals()));
        let digest = Sha256.Digest(#sha256);
        digest.writeBlob(certifiedData);
        CertifiedData.set(digest.sum());
    };
    // Function to verify a certificate by hash
    public query func verifyCertificate(hash : Text) : async {
        certificate : ?Certificate;
        certified : Bool;
    } {
        //    let cert = Array.find(certificates, func (c:Certificate) : Bool { c.hash == hash});
        {
            certificate = certificates.get(hash);
            certified = CertifiedData.getCertificate() != null;
        };
    };
    //call the updateCertifiedData function

    // Function to list all certificates
    public query func listCertificates() : async [Certificate] {
        return Iter.toArray(certificates.vals());
    };
};
