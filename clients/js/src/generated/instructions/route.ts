/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  Option,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findCandyGuardPda } from '../../hooked';
import { GuardType, GuardTypeArgs, getGuardTypeSerializer } from '../types';

// Accounts.
export type RouteInstructionAccounts = {
  candyGuard?: PublicKey;
  candyMachine: PublicKey;
  payer?: Signer;
};

// Arguments.
export type RouteInstructionData = {
  discriminator: Array<number>;
  /** The target guard type. */
  guard: GuardType;
  /** Arguments for the guard instruction. */
  data: Uint8Array;
  group: Option<string>;
};

export type RouteInstructionDataArgs = {
  /** The target guard type. */
  guard: GuardTypeArgs;
  /** Arguments for the guard instruction. */
  data: Uint8Array;
  group: Option<string>;
};

export function getRouteInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<RouteInstructionDataArgs, RouteInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    RouteInstructionDataArgs,
    RouteInstructionData,
    RouteInstructionData
  >(
    s.struct<RouteInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['guard', getGuardTypeSerializer(context)],
        ['data', s.bytes()],
        ['group', s.option(s.string())],
      ],
      { description: 'RouteInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: [229, 23, 203, 151, 122, 227, 173, 42],
      } as RouteInstructionData)
  ) as Serializer<RouteInstructionDataArgs, RouteInstructionData>;
}

// Instruction.
export function route(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa' | 'payer'>,
  input: RouteInstructionAccounts & RouteInstructionDataArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );

  // Resolved accounts.
  const candyMachineAccount = input.candyMachine;
  const candyGuardAccount =
    input.candyGuard ??
    findCandyGuardPda(context, { base: publicKey(candyMachineAccount) });
  const payerAccount = input.payer ?? context.payer;

  // Candy Guard.
  keys.push({
    pubkey: candyGuardAccount,
    isSigner: false,
    isWritable: isWritable(candyGuardAccount, false),
  });

  // Candy Machine.
  keys.push({
    pubkey: candyMachineAccount,
    isSigner: false,
    isWritable: isWritable(candyMachineAccount, true),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Data.
  const data = getRouteInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
