"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configureProjectRoot_1 = __importDefault(require("@endemolshinegroup/generator-nodejs-ts/generators/lib/configureProjectRoot"));
const deep_extend_1 = __importDefault(require("deep-extend"));
const path_1 = __importDefault(require("path"));
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const prompts_1 = __importDefault(require("./prompts"));
class TypescriptGeneratorGenerator extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        this.answers = {};
        this.sourceRoot(path_1.default.join(__dirname, 'templates'));
    }
    initializing() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log('A few questions about your project...');
            this.log('Note: Project Name will also be used for Git URLs');
        });
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.destinationPath());
            this.answers = yield this.prompt(prompts_1.default);
            const MODULE_PREFIX = '@endemolshinegroup/generator-nodejs-ts/generators/';
            this.composeWith(require.resolve(`${MODULE_PREFIX}/repo`), this.answers);
            this.composeWith(require.resolve(`${MODULE_PREFIX}/node`), this.answers);
            this.composeWith(require.resolve(`${MODULE_PREFIX}/typescript`), Object.assign({}, this.answers, { generateExamples: false }));
            this.composeWith(require.resolve(`${MODULE_PREFIX}/build`), this.answers);
            this.composeWith(require.resolve(`${MODULE_PREFIX}/process`), Object.assign({}, this.answers, { addPrettier: true, addTSLint: true }));
            this.composeWith(require.resolve(`${MODULE_PREFIX}/github`), this.answers);
            this.composeWith(require.resolve(`${MODULE_PREFIX}/style`), this.answers);
            this.composeWith(require.resolve(`${MODULE_PREFIX}/services`), this.answers);
            configureProjectRoot_1.default(this);
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
            const generatorGeneratorPkg = require('../../package.json');
            deep_extend_1.default(pkg, {
                dependencies: {
                    'yeoman-generator': generatorGeneratorPkg.dependencies['yeoman-generator'],
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
        });
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            this.yarnInstall();
        });
    }
}
exports.default = TypescriptGeneratorGenerator;
//# sourceMappingURL=index.js.map