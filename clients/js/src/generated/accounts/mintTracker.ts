/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
} from '@metaplex-foundation/umi';

/** PDA to track the number of mints. */
export type MintTracker = Account<MintTrackerAccountData>;

export type MintTrackerAccountData = { count: number };

export type MintTrackerAccountDataArgs = MintTrackerAccountData;

export function getMintTrackerAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MintTrackerAccountDataArgs, MintTrackerAccountData> {
  const s = context.serializer;
  return s.struct<MintTrackerAccountData>([['count', s.u32()]], {
    description: 'MintTrackerAccountData',
  }) as Serializer<MintTrackerAccountDataArgs, MintTrackerAccountData>;
}

export function deserializeMintTracker(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): MintTracker {
  return deserializeAccount(
    rawAccount,
    getMintTrackerAccountDataSerializer(context)
  );
}

export async function fetchMintTracker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<MintTracker> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'MintTracker');
  return deserializeMintTracker(context, maybeAccount);
}

export async function safeFetchMintTracker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<MintTracker | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists
    ? deserializeMintTracker(context, maybeAccount)
    : null;
}

export async function fetchAllMintTracker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<MintTracker[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'MintTracker');
    return deserializeMintTracker(context, maybeAccount);
  });
}

export async function safeFetchAllMintTracker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<MintTracker[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeMintTracker(context, maybeAccount as RpcAccount)
    );
}

export function getMintTrackerGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );
  return gpaBuilder(context, programId)
    .registerFields<{ count: number }>({ count: [0, s.u32()] })
    .deserializeUsing<MintTracker>((account) =>
      deserializeMintTracker(context, account)
    )
    .whereSize(4);
}

export function getMintTrackerSize(): number {
  return 4;
}

export function findMintTrackerPda(
  context: Pick<Context, 'eddsa' | 'programs' | 'serializer'>,
  seeds: {
    /** Unique identifier of the allocation */
    id: number;
    /** The address of the Candy Guard account */
    candyGuard: PublicKey;
    /** The address of the Candy Machine account */
    candyMachine: PublicKey;
  }
): Pda {
  const s = context.serializer;
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );
  return context.eddsa.findPda(programId, [
    s.string({ size: 'variable' }).serialize('allocation'),
    s.u8().serialize(seeds.id),
    s.publicKey().serialize(seeds.candyGuard),
    s.publicKey().serialize(seeds.candyMachine),
  ]);
}

export async function fetchMintTrackerFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc' | 'serializer'>,
  seeds: Parameters<typeof findMintTrackerPda>[1],
  options?: RpcGetAccountOptions
): Promise<MintTracker> {
  return fetchMintTracker(context, findMintTrackerPda(context, seeds), options);
}

export async function safeFetchMintTrackerFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc' | 'serializer'>,
  seeds: Parameters<typeof findMintTrackerPda>[1],
  options?: RpcGetAccountOptions
): Promise<MintTracker | null> {
  return safeFetchMintTracker(
    context,
    findMintTrackerPda(context, seeds),
    options
  );
}
