import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Admin = boolean;
export type Content = { 'Text' : string } |
  { 'Image' : Uint8Array | number[] } |
  { 'Video' : bigint };
export interface ContestCall { 'end' : Time, 'name' : string }
export interface Contestant {
  'id' : bigint,
  'content' : Content,
  'contest' : bigint,
  'owner' : Principal,
  'votes' : bigint,
  'completed' : boolean,
  'description' : string,
  'votesWallet' : Principal,
}
export interface ContestantResponse {
  'id' : bigint,
  'votes' : bigint,
  'completed' : boolean,
  'description' : string,
  'votesWallet' : Principal,
}
export interface Profile {
  'lastProposal' : [] | [Time],
  'admin' : Admin,
  'proposalsCompleted' : bigint,
  'name' : string,
  'badget' : boolean,
  'profilePic' : [] | [Uint8Array | number[]],
}
export interface ProposalCall {
  'content' : Content,
  'contest' : bigint,
  'votes' : bigint,
  'description' : string,
}
export interface ProposalProfile {
  'name' : string,
  'profilePic' : [] | [Uint8Array | number[]],
}
export type Result = { 'ok' : Contestant } |
  { 'err' : string };
export type Result_1 = { 'ok' : null } |
  { 'err' : string };
export type Result_2 = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface UpdateProfile {
  'name' : string,
  'profilePic' : Uint8Array | number[],
}
export interface _SERVICE {
  'addKisses' : ActorMethod<[], undefined>,
  'addNewContestant' : ActorMethod<[ProposalCall], Result_2>,
  'addProposalChunk' : ActorMethod<[bigint, Uint8Array | number[]], Result_1>,
  'addVote' : ActorMethod<[bigint], Result_1>,
  'caller' : ActorMethod<[], string>,
  'createContest' : ActorMethod<[ContestCall], boolean>,
  'getActiveContest' : ActorMethod<[], Time>,
  'getAllContestants' : ActorMethod<[], Array<ContestantResponse>>,
  'getAllContestantsByVotes' : ActorMethod<[], Array<ContestantResponse>>,
  'getContent' : ActorMethod<[bigint], Content>,
  'getContestant' : ActorMethod<[bigint], Result>,
  'getKisses' : ActorMethod<[], bigint>,
  'getProfile' : ActorMethod<[], Profile>,
  'getProposalProfilePic' : ActorMethod<[bigint], [] | [ProposalProfile]>,
  'makeAdmin' : ActorMethod<[string, string], string>,
  'session' : ActorMethod<[], Profile>,
  'toNat8' : ActorMethod<[Content], Uint8Array | number[]>,
  'updateProfile' : ActorMethod<[UpdateProfile], Profile>,
}
