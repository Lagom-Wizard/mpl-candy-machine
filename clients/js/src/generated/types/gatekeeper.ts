/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { PublicKey } from '@metaplex-foundation/umi';
import {
  Serializer,
  bool,
  publicKey as publicKeySerializer,
  struct,
} from '@metaplex-foundation/umi/serializers';

/**
 * Guard that validates if the payer of the transaction has a token from a specified
 * gateway network — in most cases, a token after completing a captcha challenge.
 *
 * List of accounts required:
 *
 * 0. `[writeable]` Gatekeeper token account.
 * 1. `[]` Gatekeeper program account.
 * 2. `[]` Gatekeeper expire account.
 */

export type Gatekeeper = {
  /** The network for the gateway token required */
  gatekeeperNetwork: PublicKey;
  /**
   * Whether or not the token should expire after minting.
   * The gatekeeper network must support this if true.
   */
  expireOnUse: boolean;
};

export type GatekeeperArgs = Gatekeeper;

export function getGatekeeperSerializer(): Serializer<
  GatekeeperArgs,
  Gatekeeper
> {
  return struct<Gatekeeper>(
    [
      ['gatekeeperNetwork', publicKeySerializer()],
      ['expireOnUse', bool()],
    ],
    { description: 'Gatekeeper' }
  ) as Serializer<GatekeeperArgs, Gatekeeper>;
}
