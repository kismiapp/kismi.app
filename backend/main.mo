import AccountTransfer "./ic";
import Account "./account";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Prelude "mo:base/Prelude";
import Nat8 "mo:base/Nat8";
import NNS "nns";
import Nat64 "mo:base/Nat64";
import Int "mo:base/Int";
import Error "mo:base/Error";
import ManagementCanister "ica";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
import Order "mo:base/Order";
import Debug "mo:base/Debug";

actor kissmi {
  type ManagementCanister = ManagementCanister.ManagementCanister;
  type NNS = NNS.NNS;
  type Time = Int;
  type Account = Account.Account;
  type Video = TrieMap.TrieMap<Text, [Nat8]>;


  public type Subaccount = Blob;
  public type PrincipalArray = [Principal];

  public type Content = {
    #Text : Text;
    #Image : Blob;
    #Video : Nat
  };


  public type Admin = Bool;

  public type ProposalProfile = {
    profilePic : ?Blob;
    name : Text
  };

  public type Proof = {
    description : Text;
    content : Content
  };

  public type ProofMap = TrieMap.TrieMap<Text, Proof>;

  public type Contestant = {
    id : Nat;
    votes : Nat;
    description : Text;
    content : Content;
    votesWallet : Principal;
    completed : Bool;
    owner : Principal;
    contest : Nat
  };

  public type ContestantResponse = {
    id : Nat;
    votes : Nat;
    description : Text;
    votesWallet : Principal;
    completed : Bool
  };

  public type ProposalCall = {
    votes : Nat;
    description : Text;
    content : Content;
    contest : Nat
  };

  public type UpdateProfile = {
    name : Text;
    profilePic : Blob
  };

  public type ContestCall = {
    name : Text;
    end : Time
  };

  public type Contest = {
    name : Text;
    end : Time;
    id : Nat;
    active : Bool;
    completed:Bool;
  };

  public type SocialProfile = {
    instagram: Text;
    telegram: Text;
    facebook: Text;
    twitter: Text;
  };

  public type Profile = {
    name : Text;
    badget : Bool;
    proposalsCompleted : Nat;
    lastProposal : ?Time;
    profilePic : ?Blob;
    admin : Admin
  };

  let guestProfile : Profile = {
    name = "Kismi.app";
    badget = false;
    proposalsCompleted = 0;
    lastProposal = null;
    profilePic = null;
    admin = false
  };

  var ledger = TrieMap.TrieMap<Account.Account, Nat>(Account.accountsEqual, Account.accountsHash);
  var profiles = TrieMap.TrieMap<Account.Account, Profile>(Account.accountsEqual, Account.accountsHash);
  var contestants = TrieMap.TrieMap<Text, Contestant>(Text.equal, Text.hash);
  var contestLedger = TrieMap.TrieMap<Text, Contest>(Text.equal, Text.hash);
  var socialProfiles = TrieMap.TrieMap<Account, SocialProfile>(Account.accountsEqual, Account.accountsHash);



  public shared query (msg) func getProfile() : async Profile {
    let account : Account = {
      owner = msg.caller;
      subaccount = null
    };
    switch (profiles.get(account)) {
      case null { return guestProfile };
      case (?found) { return found }
    }
  };


 public shared (msg) func updateSocialProfile(profile : SocialProfile) : async Result.Result<SocialProfile,Text> {
    let account : Account = {
      owner = msg.caller;
      subaccount = null
    };
    switch (socialProfiles.get(account)) {
      case null {
        socialProfiles.put(account, profile);
        return #ok(profile)
      };
      case (?found) {
        socialProfiles.put(account, profile);
        return #ok(profile)
      }
    }
  };




   public shared (msg) func getSocialProfile() : async Result.Result<SocialProfile,Text> {
    let account : Account = {
      owner = msg.caller;
      subaccount = null
    };
    switch (socialProfiles.get(account)) {
      case null {
        return #err("no found")
      };
      case (?found) {
        return #ok(found)
      }
    }
  };

  public shared (msg) func updateProfile(profile : UpdateProfile) : async Profile {
    let account : Account = {
      owner = msg.caller;
      subaccount = null
    };
    switch (profiles.get(account)) {
      case null {
        let imgBlob : ?Blob = ?profile.profilePic;
        let newProfile : Profile = {
          name = profile.name;
          profilePic = imgBlob;
          badget = false;
          proposalsCompleted = 0;
          lastProposal = guestProfile.lastProposal;
          admin = false
        };
        profiles.put(account, newProfile);
        //_airDrop(account);
        return newProfile
      };
      case (?found) {
        let imgBlob : ?Blob = ?profile.profilePic;
        let newProfile : Profile = {
          name = profile.name;
          profilePic = imgBlob;
          badget = found.badget;
          proposalsCompleted = found.proposalsCompleted;
          lastProposal = found.lastProposal;
          admin = false
        };
        profiles.put(account, newProfile);
        return newProfile
      }
    }
  };

  public shared (msg) func makeAdmin(password : Text, principal : Text) : async Text {
    let setPassword : Text = "fhdsauf023a0sdf891-3457hfsad";
    let toMakeAdmin = Text.equal(password, setPassword);
    if (toMakeAdmin == true) {
      let account : Account = {
        owner = Principal.fromText(principal);
        subaccount = null
      };
      switch (profiles.get(account)) {
        case null {
          return "no found"
        };
        case (?found) {
          let newProfile : Profile = {
            name = found.name;
            profilePic = found.profilePic;
            badget = found.badget;
            proposalsCompleted = found.proposalsCompleted;
            lastProposal = found.lastProposal;
            admin = true
          };
          profiles.put(account, newProfile);
          return "found"
        }
      }
    };
    return "breaking switch"
  };

  public shared query func getProposalProfilePic(contestantId : Nat) : async ?ProposalProfile {
    switch (contestants.get(Nat.toText(contestantId))) {
      case null { return null };

      case (?found) {
        let account : Account = {
          owner = found.owner;
          subaccount = null
        };

        switch (profiles.get(account)) {
          case null { return null };
          case (?foundOwner) {
            let profile : ProposalProfile = {
              name = foundOwner.name;
              profilePic = foundOwner.profilePic
            };
            return ?profile
          }
        }
      }
    }
  };


  public shared (msg) func addProposalChunk(contestantId : Nat, chunks : Blob) : async Result.Result<(), Text> {
    let result = await getContestant(contestantId);
    if (Result.isOk(result)) {
      switch (Result.toOption(result)) {
        case null { return #err "not found" };
        case (?found) {
          let arrayFromProposal : [Nat8] = await toNat8(found.content);
          let bufferFromProposal : Buffer.Buffer<Nat8> = Buffer.Buffer<Nat8>(0);
          for (natInArray in arrayFromProposal.vals()) {
            bufferFromProposal.add(natInArray)
          };
          for (chunk in chunks.vals()) {
            bufferFromProposal.add(chunk)
          };
          let finalConentAsNat : [Nat8] = Buffer.toArray(bufferFromProposal);
          let finalBlob : Content = #Image(Blob.fromArray(finalConentAsNat));
          let proposalToUpdateWithChunks : Contestant = {
            id = found.id;
            votes = found.votes;
            description = found.description;
            content = finalBlob;
            completed = found.completed;
            votesWallet = found.votesWallet;
            owner = msg.caller;
            contest = found.contest
          };
          contestants.put(Nat.toText(contestantId), proposalToUpdateWithChunks);
          return #ok()
        }
      };

    } else {
      return #err " not found"
    }
  };

  public func toNat8(x : Content) : async [Nat8] {
    switch (x) {
      case (#Image content) { return Blob.toArray(content) };
      case (#Video content) { return [0] };
      case (#Text content) { return [0] }
    }
  };


  public shared query func getContestant(contestantId : Nat) : async Result.Result<Contestant, Text> {
    switch (contestants.get(Nat.toText(contestantId))) {
      case null { return #err "not found" };
      case (?contestantFound) { return #ok(contestantFound) }
    }
  };

  public shared (msg) func addKisses() {
    let newAccount : Account.Account = {
      owner = msg.caller;
      subaccount = null
    };
    //_airDrop(newAccount)
  };

  public shared (msg) func addVote(contestantId : Nat) : async Result.Result<(), Text> {
    switch (contestants.get(Nat.toText(contestantId))) {
      case null { #err "" };
      case (?found) {
        let newContestant : Contestant = {
          id = contestantId;
          votes = found.votes + 1;
          description = found.description;
          content = found.content;
          votesWallet = msg.caller;
          completed = false;
          owner = msg.caller;
          contest = found.contest
        };
        ignore contestants.replace(Nat.toText(contestantId), newContestant);
        return #ok()
      }
    }
  };

  public shared (msg) func addNewContestant(contestant : ProposalCall) : async Result.Result<Nat, Text> {
    let defaultSub : Account.Subaccount = _defaultSub();
    let account : Account = {
      owner = msg.caller;
      subaccount = ?defaultSub
    };
    let newid = contestants.size();
    let newContestant : Contestant = {
      id = newid;
      votes = contestant.votes;
      description = contestant.description;
      content = contestant.content;
      votesWallet = msg.caller;
      completed = false;
      owner = msg.caller;
      contest = contestant.contest;
    };
    switch (contestants.put(Nat.toText(newid), newContestant)) {
      case (added) {
        return #ok(newid)
      }
    };
    return #err("Couldn't add the contestant")
  };

  public shared query func getContent(contestantId : Nat) : async Content {
    switch (contestants.get(Nat.toText(contestantId))) {
      case null { return #Text("") };
      case (?contestantFound) { return contestantFound.content }
    }
  };

  public shared query func getAllContestants() : async [ContestantResponse] {
    let ContestantBuffer : Buffer.Buffer<ContestantResponse> = Buffer.Buffer<ContestantResponse>(0);
    for (value in contestants.vals()) {
      let contestantToResponse : ContestantResponse = {
        id = value.id;
        votes = value.votes;
        description = value.description;
        votesWallet = value.votesWallet;
        completed = value.completed
      };
      ContestantBuffer.add(contestantToResponse)
    };
    return Buffer.toArray(ContestantBuffer)
  };



  public shared query (msg) func caller() : async Text {
    return Principal.toText(msg.caller)
  };



  private func getBalance(account : Account.Account) : Nat {
    switch (ledger.get(account)) {
      case null { return 0 };
      case (?kisses) { return kisses }
    }
  };



  public shared query (msg) func getKisses() : async Nat {
    let account : Account = {
      owner = msg.caller;
      subaccount = null
    };
    switch (ledger.get(account)) {
      case null { return 0 };
      case (?kisses) { return kisses }
    }
  };


  public shared query (msg) func session() : async Profile {
    let defaultSub : Account.Subaccount = _defaultSub();
    let account : Account = {
      owner = msg.caller;
      subaccount = ?defaultSub
    };
    switch (profiles.get(account)) {
      case null { return guestProfile };
      case (?found) { return found }
    }
  };



  private func _defaultSub() : Subaccount {
    return Blob.fromArrayMut(Array.init(32, 0 : Nat8))
  };

  private func compareVotes(m1 : ContestantResponse, m2 : ContestantResponse) : Order.Order {
    switch (Int.compare(m1.votes, m2.votes)) {
      case (#greater) return #less;
      case (#less) return #greater;
      case (_) return #equal
    }
  };

  public shared query func getAllContestantsByVotes() : async [ContestantResponse] {
    let ContestantBuffer : Buffer.Buffer<ContestantResponse> = Buffer.Buffer<ContestantResponse>(0);
    for (value in contestants.vals()) {
      let contestantToResponse : ContestantResponse = {
        id = value.id;
        votes = value.votes;
        description = value.description;
        votesWallet = value.votesWallet;
        completed = value.completed
      };
      ContestantBuffer.add(contestantToResponse)
    };
    ContestantBuffer.sort(compareVotes);
    return Buffer.toArray(ContestantBuffer)
  };




    public shared query func getWinner() : async ContestantResponse {
    let ContestantBuffer : Buffer.Buffer<ContestantResponse> = Buffer.Buffer<ContestantResponse>(0);
    for (value in contestants.vals()) {
      let contestantToResponse : ContestantResponse = {
        id = value.id;
        votes = value.votes;
        description = value.description;
        votesWallet = value.votesWallet;
        completed = value.completed
      };
      ContestantBuffer.add(contestantToResponse)
    };
    ContestantBuffer.sort(compareVotes);
    return Buffer.first(ContestantBuffer)
  };






  public shared(msg) func getActiveContest():async Result.Result<Contest,Text> {
    for(value in contestLedger.vals()){
      let now:Time = Time.now();
      if(value.active == true){
          if(value.completed == false){
                return #ok(value);
          };
      };
    };
    return #err"no active contest"
  };





  private func restartVotes(){
    for(value in contestants.vals()){
    switch (contestants.get(Nat.toText(value.id))) {
      case null {  };
      case (?found) {
        let newContestant : Contestant = {
          id = value.id;
          votes = 0;
          description = found.description;
          content = found.content;
          votesWallet = found.votesWallet;
          completed = false;
          owner = found.owner;
          contest = found.contest
        };
        ignore contestants.replace(Nat.toText(value.id), newContestant);
      }
    }    };
  };


  public shared(msg) func stopActiveContest(contestid:Nat): async Bool {
       switch(contestLedger.get(Nat.toText(contestid))){
        case null { return false};
        case (?found) {
            let activating:Contest = {
                active = false;
                completed = true;
                id=found.id;
                name=found.name;
                end=found.end;
            };
            restartVotes();
            contestLedger.put(Nat.toText(contestid),activating);
            return true;
        }
      };
      return false;
  };



  public shared(msg) func startActiveContest(contestid:Nat): async Bool {
      switch(contestLedger.get(Nat.toText(contestid))){
        case null { return false};
        case (?found) {
            let activating:Contest = {
                active = true;
                completed = false;
                id=found.id;
                name=found.name;
                end=found.end;
            };
            contestLedger.put(Nat.toText(contestid),activating);
            return true;
        }
      };
      return false;
  };




  public shared(msg) func getUpcomingContest():async Result.Result<Contest,Text> {
    for(value in contestLedger.vals()){
      let now:Time = Time.now();
      if(value.active == false){
          if(value.completed == false){
              if(value.end > now){
                return #ok(value);
              };
          };
      };
    };
    return #err"no upcoming contest"
  };

   public shared(msg) func getAllUnactiveContests():async Result.Result<[Contest],Text> {
    let upcomingContests:Buffer.Buffer<Contest> = Buffer.Buffer<Contest>(0);
    for(value in contestLedger.vals()){
      let now:Time = Time.now();
      Debug.print(debug_show(now));
      Debug.print(debug_show(value.end));
      if(value.active == false){
          if(value.completed == false){
              if((value.end* 1_000_000) > now){
                  upcomingContests.add(value);
              };
          };
      };
    };
    return #ok(Buffer.toArray(upcomingContests));
  };



  public shared(msg) func history(): async[Contest]{
      let pastContests:Buffer.Buffer<Contest> = Buffer.Buffer<Contest>(0);
      for(value in contestLedger.vals()){
        if(value.completed == true){
          pastContests.add(value)
        };
      };
      return Buffer.toArray(pastContests);
  };





  public shared (msg) func createContest(contest : ContestCall) : async Bool {
    let account : Account = {
      owner = msg.caller;
      subaccount = null
    };
    let newid = contestLedger.size();
    let newContest : Contest = {
      active = false;
      end = contest.end;
      id = newid;
      name = contest.name;
      completed = false;
    };
    switch (profiles.get(account)) {
      case null { return false };
      case (?found) {
        if (found.admin == true) {
          contestLedger.put(Nat.toText(newid), newContest);
          return true
        };
        return false
      }
    }
  };

}
