import Generator from 'yeoman-generator';
export default class NodeJsTypeScriptGenerator extends Generator {
    answers: Generator.Answers;
    constructor(args: string | string[], opts: {});
    initializing(): Promise<void>;
    prompting(): Promise<void>;
    install(): Promise<void>;
}
