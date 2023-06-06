/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, PublicKey, Serializer } from '@metaplex-foundation/umi';

/**
 * Guard that charges an amount in a specified spl-token as payment for the mint.
 *
 * List of accounts required:
 *
 * 0. `[writable]` Token account holding the required amount.
 * 1. `[writable]` Address of the ATA to receive the tokens.
 * 2. `[]` Mint account.
 * 3. `[]` SPL Token-2022 program account.
 */

export type Token2022Payment = {
  amount: bigint;
  mint: PublicKey;
  destinationAta: PublicKey;
};

export type Token2022PaymentArgs = {
  amount: number | bigint;
  mint: PublicKey;
  destinationAta: PublicKey;
};

export function getToken2022PaymentSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<Token2022PaymentArgs, Token2022Payment> {
  const s = context.serializer;
  return s.struct<Token2022Payment>(
    [
      ['amount', s.u64()],
      ['mint', s.publicKey()],
      ['destinationAta', s.publicKey()],
    ],
    { description: 'Token2022Payment' }
  ) as Serializer<Token2022PaymentArgs, Token2022Payment>;
}