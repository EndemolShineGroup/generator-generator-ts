import AbstractGenerator from '@endemolshinegroup/generator-nodejs-ts/generators/lib/AbstractGenerator';
import configureProjectRoot from '@endemolshinegroup/generator-nodejs-ts/generators/lib/configureProjectRoot';
import extend from 'deep-extend';
import path from 'path';
import Generator from 'yeoman-generator';

import prompts from './prompts';

export default class TypescriptGeneratorGenerator extends Generator {
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

    const MODULE_PREFIX = '@endemolshinegroup/generator-nodejs-ts/generators/';

    this.composeWith(require.resolve(`${MODULE_PREFIX}/repo`), this.answers);
    this.composeWith(require.resolve(`${MODULE_PREFIX}/node`), this.answers);
    this.composeWith(require.resolve(`${MODULE_PREFIX}/typescript`), {
      ...this.answers,
      generateExamples: false,
    });
    this.composeWith(require.resolve(`${MODULE_PREFIX}/build`), this.answers);
    this.composeWith(require.resolve(`${MODULE_PREFIX}/process`), {
      ...this.answers,
      addPrettier: true,
      addTSLint: true,
    });
    this.composeWith(require.resolve(`${MODULE_PREFIX}/github`), this.answers);
    this.composeWith(require.resolve(`${MODULE_PREFIX}/style`), this.answers);
    this.composeWith(
      require.resolve(`${MODULE_PREFIX}/services`),
      this.answers,
    );

    configureProjectRoot((this as unknown) as AbstractGenerator);
  }

  async writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const generatorGeneratorPkg = require('../../package.json');

    extend(pkg, {
      dependencies: {
        'yeoman-generator':
          generatorGeneratorPkg.dependencies['yeoman-generator'],
      },
      devDependencies: {
        'yeoman-test': generatorGeneratorPkg.devDependencies['yeoman-test'],
        'yeoman-assert': generatorGeneratorPkg.devDependencies['yeoman-assert'],
      },
      jest: {
        testPathIgnorePatterns: ['templates'],
      },
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('yeoman-generator');

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  async install() {
    this.yarnInstall();
  }
}
