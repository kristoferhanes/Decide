import { Command } from 'commander';
import { createInterface } from 'readline';
import { evidence, KeySet, MassFunction } from './mass-function';
import { star, toStar } from './star';

const program = new Command();

program.name('decide').description('A simple CLI tool to help you make decisions').version('1.0.0');

program.action(() => {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const askQuestion = (question: string): Promise<string> =>
    new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });

  const main = async () => {
    const criteria: { name: string; weight: number }[] = [];
    const options: { name: string; ratings: { [key: string]: number } }[] = [];

    // Input criteria and weights
    while (true) {
      const criterion = await askQuestion('Enter a criterion (or press enter to finish): ');
      if (!criterion) {
        break;
      }
      const weight = parseFloat(await askQuestion(`Enter the weight for ${criterion} (1 - 5): `));
      criteria.push({ name: criterion, weight: star(weight) });
    }

    // Input options and ratings
    while (true) {
      console.log('');
      const option = await askQuestion('Enter an option (or press enter to finish): ');
      if (!option) {
        break;
      }
      const ratings: Record<string, number> = {};
      for (const criterion of criteria) {
        const rating = parseFloat(await askQuestion(`Enter the rating for ${criterion.name} for ${option} (1 - 5): `));
        ratings[criterion.name] = star(rating);
      }
      options.push({ name: option, ratings });
    }

    if (criteria.length === 0 || options.length === 0) {
      console.error('You must enter at least one criterion and one option.');
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
      console.log(`${option}: ${toStar(mass)}`);
    }

    rl.close();
  };

  main();
});

program.parse(process.argv);
