"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filterAndTrim_1 = __importDefault(require("@endemolshinegroup/generator-nodejs-ts/generators/lib/filterAndTrim"));
const prompts = [
    {
        default: '@endemolshinegroup',
        filter: filterAndTrim_1.default,
        message: 'NPM scope: ',
        name: 'projectScope',
        type: 'input',
    },
    {
        filter: filterAndTrim_1.default,
        message: 'Project Name: ',
        name: 'projectName',
        type: 'input',
    },
    {
        default: 'A Yeoman generator written in TypeScript 🙏',
        filter: filterAndTrim_1.default,
        message: 'Description: ',
        name: 'projectDescription',
        type: 'input',
    },
    {
        default: '0.0.1',
        filter: filterAndTrim_1.default,
        message: 'Version: ',
        name: 'version',
        type: 'input',
    },
    {
        message: 'Is this a public package?',
        name: 'isPublic',
        type: 'confirm',
    },
    {
        default: true,
        message: 'Initialize repository with Git?',
        name: 'useGit',
        type: 'confirm',
    },
];
exports.default = prompts;
//# sourceMappingURL=prompts.js.map