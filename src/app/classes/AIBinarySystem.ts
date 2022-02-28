/**
 * Enhancements : Task remaining
 * 1. Observer pattern to sense the change in input and get output.
 * 2. BooleanMagicBox smart input support
 * New Features: Tasks
 * 1. Expression for > 4 variable system
 * 2. Implementation for SOP and POS
 * 3. Modes implementation like educational/observational and practical/industrial
 * 4. Adding support for don't care conditions.
 */


import { solve } from './k-map-solver';

type ArrayOfArray<T> = Array<Array<T>>;
type SystemInputType = ArrayOfArray<number> | Array<number | string> | number | string;
class AIBInput {
    public bits: number;
    public maxInputCombinations: ArrayOfArray<number>;
    public dontCareInputs: ArrayOfArray<number>;
    public maxNumberOfOutputs: number;
    public symbols: Array<string>;

    public inputs: ArrayOfArray<number>;
    public outputFnsList: Array<number>;

    constructor(bits: number);
    constructor(symbols: Array<string>);
    constructor(_input1: Array<string> | number) {
        if(typeof _input1 === 'number') {
            this.bits = _input1;
            this.symbols = BinUtil.getSymbolsList(this.bits);
        } else {
            this.bits = _input1.length;
        }
        this.maxInputCombinations = BinUtil.getMaximumInputCombinations(this.bits);
        this.maxNumberOfOutputs = Math.pow(1, Math.pow(2, this.bits));
    }
    public setInputs(_inputs: SystemInputType): void {
        this.inputs = BinUtil.getStandardInputs(_inputs);
    }
    public setOutputFnsList(_outputFnsList: FnInputType): void {
        this.outputFnsList = BinUtil.getFnList(_outputFnsList);
    }
}

class AIBOutput {
    public ioMap: any;
    public outputSeq: Array<number>;
    public outputString: string;
    public expression: string;
    public fn: string;

    constructor(private systemInputs: AIBInput) {}

    private getBinaryOutputSequence = (n: number, maxInputCombinations: number) => {
        const bitSeq = BinUtil.decimalToBitArray(n);
        bitSeq.unshift(maxInputCombinations - bitSeq.length);
        return bitSeq;
    }
    calculate = (fnNo: number): void => {
        this.outputSeq = this.getBinaryOutputSequence(fnNo, this.systemInputs.maxInputCombinations.length);

        
        this.ioMap = this.outputSeq.map((_, idx) => this.getBinaryOutputSequence(idx, this.systemInputs.bits).reduce((a, v, index) => ({ ...a, [this.systemInputs.symbols[index]]: v, ['f' + fnNo]: this.outputSeq[idx], Y: this.outputSeq[idx] }), {}));
        
        this.outputString = this.outputSeq.join("");
        
        const minterm = this.outputSeq.map((value, index) => value ? index : null).filter(v => (v !== null));
        this.expression = (this.systemInputs.bits > 1 && this.systemInputs.bits < 5) ? ((this.outputSeq.indexOf(1) > -1) ? solve(this.systemInputs.symbols, minterm).expression : '0') : null;
        
        this.fn = 'f' + fnNo;
    }
    reset(): void {
        this.ioMap = null;
        this.outputSeq = [];
        this.outputString = null;
        this.expression = null;
        this.fn = null;
    }
    get = (): AIBOutput => {
        return {
            ioMap: this.ioMap,
            outputSeq: this.outputSeq,
            outputString: this.outputString,
            expression: this.expression,
            fn: this.fn,
        } as AIBOutput;
    }
}

class BooleanMagicBox {
    private systemOutput: AIBOutput;
    private _output: {[key: string]: AIBOutput};
    constructor(private systemInputs: AIBInput) {
        this._output = {};
    }
    create(): void {
        this.reset();
        if(this.systemInputs.outputFnsList?.length > 0) {
            for(let i of this.systemInputs.outputFnsList) {
                this.systemOutput = new AIBOutput(this.systemInputs);
                this.systemOutput.calculate(i);
                this._output['f' + i] = this.systemOutput.get();
            }
        } else {
            const noOfOutputs = this.systemInputs.bits > 4 ? 1000 : this.systemInputs.maxNumberOfOutputs;
            for( let i = 0; i < noOfOutputs; i++ ) {
                this.systemOutput = new AIBOutput(this.systemInputs);
                this.systemOutput.calculate(i);
                this._output['f' + i] = this.systemOutput.get();
            }
        }
    }
    reset(): void {
        this._output = {};
    }
    get output(): {[key: string]: AIBOutput} {
        if(!this._output) {
            this.create();
        }
        return JSON.parse(JSON.stringify(this._output));
    }
}

