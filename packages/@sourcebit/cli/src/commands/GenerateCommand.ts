import { generateTypes } from '@sourcebit/core'
import { getConfig } from '../lib/getConfig'
import { BaseCommand } from './_BaseCommand'

export class GenerateCommand extends BaseCommand {
  static paths = [['generate']]

  async executeSafe() {
    const config = await getConfig({ configPath: this.configPath })
    await generateTypes({ config, generateSchemaJson: true })
  }
}
