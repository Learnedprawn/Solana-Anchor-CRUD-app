import { PublicKey } from "@solana/web3.js";

describe("pda", () => {
	//Find something else to do pg won't work
  const program = pg.program;
  const wallet = pg.wallet;
	const num = 1;
	

  const [messagePda, messageBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("message"), wallet.publicKey.toBuffer()],
    program.programId
  );
  it("Create Message Account", async () => {
    const message = "Hello, World!";
    const transactionSignature = await program.methods
      .create(message)
      .accounts({
        messageAccount: messagePda,
      })
      .rpc({ commitment: "confirmed" });

    const messageAccount = await program.account.messageAccount.fetch(
      messagePda,
      "confirmed"
    );

    console.log(JSON.stringify(messageAccount, null, 2));
    console.log(
      "Transaction Signature:",
      `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
  it("Update Message Account", async () => {
    const message = "Hello, Solana!";
    const transactionSignature = await program.methods
      .update(message)
      .accounts({
        messageAccount: messagePda,
      })
      .rpc({ commitment: "confirmed" });

    const messageAccount = await program.account.messageAccount.fetch(
      messagePda,
      "confirmed"
    );

    console.log(JSON.stringify(messageAccount, null, 2));
    console.log(
      "Transaction Signature:",
      `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
  it("Delete Message Account", async () => {
    const transactionSignature = await program.methods
      .delete()
      .accounts({
        messageAccount: messagePda,
      })
      .rpc({ commitment: "confirmed" });

    const messageAccount = await program.account.messageAccount.fetchNullable(
      messagePda,
      "confirmed"
    );

    console.log("Expect Null:", JSON.stringify(messageAccount, null, 2));
    console.log(
      "Transaction Signature:",
      `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
  });
});