class BinUtil {
    public static getMaximumInputCombinations = (t: number) => {
        let dd = Array(Math.pow(2,t)).fill([]).map((_,i) => Number(i).toString(2).split("")).map(e => e.map(t => Number(t)));
        dd.forEach(e => e.unshift(...Array(t - e.length).fill(0)));
        return dd;
    };
    public static getSymbolsList = (bits: number) => Array.isArray(bits) ? bits : Array(bits).fill(0).map((_, idx) => String.fromCharCode('a'.charCodeAt(0) + idx));

    public static binaryToBitArray = (n: number) => n.toString().split("").map((e: number | string) => Number(e));

    public static decimalToBitArray = (n: number) => Number(n).toString(2).split("").map((e: number | string) => Number(e));
    
    public static isBinary = (inp: Array<number | string> | string | number) => inp.toString().split("").findIndex(e => !(Number(e) > 1 || Number(e) < 0)) > -1;

    public static isArrayOfArray = (arr: SystemInputType) => (Array.isArray(arr) && (arr as []).filter((e) => Array.isArray(e)).length === arr.length);

    public static sanitizeTwoDArray = (arr: ArrayOfArray<string | number>) => {
        arr = arr.filter(e => Array.isArray(e));
        return arr.map(a => a.map(e => Number(Boolean(Number(e)))));
    }

    public static minStandardInputsArray = (array: ArrayOfArray<string | number>) => {
        let minLength = Math.pow(2, 32) - 1;
        array.forEach(e => minLength > e.length ? minLength = e.length : null);
        array.forEach(e => minLength < e.length ? e.length = minLength : null);
        return array as ArrayOfArray<number>;
    };

    public static maxStandardInputsArray = (array: ArrayOfArray<string | number>) => {
        let maxLength = 0;
        array.forEach(e => maxLength < e.length ? maxLength = e.length : null);
        array.forEach(e => maxLength > e.length ? e.unshift(...Array(maxLength - e.length).fill(0)) : null);
        return array as ArrayOfArray<number>;
    };

    public static getBitsSymbols = (n: Array<string> | number) => Array.isArray(n) ? n : Array(n).fill(0).map((_, idx) => String.fromCharCode('a'.charCodeAt(0) + idx));

    public static getStandardInputs(inputs: SystemInputType, isMinimalSystem?: boolean) {
        let isBinaryInput = false;
        const convertTo2DArray = (isBinary: boolean) => {
            if(!isBinary) {
                inputs = (inputs as []).map((e) => BinaryUtil.decimalToBitArray(e));
            } else {
                inputs = (inputs as []).map((e) => BinaryUtil.binaryToBitArray(e));
            }
        }
        if(!BinaryUtil.isArrayOfArray(inputs) && !Array.isArray(inputs)) {
            isBinaryInput = BinaryUtil.isBinary(inputs);
            inputs = inputs.toString().split(",");
            convertTo2DArray(isBinaryInput);
        } else if(!BinaryUtil.isArrayOfArray(inputs) && Array.isArray(inputs)) {
            isBinaryInput = BinaryUtil.isBinary(inputs[0]);
            convertTo2DArray(isBinaryInput);
        } else {
            inputs = BinaryUtil.sanitizeTwoDArray(inputs as ArrayOfArray<string | number>);
        }
        
        return isMinimalSystem ? BinaryUtil.minStandardInputsArray(inputs as ArrayOfArray<string | number>) : BinaryUtil.maxStandardInputsArray(inputs as ArrayOfArray<string | number>);
    }

    public static getFnList(fnO: FnInputType) {
        if(fnO && !Array.isArray(fnO)) {
            fnO = [Number(fnO)];
        }
        return fnO as Array<number>;
    }
}