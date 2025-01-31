import fs from 'fs';
import yaml from 'js-yaml';

export type Criteria = Readonly<{
  name: string;
  weight: number;
}>;

export type Option = Readonly<{
  name: string;
  ratings: Record<string, number>;
}>;

export type Config = Readonly<{
  criteria: readonly Criteria[];
  options: readonly Option[];
}>;

export const loadConfig = async (file: string): Promise<Config> => {
  const data = await fs.promises.readFile(file, 'utf-8');
  return yaml.load(data) as Config;
};
