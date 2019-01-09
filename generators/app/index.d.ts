import Generator from 'yeoman-generator';
export default class TypescriptGeneratorGenerator extends Generator {
    answers: Generator.Answers;
    constructor(args: string | string[], opts: {});
    initializing(): Promise<void>;
    prompting(): Promise<void>;
    writing(): Promise<void>;
    install(): Promise<void>;
}
