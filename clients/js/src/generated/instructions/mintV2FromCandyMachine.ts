/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  MetadataDelegateRole,
  findMasterEditionPda,
  findMetadataDelegateRecordPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  publicKey,
} from '@metaplex-foundation/umi';
import { findCandyMachineAuthorityPda } from '../../hooked';

// Accounts.
export type MintV2FromCandyMachineInstructionAccounts = {
  candyMachine: PublicKey;
  authorityPda?: PublicKey;
  mintAuthority: Signer;
  payer?: Signer;
  nftMint: PublicKey;
  nftMintAuthority: Signer;
  nftMetadata?: PublicKey;
  nftMasterEdition?: PublicKey;
  token?: PublicKey;
  tokenRecord?: PublicKey;
  collectionDelegateRecord?: PublicKey;
  collectionMint: PublicKey;
  collectionMetadata?: PublicKey;
  collectionMasterEdition?: PublicKey;
  collectionUpdateAuthority: PublicKey;
  tokenMetadataProgram?: PublicKey;
  splTokenProgram?: PublicKey;
  splAtaProgram?: PublicKey;
  systemProgram?: PublicKey;
  sysvarInstructions?: PublicKey;
  recentSlothashes?: PublicKey;
};

// Arguments.
export type MintV2FromCandyMachineInstructionData = {
  discriminator: Array<number>;
};

export type MintV2FromCandyMachineInstructionDataArgs = {};

export function getMintV2FromCandyMachineInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  MintV2FromCandyMachineInstructionDataArgs,
  MintV2FromCandyMachineInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    MintV2FromCandyMachineInstructionDataArgs,
    MintV2FromCandyMachineInstructionData,
    MintV2FromCandyMachineInstructionData
  >(
    s.struct<MintV2FromCandyMachineInstructionData>(
      [['discriminator', s.array(s.u8(), { size: 8 })]],
      { description: 'MintV2FromCandyMachineInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: [120, 121, 23, 146, 173, 110, 199, 205],
      } as MintV2FromCandyMachineInstructionData)
  ) as Serializer<
    MintV2FromCandyMachineInstructionDataArgs,
    MintV2FromCandyMachineInstructionData
  >;
}

