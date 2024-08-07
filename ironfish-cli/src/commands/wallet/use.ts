/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Args } from '@oclif/core'
import { IronfishCommand } from '../../command'
import { RemoteFlags } from '../../flags'

export class UseCommand extends IronfishCommand {
  static description = 'Change the default account used by all commands'

  static args = {
    account: Args.string({
      required: true,
      description: 'Name of the account',
    }),
  }

  static flags = {
    ...RemoteFlags,
  }

  async start(): Promise<void> {
    const { args } = await this.parse(UseCommand)
    const { account } = args

    const client = await this.connectRpc()
    await client.wallet.useAccount({ account })
    this.log(`The default account is now: ${account}`)
  }
}
