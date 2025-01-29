import { Actor, HttpAgent, ActorSubclass } from "@dfinity/agent";
// import { idlFactory } from "../../declarations/veriflux_backend/veriflux_backend.did";
import { canisterId } from "../../declarations/veriflux_backend/index";

// Define the Certificates type
type Certificates = {
  hash: string;
  issuedAt: number;
  issuer: string;
  program: string;
  recipient: string;
  status: string;
};

//define the actor interface
interface VerifluxActor {
  issueCertificate: (
    hash: string,
    issuer: string,
    program: string,
    issuedAt: number,
    recipient: string
  ) => Promise<string>;
  listCertificates: () => Promise<Certificates[]>;
  uploadFile: (fileName: string, fileContent: Blob) => Promise<string>;
  verifyCertificate: (hash: string) => Promise<Certificates | null>;
}

//initilize the agent
const agent = new HttpAgent();
agent.fetchRootKey(); //required for local development

// Define a mock IDLFactory for actor creation
const idlFactory: any = {}; // Replace this with your IDL factory if needed

// Create the actor manually
const verifluxActor: ActorSubclass<VerifluxActor> = Actor.createActor(
  idlFactory,
  { agent, canisterId }
);

//api functions
export const certificateService = {
  issueCertificate: async (
    hash: string,
    issuer: string,
    program: string,
    issuedAt: number,
    recipient: string
  ): Promise<string> => {
    return await verifluxActor.issueCertificate(
      hash,
      issuer,
      program,
      issuedAt,
      recipient
    );
  },
  listCertificates: async (): Promise<Certificates[]> => {
    return await verifluxActor.listCertificates();
  },

  uploadFile: async (fileName: string, fileContent: Blob): Promise<string> => {
    return await verifluxActor.uploadFile(fileName, fileContent);
  },

  verifyCertificate: async (hash: string): Promise<Certificates | null> => {
    return await verifluxActor.verifyCertificate(hash);
  },
};

export { Certificates, VerifluxActor, /*certificateService*/ };

// export const issueCertificate = async (issuer, recipient, program, issuedAt, hash) => {
//   return await verifluxActor.issueCertificate(issuer, recipient, program, issuedAt, hash);
// };

// export const verifyCertificate = async (hash) => {
//   return await verifluxActor.verifyCertificate(hash);
// };