// Instruction.
export function mintV2FromCandyMachine(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa' | 'payer'>,
  input: MintV2FromCandyMachineInstructionAccounts
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = context.programs.get(
    'mplCandyMachineCore'
  ).publicKey;

  // Resolved accounts.
  const candyMachineAccount = input.candyMachine;
  const authorityPdaAccount =
    input.authorityPda ??
    findCandyMachineAuthorityPda(context, {
      candyMachine: publicKey(candyMachineAccount),
    });
  const mintAuthorityAccount = input.mintAuthority;
  const payerAccount = input.payer ?? context.payer;
  const nftMintAccount = input.nftMint;
  const nftMintAuthorityAccount = input.nftMintAuthority;
  const nftMetadataAccount =
    input.nftMetadata ??
    findMetadataPda(context, { mint: publicKey(nftMintAccount) });
  const nftMasterEditionAccount =
    input.nftMasterEdition ??
    findMasterEditionPda(context, { mint: publicKey(nftMintAccount) });
  const tokenAccount = input.token;
  const tokenRecordAccount = input.tokenRecord;
  const collectionMintAccount = input.collectionMint;
  const collectionUpdateAuthorityAccount = input.collectionUpdateAuthority;
  const collectionDelegateRecordAccount =
    input.collectionDelegateRecord ??
    findMetadataDelegateRecordPda(context, {
      mint: publicKey(collectionMintAccount),
      delegateRole: MetadataDelegateRole.Collection,
      updateAuthority: publicKey(collectionUpdateAuthorityAccount),
      delegate: publicKey(authorityPdaAccount),
    });
  const collectionMetadataAccount =
    input.collectionMetadata ??
    findMetadataPda(context, { mint: publicKey(collectionMintAccount) });
  const collectionMasterEditionAccount =
    input.collectionMasterEdition ??
    findMasterEditionPda(context, { mint: publicKey(collectionMintAccount) });
  const tokenMetadataProgramAccount = input.tokenMetadataProgram ?? {
    ...context.programs.get('mplTokenMetadata').publicKey,
    isWritable: false,
  };
  const splTokenProgramAccount = input.splTokenProgram ?? {
    ...context.programs.get('splToken').publicKey,
    isWritable: false,
  };
  const splAtaProgramAccount = input.splAtaProgram;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const sysvarInstructionsAccount = input.sysvarInstructions;
  const recentSlothashesAccount =
    input.recentSlothashes ??
    publicKey('SysvarS1otHashes111111111111111111111111111');

  // Candy Machine.
  keys.push({
    pubkey: candyMachineAccount,
    isSigner: false,
    isWritable: isWritable(candyMachineAccount, true),
  });

  // Authority Pda.
  keys.push({
    pubkey: authorityPdaAccount,
    isSigner: false,
    isWritable: isWritable(authorityPdaAccount, true),
  });

  // Mint Authority.
  signers.push(mintAuthorityAccount);
  keys.push({
    pubkey: mintAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(mintAuthorityAccount, false),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Nft Mint.
  keys.push({
    pubkey: nftMintAccount,
    isSigner: false,
    isWritable: isWritable(nftMintAccount, true),
  });

  // Nft Mint Authority.
  signers.push(nftMintAuthorityAccount);
  keys.push({
    pubkey: nftMintAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(nftMintAuthorityAccount, false),
  });

  // Nft Metadata.
  keys.push({
    pubkey: nftMetadataAccount,
    isSigner: false,
    isWritable: isWritable(nftMetadataAccount, true),
  });

  // Nft Master Edition.
  keys.push({
    pubkey: nftMasterEditionAccount,
    isSigner: false,
    isWritable: isWritable(nftMasterEditionAccount, true),
  });

  // Token (optional).
  if (tokenAccount) {
    keys.push({
      pubkey: tokenAccount,
      isSigner: false,
      isWritable: isWritable(tokenAccount, true),
    });
  }

  // Token Record (optional).
  if (tokenRecordAccount) {
    keys.push({
      pubkey: tokenRecordAccount,
      isSigner: false,
      isWritable: isWritable(tokenRecordAccount, true),
    });
  }

  // Collection Delegate Record.
  keys.push({
    pubkey: collectionDelegateRecordAccount,
    isSigner: false,
    isWritable: isWritable(collectionDelegateRecordAccount, false),
  });

  // Collection Mint.
  keys.push({
    pubkey: collectionMintAccount,
    isSigner: false,
    isWritable: isWritable(collectionMintAccount, false),
  });

  // Collection Metadata.
  keys.push({
    pubkey: collectionMetadataAccount,
    isSigner: false,
    isWritable: isWritable(collectionMetadataAccount, true),
  });

  // Collection Master Edition.
  keys.push({
    pubkey: collectionMasterEditionAccount,
    isSigner: false,
    isWritable: isWritable(collectionMasterEditionAccount, false),
  });

  // Collection Update Authority.
  keys.push({
    pubkey: collectionUpdateAuthorityAccount,
    isSigner: false,
    isWritable: isWritable(collectionUpdateAuthorityAccount, false),
  });

  // Token Metadata Program.
  keys.push({
    pubkey: tokenMetadataProgramAccount,
    isSigner: false,
    isWritable: isWritable(tokenMetadataProgramAccount, false),
  });

  // Spl Token Program.
  keys.push({
    pubkey: splTokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(splTokenProgramAccount, false),
  });

  // Spl Ata Program (optional).
  if (splAtaProgramAccount) {
    keys.push({
      pubkey: splAtaProgramAccount,
      isSigner: false,
      isWritable: isWritable(splAtaProgramAccount, false),
    });
  }

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Sysvar Instructions (optional).
  if (sysvarInstructionsAccount) {
    keys.push({
      pubkey: sysvarInstructionsAccount,
      isSigner: false,
      isWritable: isWritable(sysvarInstructionsAccount, false),
    });
  }

  // Recent Slothashes.
  keys.push({
    pubkey: recentSlothashesAccount,
    isSigner: false,
    isWritable: isWritable(recentSlothashesAccount, false),
  });

  // Data.
  const data = getMintV2FromCandyMachineInstructionDataSerializer(
    context
  ).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
