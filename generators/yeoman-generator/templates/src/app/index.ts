import path from 'path';
import Generator from 'yeoman-generator';

import AbstractGenerator from '@endemolshinegroup/generator-nodejs-ts/generators/lib/AbstractGenerator';
import configureProjectRoot from '@endemolshinegroup/generator-nodejs-ts/generators/lib/configureProjectRoot';
import prompts from './prompts';

export default class NodeJsTypeScriptGenerator extends Generator {
  public answers: Generator.Answers = {};

  constructor(args: string | string[], opts: {}) {
    super(args, opts);
    this.sourceRoot(path.join(__dirname, 'templates'));
  }

  async initializing() {
    this.log('A few questions about your project...');
    this.log('Note: Project Name will also be used for Git URLs');
  }

  async prompting() {
    this.answers = await this.prompt(prompts);

    configureProjectRoot((this as unknown) as AbstractGenerator);
  }

  async install() {
    this.yarnInstall();
    if (this.answers.useGit) {
      this.spawnCommandSync('git', ['init', '--quiet']);
    }
  }
}
