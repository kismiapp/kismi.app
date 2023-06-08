import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Admin = boolean;
export type Content = { 'Text' : string } |
  { 'Image' : Uint8Array | number[] } |
  { 'Video' : bigint };
export interface Contest {
  'id' : bigint,
  'end' : Time,
  'active' : boolean,
  'name' : string,
  'completed' : boolean,
}
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
export type Result = { 'ok' : SocialProfile } |
  { 'err' : string };
export type Result_1 = { 'ok' : Contest } |
  { 'err' : string };
export type Result_2 = { 'ok' : Contestant } |
  { 'err' : string };
export type Result_3 = { 'ok' : Array<Contest> } |
  { 'err' : string };
export type Result_4 = { 'ok' : null } |
  { 'err' : string };
export type Result_5 = { 'ok' : bigint } |
  { 'err' : string };
export interface SocialProfile {
  'twitter' : string,
  'instagram' : string,
  'facebook' : string,
  'telegram' : string,
}
export type Time = bigint;
export interface UpdateProfile {
  'name' : string,
  'profilePic' : Uint8Array | number[],
}
export interface _SERVICE {
  'addKisses' : ActorMethod<[], undefined>,
  'addNewContestant' : ActorMethod<[ProposalCall], Result_5>,
  'addProposalChunk' : ActorMethod<[bigint, Uint8Array | number[]], Result_4>,
  'addVote' : ActorMethod<[bigint], Result_4>,
  'caller' : ActorMethod<[], string>,
  'createContest' : ActorMethod<[ContestCall], boolean>,
  'getActiveContest' : ActorMethod<[], Result_1>,
  'getAllContestants' : ActorMethod<[], Array<ContestantResponse>>,
  'getAllContestantsByVotes' : ActorMethod<[], Array<ContestantResponse>>,
  'getAllUnactiveContests' : ActorMethod<[], Result_3>,
  'getContent' : ActorMethod<[bigint], Content>,
  'getContestant' : ActorMethod<[bigint], Result_2>,
  'getKisses' : ActorMethod<[], bigint>,
  'getProfile' : ActorMethod<[], Profile>,
  'getProposalProfilePic' : ActorMethod<[bigint], [] | [ProposalProfile]>,
  'getSocialProfile' : ActorMethod<[], Result>,
  'getUpcomingContest' : ActorMethod<[], Result_1>,
  'getWinner' : ActorMethod<[], ContestantResponse>,
  'history' : ActorMethod<[], Array<Contest>>,
  'makeAdmin' : ActorMethod<[string, string], string>,
  'session' : ActorMethod<[], Profile>,
  'startActiveContest' : ActorMethod<[bigint], boolean>,
  'stopActiveContest' : ActorMethod<[bigint], boolean>,
  'toNat8' : ActorMethod<[Content], Uint8Array | number[]>,
  'updateProfile' : ActorMethod<[UpdateProfile], Profile>,
  'updateSocialProfile' : ActorMethod<[SocialProfile], Result>,
}
