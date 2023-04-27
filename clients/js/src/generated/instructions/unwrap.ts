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
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type UnwrapInstructionAccounts = {
  candyGuard: PublicKey;
  authority?: Signer;
  candyMachine: PublicKey;
  candyMachineAuthority?: Signer;
  candyMachineProgram?: PublicKey;
};

// Data.
export type UnwrapInstructionData = { discriminator: Array<number> };

export type UnwrapInstructionDataArgs = {};

export function getUnwrapInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UnwrapInstructionDataArgs, UnwrapInstructionData> {
  const s = context.serializer;
  return mapSerializer<UnwrapInstructionDataArgs, any, UnwrapInstructionData>(
    s.struct<UnwrapInstructionData>(
      [['discriminator', s.array(s.u8(), { size: 8 })]],
      { description: 'UnwrapInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [126, 175, 198, 14, 212, 69, 50, 44],
    })
  ) as Serializer<UnwrapInstructionDataArgs, UnwrapInstructionData>;
}

// Instruction.
export function unwrap(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: UnwrapInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplCandyGuard',
      'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  addObjectProperty(
    resolvingAccounts,
    'candyMachineAuthority',
    input.candyMachineAuthority ?? context.identity
  );
  addObjectProperty(
    resolvingAccounts,
    'candyMachineProgram',
    input.candyMachineProgram ?? {
      ...context.programs.getPublicKey(
        'mplCandyMachine',
        'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
      ),
      isWritable: false,
    }
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };

  // Candy Guard.
  keys.push({
    pubkey: resolvedAccounts.candyGuard,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.candyGuard, false),
  });

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Candy Machine.
  keys.push({
    pubkey: resolvedAccounts.candyMachine,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.candyMachine, true),
  });

  // Candy Machine Authority.
  signers.push(resolvedAccounts.candyMachineAuthority);
  keys.push({
    pubkey: resolvedAccounts.candyMachineAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.candyMachineAuthority, false),
  });

  // Candy Machine Program.
  keys.push({
    pubkey: resolvedAccounts.candyMachineProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.candyMachineProgram, false),
  });

  // Data.
  const data = getUnwrapInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
