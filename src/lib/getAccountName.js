export default (identity) => {
  if (identity.accounts && identity.accounts.length > 0) {
    return identity.accounts[0].name;
  } else {
    throw Error('Account not found!');
  }
}