export const idlFactory = ({ IDL }) => {
  const Content = IDL.Variant({
    'Text' : IDL.Text,
    'Image' : IDL.Vec(IDL.Nat8),
    'Video' : IDL.Nat,
  });
  const ProposalCall = IDL.Record({
    'content' : Content,
    'contest' : IDL.Nat,
    'votes' : IDL.Nat,
    'description' : IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Time = IDL.Int;
  const ContestCall = IDL.Record({ 'end' : Time, 'name' : IDL.Text });
  const Contest = IDL.Record({
    'id' : IDL.Nat,
    'end' : Time,
    'active' : IDL.Bool,
    'name' : IDL.Text,
    'completed' : IDL.Bool,
  });
  const Result_1 = IDL.Variant({ 'ok' : Contest, 'err' : IDL.Text });
  const ContestantResponse = IDL.Record({
    'id' : IDL.Nat,
    'votes' : IDL.Nat,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
    'votesWallet' : IDL.Principal,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Vec(Contest), 'err' : IDL.Text });
  const Contestant = IDL.Record({
    'id' : IDL.Nat,
    'content' : Content,
    'contest' : IDL.Nat,
    'owner' : IDL.Principal,
    'votes' : IDL.Nat,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
    'votesWallet' : IDL.Principal,
  });
  const Result_2 = IDL.Variant({ 'ok' : Contestant, 'err' : IDL.Text });
  const Admin = IDL.Bool;
  const Profile = IDL.Record({
    'lastProposal' : IDL.Opt(Time),
    'admin' : Admin,
    'proposalsCompleted' : IDL.Nat,
    'name' : IDL.Text,
    'badget' : IDL.Bool,
    'profilePic' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const ProposalProfile = IDL.Record({
    'name' : IDL.Text,
    'profilePic' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const SocialProfile = IDL.Record({
    'twitter' : IDL.Text,
    'instagram' : IDL.Text,
    'facebook' : IDL.Text,
    'telegram' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : SocialProfile, 'err' : IDL.Text });
  const UpdateProfile = IDL.Record({
    'name' : IDL.Text,
    'profilePic' : IDL.Vec(IDL.Nat8),
  });
  return IDL.Service({
    'addKisses' : IDL.Func([], [], ['oneway']),
    'addNewContestant' : IDL.Func([ProposalCall], [Result_5], []),
    'addProposalChunk' : IDL.Func([IDL.Nat, IDL.Vec(IDL.Nat8)], [Result_4], []),
    'addVote' : IDL.Func([IDL.Nat], [Result_4], []),
    'caller' : IDL.Func([], [IDL.Text], ['query']),
    'createContest' : IDL.Func([ContestCall], [IDL.Bool], []),
    'getActiveContest' : IDL.Func([], [Result_1], []),
    'getAllContestants' : IDL.Func(
        [],
        [IDL.Vec(ContestantResponse)],
        ['query'],
      ),
    'getAllContestantsByVotes' : IDL.Func(
        [],
        [IDL.Vec(ContestantResponse)],
        ['query'],
      ),
    'getAllUnactiveContests' : IDL.Func([], [Result_3], []),
    'getContent' : IDL.Func([IDL.Nat], [Content], ['query']),
    'getContestant' : IDL.Func([IDL.Nat], [Result_2], ['query']),
    'getKisses' : IDL.Func([], [IDL.Nat], ['query']),
    'getProfile' : IDL.Func([], [Profile], ['query']),
    'getProposalProfilePic' : IDL.Func(
        [IDL.Nat],
        [IDL.Opt(ProposalProfile)],
        ['query'],
      ),
    'getSocialProfile' : IDL.Func([], [Result], []),
    'getUpcomingContest' : IDL.Func([], [Result_1], []),
    'getWinner' : IDL.Func([], [ContestantResponse], ['query']),
    'history' : IDL.Func([], [IDL.Vec(Contest)], []),
    'makeAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'session' : IDL.Func([], [Profile], ['query']),
    'startActiveContest' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'stopActiveContest' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'toNat8' : IDL.Func([Content], [IDL.Vec(IDL.Nat8)], []),
    'updateProfile' : IDL.Func([UpdateProfile], [Profile], []),
    'updateSocialProfile' : IDL.Func([SocialProfile], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
