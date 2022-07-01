export default ({ IDL }) => {
    const TokenIdentifier = IDL.Text;
    const SubAccount = IDL.Vec(IDL.Nat8);
    const Balance = IDL.Nat;
    const ApproveRequest = IDL.Record({
      'token' : TokenIdentifier,
      'subaccount' : IDL.Opt(SubAccount),
      'allowance' : Balance,
      'spender' : IDL.Principal,
    });
    const AccountIdentifier = IDL.Text;
    const User = IDL.Variant({
      'principal' : IDL.Principal,
      'address' : AccountIdentifier,
    });
    const BalanceRequest = IDL.Record({
      'token' : TokenIdentifier,
      'user' : User,
    });
    const CommonError__1 = IDL.Variant({
      'InvalidToken' : TokenIdentifier,
      'Other' : IDL.Text,
    });
    const BalanceResponse = IDL.Variant({
      'ok' : Balance,
      'err' : CommonError__1,
    });
    const Extension = IDL.Text;
    const TokenIdentifier__1 = IDL.Text;
    const Metadata = IDL.Variant({
      'fungible' : IDL.Record({
        'decimals' : IDL.Nat8,
        'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)),
        'name' : IDL.Text,
        'symbol' : IDL.Text,
      }),
      'nonfungible' : IDL.Record({ 'metadata' : IDL.Opt(IDL.Vec(IDL.Nat8)) }),
    });
    const CommonError = IDL.Variant({
      'InvalidToken' : TokenIdentifier,
      'Other' : IDL.Text,
    });
    const Result_1 = IDL.Variant({ 'ok' : Metadata, 'err' : CommonError });
    const Balance__1 = IDL.Nat;
    const Result = IDL.Variant({ 'ok' : Balance__1, 'err' : CommonError });
    const Memo = IDL.Vec(IDL.Nat8);
    const TransferRequest = IDL.Record({
      'to' : User,
      'token' : TokenIdentifier,
      'notify' : IDL.Bool,
      'from' : User,
      'memo' : Memo,
      'subaccount' : IDL.Opt(SubAccount),
      'amount' : Balance,
    });
    const TransferResponse = IDL.Variant({
      'ok' : Balance,
      'err' : IDL.Variant({
        'CannotNotify' : AccountIdentifier,
        'InsufficientBalance' : IDL.Null,
        'InvalidToken' : TokenIdentifier,
        'Rejected' : IDL.Null,
        'Unauthorized' : AccountIdentifier,
        'Other' : IDL.Text,
      }),
    });
    return IDL.Service({
      'acceptCycles' : IDL.Func([], [], []),
      'approve' : IDL.Func([ApproveRequest], [], []),
      'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
      'balance' : IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
      'extensions' : IDL.Func([], [IDL.Vec(Extension)], ['query']),
      'metadata' : IDL.Func([TokenIdentifier__1], [Result_1], ['query']),
      'supply' : IDL.Func([TokenIdentifier__1], [Result], ['query']),
      'transfer' : IDL.Func([TransferRequest], [TransferResponse], []),
    });
  };
  export const init = ({ IDL }) => { return []; };