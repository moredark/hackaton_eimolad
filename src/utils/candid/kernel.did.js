export default ({ IDL }) => {
  const TokenIdentifier__5 = IDL.Text;
  const AccountIdentifier__5 = IDL.Text;
  const User__4 = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier__5,
  });
  const BalanceRequest__4 = IDL.Record({
    'token' : TokenIdentifier__5,
    'user' : User__4,
  });
  const Balance__4 = IDL.Nat;
  const CommonError__1__4 = IDL.Variant({
    'InvalidToken' : TokenIdentifier__5,
    'Other' : IDL.Text,
  });
  const BalanceResponse__4 = IDL.Variant({
    'ok' : Balance__4,
    'err' : CommonError__1__4,
  });
  const TokenIdentifier__4 = IDL.Text;
  const AccountIdentifier__4 = IDL.Text;
  const User__3 = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier__4,
  });
  const BalanceRequest__3 = IDL.Record({
    'token' : TokenIdentifier__4,
    'user' : User__3,
  });
  const Balance__3 = IDL.Nat;
  const CommonError__1__3 = IDL.Variant({
    'InvalidToken' : TokenIdentifier__4,
    'Other' : IDL.Text,
  });
  const BalanceResponse__3 = IDL.Variant({
    'ok' : Balance__3,
    'err' : CommonError__1__3,
  });
  const TokenIdentifier__3 = IDL.Text;
  const AccountIdentifier__3 = IDL.Text;
  const User__2 = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier__3,
  });
  const BalanceRequest__2 = IDL.Record({
    'token' : TokenIdentifier__3,
    'user' : User__2,
  });
  const Balance__2 = IDL.Nat;
  const CommonError__1__2 = IDL.Variant({
    'InvalidToken' : TokenIdentifier__3,
    'Other' : IDL.Text,
  });
  const BalanceResponse__2 = IDL.Variant({
    'ok' : Balance__2,
    'err' : CommonError__1__2,
  });
  const TokenIdentifier__2 = IDL.Text;
  const AccountIdentifier__2 = IDL.Text;
  const User__1 = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier__2,
  });
  const BalanceRequest__1 = IDL.Record({
    'token' : TokenIdentifier__2,
    'user' : User__1,
  });
  const Balance__1 = IDL.Nat;
  const CommonError__1__1 = IDL.Variant({
    'InvalidToken' : TokenIdentifier__2,
    'Other' : IDL.Text,
  });
  const BalanceResponse__1 = IDL.Variant({
    'ok' : Balance__1,
    'err' : CommonError__1__1,
  });
  const AccountIdentifier__6 = IDL.Vec(IDL.Nat8);
  const AccountBalanceArgs = IDL.Record({ 'account' : AccountIdentifier__6 });
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const TokenIdentifier__1 = IDL.Text;
  const AccountIdentifier__1 = IDL.Text;
  const User = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier__1,
  });
  const BalanceRequest = IDL.Record({
    'token' : TokenIdentifier__1,
    'user' : User,
  });
  const Balance = IDL.Nat;
  const CommonError__1 = IDL.Variant({
    'InvalidToken' : TokenIdentifier__1,
    'Other' : IDL.Text,
  });
  const BalanceResponse = IDL.Variant({
    'ok' : Balance,
    'err' : CommonError__1,
  });
  const TokenIdentifier = IDL.Text;
  const AccountIdentifier = IDL.Text;
  const UserData = IDL.Record({
    'aid' : AccountIdentifier,
    'chainmail' : IDL.Text,
    'dialog_count' : IDL.Nat,
    'body' : IDL.Text,
    'head' : IDL.Text,
    'cloak' : IDL.Text,
    'name' : IDL.Text,
    'armbands' : IDL.Text,
    'experience' : IDL.Nat,
    'shoulder' : IDL.Text,
    'questStep' : IDL.Nat,
    'gloves' : IDL.Text,
    'boots' : IDL.Text,
    'charId' : TokenIdentifier,
    'pants' : IDL.Text,
    'recipe' : IDL.Text,
  });
  const CurrentEquipment = IDL.Vec(IDL.Nat8);
  const Rases = IDL.Text;
  const RarityRate = IDL.Float64;
  const CanisterIdentifier = IDL.Text;
  const TokenState = IDL.Text;
  const Weapons = IDL.Record({
    'weaponType' : IDL.Text,
    'ledgerCanister' : CanisterIdentifier,
    'state' : TokenState,
    'modelCanister' : CanisterIdentifier,
  });
  const CharactersMetadata = IDL.Record({
    'equipment' : CurrentEquipment,
    'rase' : Rases,
    'rarityRate' : RarityRate,
    'ledgerCanister' : CanisterIdentifier,
    'state' : TokenState,
    'position' : IDL.Vec(IDL.Float64),
    'modelCanister' : CanisterIdentifier,
    'weapon' : IDL.Opt(Weapons),
  });
  const UserName = IDL.Record({ 'tid' : TokenIdentifier, 'name' : IDL.Text });
  const SCharacter = IDL.Record({
    'tid' : TokenIdentifier,
    'canister' : CanisterIdentifier,
    'index' : IDL.Nat32,
  });
  const Time = IDL.Int;
  const SWeapon = IDL.Record({
    'tid' : TokenIdentifier,
    'canister' : CanisterIdentifier,
    'index' : IDL.Nat32,
  });
  const StakeAdit = IDL.Record({
    'aid' : AccountIdentifier,
    'character' : SCharacter,
    'lastClaimTime' : Time,
    'eAdit_amount' : IDL.Nat,
    'startStaketime' : Time,
    'weapon' : SWeapon,
  });
  const RankValue = IDL.Nat;
  const StakeCoal = IDL.Record({
    'aid' : AccountIdentifier,
    'rank' : RankValue,
    'eCoal_amount' : IDL.Nat,
    'lastClaimTime' : Time,
    'weapon_1' : SWeapon,
    'weapon_2' : SWeapon,
    'startStaketime' : Time,
  });
  const Stake = IDL.Record({
    'aid' : AccountIdentifier,
    'character' : SCharacter,
    'rank' : RankValue,
    'rarityRate' : IDL.Nat,
    'lastClaimTime' : Time,
    'eGold_amount' : IDL.Nat,
    'startStaketime' : Time,
    'weapon' : SWeapon,
  });
  const StakeOre = IDL.Record({
    'aid' : AccountIdentifier,
    'character' : SCharacter,
    'rank' : RankValue,
    'lastClaimTime' : Time,
    'startStaketime' : Time,
    'eOre_amount' : IDL.Nat,
    'weapon' : SWeapon,
  });
  const Collections = IDL.Variant({
    'weapons' : TokenIdentifier__1,
    'dwarves' : TokenIdentifier__1,
  });
  const TokenInfo = IDL.Variant({
    'weapons' : IDL.Opt(Weapons),
    'dwarves' : IDL.Opt(CharactersMetadata),
  });
  const TokenInfoRarity = IDL.Record({
    'tokenRarity' : IDL.Opt(IDL.Text),
    'tokenInfo' : TokenInfo,
  });
  const TokenRarity = IDL.Record({ 'tokenRarity' : IDL.Text });
  const CommonError = IDL.Variant({
    'InvalidToken' : TokenIdentifier,
    'Other' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Text, 'err' : CommonError });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Null });
  const Result_2 = IDL.Variant({ 'ok' : UserData, 'err' : CommonError });
  const Memo__4 = IDL.Vec(IDL.Nat8);
  const SubAccount__4 = IDL.Vec(IDL.Nat8);
  const TransferRequest__4 = IDL.Record({
    'to' : User__4,
    'token' : TokenIdentifier__5,
    'notify' : IDL.Bool,
    'from' : User__4,
    'memo' : Memo__4,
    'subaccount' : IDL.Opt(SubAccount__4),
    'amount' : Balance__4,
  });
  const TransferResponse__4 = IDL.Variant({
    'ok' : Balance__4,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier__5,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier__5,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier__5,
      'Other' : IDL.Text,
    }),
  });
  const Memo__3 = IDL.Vec(IDL.Nat8);
  const SubAccount__3 = IDL.Vec(IDL.Nat8);
  const TransferRequest__3 = IDL.Record({
    'to' : User__3,
    'token' : TokenIdentifier__4,
    'notify' : IDL.Bool,
    'from' : User__3,
    'memo' : Memo__3,
    'subaccount' : IDL.Opt(SubAccount__3),
    'amount' : Balance__3,
  });
  const TransferResponse__3 = IDL.Variant({
    'ok' : Balance__3,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier__4,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier__4,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier__4,
      'Other' : IDL.Text,
    }),
  });
  const Memo__2 = IDL.Vec(IDL.Nat8);
  const SubAccount__2 = IDL.Vec(IDL.Nat8);
  const TransferRequest__2 = IDL.Record({
    'to' : User__2,
    'token' : TokenIdentifier__3,
    'notify' : IDL.Bool,
    'from' : User__2,
    'memo' : Memo__2,
    'subaccount' : IDL.Opt(SubAccount__2),
    'amount' : Balance__2,
  });
  const TransferResponse__2 = IDL.Variant({
    'ok' : Balance__2,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier__3,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier__3,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier__3,
      'Other' : IDL.Text,
    }),
  });
  const Memo__1 = IDL.Vec(IDL.Nat8);
  const SubAccount__1 = IDL.Vec(IDL.Nat8);
  const TransferRequest__1 = IDL.Record({
    'to' : User__1,
    'token' : TokenIdentifier__2,
    'notify' : IDL.Bool,
    'from' : User__1,
    'memo' : Memo__1,
    'subaccount' : IDL.Opt(SubAccount__1),
    'amount' : Balance__1,
  });
  const TransferResponse__1 = IDL.Variant({
    'ok' : Balance__1,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier__2,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier__2,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier__2,
      'Other' : IDL.Text,
    }),
  });
  const Memo = IDL.Vec(IDL.Nat8);
  const SubAccount = IDL.Vec(IDL.Nat8);
  const TransferRequest = IDL.Record({
    'to' : User,
    'token' : TokenIdentifier__1,
    'notify' : IDL.Bool,
    'from' : User,
    'memo' : Memo,
    'subaccount' : IDL.Opt(SubAccount),
    'amount' : Balance,
  });
  const TransferResponse = IDL.Variant({
    'ok' : Balance,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier__1,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier__1,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier__1,
      'Other' : IDL.Text,
    }),
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'account_balance_Adit' : IDL.Func(
        [BalanceRequest__4],
        [BalanceResponse__4],
        [],
      ),
    'account_balance_eCoal' : IDL.Func(
        [BalanceRequest__3],
        [BalanceResponse__3],
        [],
      ),
    'account_balance_eGold' : IDL.Func(
        [BalanceRequest__2],
        [BalanceResponse__2],
        [],
      ),
    'account_balance_eOre' : IDL.Func(
        [BalanceRequest__1],
        [BalanceResponse__1],
        [],
      ),
    'account_balance_ic' : IDL.Func([AccountBalanceArgs], [Tokens], []),
    'account_balance_lgs' : IDL.Func([BalanceRequest], [BalanceResponse], []),
    'clearUserAccount' : IDL.Func([], [], []),
    'getAccount' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, UserData))],
        ['query'],
      ),
    'getCharacters' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, CharactersMetadata))],
        ['query'],
      ),
    'getSigned' : IDL.Func([TokenIdentifier], [IDL.Opt(UserName)], []),
    'getStakeAditFromAID' : IDL.Func([], [IDL.Vec(StakeAdit)], []),
    'getStakeCoalFromAID' : IDL.Func([], [IDL.Vec(StakeCoal)], []),
    'getStakeFromAID' : IDL.Func([], [IDL.Vec(Stake)], []),
    'getStakeOreFromAID' : IDL.Func([], [IDL.Vec(StakeOre)], []),
    'getStaked' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, Stake))],
        ['query'],
      ),
    'getStakedAdit' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, StakeAdit))],
        ['query'],
      ),
    'getStakedCoal' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, StakeCoal))],
        ['query'],
      ),
    'getStakedOre' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, StakeOre))],
        ['query'],
      ),
    'getTokenInfo' : IDL.Func([Collections], [TokenInfo], ['query']),
    'getTokenInfoRare' : IDL.Func([Collections], [TokenInfoRarity], ['query']),
    'getTokensRarity' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, TokenRarity))],
        ['query'],
      ),
    'getUnsigned' : IDL.Func([TokenIdentifier], [IDL.Opt(TokenIdentifier)], []),
    'getWeapons' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIdentifier, Weapons))],
        ['query'],
      ),
    'registryAcc' : IDL.Func([TokenIdentifier, IDL.Text], [Result_3], []),
    'saveProgress' : IDL.Func([UserData], [Result_3], []),
    'sell' : IDL.Func([IDL.Vec(TokenIdentifier)], [Result], []),
    'setStake' : IDL.Func([Stake], [], []),
    'setStakeAdit' : IDL.Func([StakeAdit], [], []),
    'setStakeCoal' : IDL.Func([StakeCoal], [], []),
    'setStakeOre' : IDL.Func([StakeOre], [], []),
    'startGame' : IDL.Func([TokenIdentifier], [Result_2], []),
    'textToNat' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'this_balance_eAdit' : IDL.Func([], [BalanceResponse__4], []),
    'this_balance_eCoal' : IDL.Func([], [BalanceResponse__3], []),
    'this_balance_eGold' : IDL.Func([], [BalanceResponse__2], []),
    'this_balance_eOre' : IDL.Func([], [BalanceResponse__1], []),
    'this_balance_ic' : IDL.Func([], [Tokens], []),
    'this_balance_lgs' : IDL.Func([], [BalanceResponse], []),
    'transferMany' : IDL.Func(
        [AccountIdentifier, IDL.Vec(TokenIdentifier)],
        [Result],
        [],
      ),
    'transfer_eAdit' : IDL.Func(
        [TransferRequest__4],
        [TransferResponse__4],
        [],
      ),
    'transfer_eCoal' : IDL.Func(
        [TransferRequest__3],
        [TransferResponse__3],
        [],
      ),
    'transfer_eGold' : IDL.Func(
        [TransferRequest__2],
        [TransferResponse__2],
        [],
      ),
    'transfer_eOre' : IDL.Func([TransferRequest__1], [TransferResponse__1], []),
    'transfer_lgs' : IDL.Func([TransferRequest], [TransferResponse], []),
    'transfer_tokens' : IDL.Func(
        [IDL.Text, AccountIdentifier, IDL.Nat],
        [Result_1],
        [],
      ),
    'unStake' : IDL.Func([TokenIdentifier], [], []),
    'unStakeAdit' : IDL.Func([TokenIdentifier], [], []),
    'unStakeCoal' : IDL.Func([TokenIdentifier], [], []),
    'unStakeOre' : IDL.Func([TokenIdentifier], [], []),
    'unWrap' : IDL.Func([IDL.Vec(TokenIdentifier)], [Result], []),
    'updateCharacter' : IDL.Func([TokenIdentifier, CharactersMetadata], [], []),
    'updateTokenRarity' : IDL.Func([TokenIdentifier, TokenRarity], [], []),
    'updateWeapon' : IDL.Func([TokenIdentifier, Weapons], [], []),
    'wrap' : IDL.Func([IDL.Vec(TokenIdentifier)], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };