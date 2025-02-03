import {  Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/veriflux_backend/veriflux_backend.did.js';

const agent = new HttpAgent();
const verifluxActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID_VERIFLUX_BACKEND,
});

export { verifluxActor };