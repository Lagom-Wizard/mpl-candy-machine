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
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type DeleteCandyMachineInstructionAccounts = {
  /** Candy Machine acccount. */
  candyMachine: PublicKey | Pda;
  /** Authority of the candy machine. */
  authority?: Signer;
};

// Data.
export type DeleteCandyMachineInstructionData = {
  discriminator: Array<number>;
};

export type DeleteCandyMachineInstructionDataArgs = {};

/** @deprecated Use `getDeleteCandyMachineInstructionDataSerializer()` without any argument instead. */
export function getDeleteCandyMachineInstructionDataSerializer(
  _context: object
): Serializer<
  DeleteCandyMachineInstructionDataArgs,
  DeleteCandyMachineInstructionData
>;
export function getDeleteCandyMachineInstructionDataSerializer(): Serializer<
  DeleteCandyMachineInstructionDataArgs,
  DeleteCandyMachineInstructionData
>;
export function getDeleteCandyMachineInstructionDataSerializer(
  _context: object = {}
): Serializer<
  DeleteCandyMachineInstructionDataArgs,
  DeleteCandyMachineInstructionData
> {
  return mapSerializer<
    DeleteCandyMachineInstructionDataArgs,
    any,
    DeleteCandyMachineInstructionData
  >(
    struct<DeleteCandyMachineInstructionData>(
      [['discriminator', array(u8(), { size: 8 })]],
      { description: 'DeleteCandyMachineInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34],
    })
  ) as Serializer<
    DeleteCandyMachineInstructionDataArgs,
    DeleteCandyMachineInstructionData
  >;
}

// Instruction.
export function deleteCandyMachine(
  context: Pick<Context, 'programs' | 'identity'>,
  input: DeleteCandyMachineInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyMachineCore',
    'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    candyMachine: [input.candyMachine, true] as const,
  };
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, true] as const)
      : ([context.identity, true] as const)
  );

  addAccountMeta(keys, signers, resolvedAccounts.candyMachine, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);

  // Data.
  const data = getDeleteCandyMachineInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
