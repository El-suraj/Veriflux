import {  Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/veriflux_backend/veriflux_backend.did.js';

const host = process.env.DFX_NETWORK === "ic" ? "https://icp-api.io" : "http://localhost:4943";
const agent = new HttpAgent({ identity, host });
if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }
const verifluxActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID_VERIFLUX_BACKEND,
});

export { verifluxActor };