import { AccountSetAsfFlags } from "xrpl"

async function enableRippling({ wallet, client }: any) {
  const accountSet: AccountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: AccountSetAsfFlags.asfDefaultRipple,
  };

  const prepared = await client.autofill(accountSet);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log(result);
  console.log("Enable rippling tx: ", result.result.hash);

  return;
}

export default enableRippling;
