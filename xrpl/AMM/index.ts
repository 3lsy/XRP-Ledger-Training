import { Client, Wallet, xrplToDrops } from "xrpl";
import enableRippling from "./enableRippling";
import createToken from "./createToken";
import createAMM from "./createAMM";

const client = new Client("wss://s.altnet.rippletest.net:51233");

//const issuerSeed = "sEd73ZzmWFvyomWZxigP5WBPNq7Vmhw";
const issuerSeed = "sEd7vUi3mVe1aNyEanCPzgGCHxM11Dr"
const receiverSeed = "sEdTUaxWshKEoZb5MhAR3AtBZT3Tm5T";

const issuer = Wallet.fromSeed(issuerSeed);
const receiver = Wallet.fromSeed(receiverSeed);
console.log(receiver);

function convertStringToHexPadded(str: string): string {
  // Convert string to hexadecimal
  let hex: string = "";
  for (let i = 0; i < str.length; i++) {
    const hexChar: string = str.charCodeAt(i).toString(16);
    hex += hexChar;
  }

  // Pad with zeros to ensure it's 40 characters long
  const paddedHex: string = hex.padEnd(40, "0");
  return paddedHex.toUpperCase(); // Typically, hex is handled in uppercase
}

const main = async () => {
  console.log("starting the show...");
  await client.connect();

  console.log({
    balanceIssuer: await client.getBalances(issuer.classicAddress),
    balanceReceiver: await client.getBalances(receiver.classicAddress),
  })

  console.log({
    [issuer.classicAddress]: await client.getBalances(issuer.classicAddress),
    [receiver.classicAddress]: await client.getBalances(receiver.classicAddress),
  })

  // enable rippling
  await enableRippling({ wallet: issuer, client });
  //create token
    await createToken({
      issuer,
      receiver,
      client,
      tokenCode: convertStringToHexPadded("Andre"),
  });
  // create AMM
  await createAMM({
    issuer,
    receiver,
    client,
    tokenCode: convertStringToHexPadded("Andre")
  })
  
  await client.disconnect()
  console.log("done");
};

main();


