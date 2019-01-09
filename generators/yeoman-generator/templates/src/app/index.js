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
const path_1 = __importDefault(require("path"));
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const configureProjectRoot_1 = __importDefault(require("@endemolshinegroup/generator-nodejs-ts/generators/lib/configureProjectRoot"));
const prompts_1 = __importDefault(require("./prompts"));
class NodeJsTypeScriptGenerator extends yeoman_generator_1.default {
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
            this.answers = yield this.prompt(prompts_1.default);
            configureProjectRoot_1.default(this);
        });
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            this.yarnInstall();
            if (this.answers.useGit) {
                this.spawnCommandSync('git', ['init', '--quiet']);
            }
        });
    }
}
exports.default = NodeJsTypeScriptGenerator;
//# sourceMappingURL=index.js.map