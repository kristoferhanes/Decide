import { Command } from 'commander';
import { createInterface } from 'readline';
import { evidence, KeySet, MassFunction } from './mass-function';
import { Criteria, loadConfig, Option } from './config';

const program = new Command();

program
  .name('decide')
  .description('A simple CLI tool to help you make decisions')
  .version('1.0.0')
  .option('-c, --config <file>', 'path to config file');

program.action(() => {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const main = async () => {
    const criteria: Criteria[] = [];
    const options: Option[] = [];
    const configFile = program.opts().config;

    if (configFile) {
      try {
        const config = await loadConfig(configFile);
        criteria.push(...config.criteria);
        options.push(...config.options);
      } catch (error) {
        console.error('Failed to load config file:', error);
        rl.close();
        return;
      }
    }
    if (criteria.length === 0 || options.length === 0) {
      console.error('There must be at least one criterion and one option.');
      rl.close();
      return;
    }

    const massFunctions: MassFunction<string>[] = [];
    for (const option of options) {
      const massFunction = evidence(
        option.name,
        criteria.map((criterion) => [criterion.name, option.ratings[criterion.name]]),
        KeySet.fromArray(options.map((option) => option.name)),
        (criterion) => criteria.find((c) => c.name === criterion)?.weight ?? 0,
      );
      massFunctions.push(massFunction);
    }

    const combinedMassFunction = MassFunction.combine(...massFunctions);

    console.log('\nDecision:');
    for (const [option, mass] of combinedMassFunction.masses) {
      console.log(`${option}: ${mass}`);
    }

    rl.close();
  };

  main();
});

program.parse(process.argv);
