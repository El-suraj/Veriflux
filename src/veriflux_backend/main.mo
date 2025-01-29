// Import required libraries
import Text "mo:base/Text";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import List "mo:base/List";
import Principal "mo:base/Principal";
import CertifiedData "mo:base/CertifiedData";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Sha256 "mo:sha2/Sha256";
import Debug "mo:base/Debug";
// Define the actor

actor VerifluxChain {
    //define a list of authorized issuers
    private stable var authorizedIssuers : [Principal] = [];
    private let certificates = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);

    // Function to add an authorized issuer(should be called by admin)
    public shared (msg) func addAuthorizedIssuer(issuer : Principal) : async () {
        // debug_show("Caller: " # Principal.toText(msg.caller));
        // assert (msg.caller == Principal.fromText("Veriflux-Chain"));
        authorizedIssuers := Array.append(authorizedIssuers, [issuer]);
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
    let canister : Canister = actor "b77ix-eeaaa-aaaaa-qaada-cai" : Canister;

    // Storage for files (list of tuples containing filename and data)
    // stable var files : List.List<(Text, Blob)> = List.nil();

    // system func preupgrade() {
    //     // No need to manually persist data, stable variables are automatically persisted
    // };

    // system func postupgrade() {
    //     // No need to manually read data, stable variables are automatically restored
    // };

    // Function to issue a new certificate
    public shared (msg) func issueCertificate(recipient : Text, program : Text, issuedAt : Int, hash : Text) : async Text {
        assert (Array.find(authorizedIssuers, func(p : Principal) : Bool { p == msg.caller }) != null);

        let cert : Certificate = {
            issuer = Principal.toText(msg.caller);
            recipient = recipient;
            program = program;
            issuedAt = issuedAt;
            hash = hash;
            status = "Valid";
        };

        // Add certificate to the list
        certificates.put(hash, cert);
        // Update the certified data
        updateCertifiedData();
        // Upload the certificate to the canister
        let filename = "certificate_" #hash;
        let data = Text.encodeUtf8(debug_show (cert));
        let uploadResult = await uploadFile(filename, data);
        return "Certificate issued successfully!" #uploadResult;

    };

    public func uploadFile(filename : Text, data : Blob) : async Text {
        //store the file in canister memory
        let result = await canister.write(filename, data);
        //check if if the write was successfull
        if (result.ok) {
            return "File uploaded successfully: " # result.error_message;
        } else {
            return "Error uploading file: " # result.error_message;
        };
    };

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
        Iter.toArray(certificates.vals());
    };
};
