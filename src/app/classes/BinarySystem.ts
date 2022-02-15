type ArrayOfArray<T> = Array<Array<T>>;

// type ArgsType = 'inputs' | 'fnOs';
type SystemInputType = ArrayOfArray<number> | Array<number | string> | number | string;
type FnInputType = Array<number> | number | string;
interface SystemOutput {
    ioMap: {[key: string]: number},
    outputSeq: Array<number>,
    outputString: string,
    expression: string,
    fn: string,
}

class BinarySystem {
    public bits: number;
    public maxInputCombinations: ArrayOfArray<number>;
    public maxOutputCombinations: ArrayOfArray<number>;
    private _symbols: Array<string>;
    private _inputs: ArrayOfArray<number>;
    private _fnOs: Array<number>;
    private _output: SystemOutput;
    constructor();
    constructor(bits: Array<string> | number);
    constructor(bits: Array<string> | number, inputs: SystemInputType);
    constructor(bits: Array<string> | number, inputs: SystemInputType, fnO: FnInputType);
    constructor(_bits?: Array<string> | number, _inputs?: SystemInputType, _fnO?: FnInputType) {
        this._symbols = _bits ? BinaryUtil.getBitsSymbols(_bits) : null;
        this.bits = this._symbols.length;
        this._inputs = _inputs ? BinaryUtil.getStandardInputs(_inputs) : null;
        this._fnOs = _fnO ? BinaryUtil.getFnList(_fnO) : [];
    }

    set symbols(_symbols: Array<string> | number) {
        if(!this._inputs && (_symbols === this._symbols.length || (_symbols as []).length === this._symbols.length)) {
            this._symbols = _symbols ? BinaryUtil.getBitsSymbols(_symbols) : null;
        }
    }
    get symbols(): Array<string> {
        return this._symbols;
    }

    set inputs(_inputs: SystemInputType) {
        _inputs = _inputs ? BinaryUtil.getStandardInputs(_inputs) : null;
        if(!this._symbols || _inputs?.[0]?.length === this._symbols.length) {
            this._inputs = _inputs;
        }
    }
    get inputs(): ArrayOfArray<number> {
        return this._inputs;
    }

    set fnOs(_fnOs: FnInputType) {
        _fnOs = _fnOs ? BinaryUtil.getFnList(_fnOs) : [];
        this._fnOs = _fnOs.filter((f: number) => Math.pow(2, Math.pow(2, this._symbols.length)) > f);
    }
    get fnOs(): Array<number> {
        return this._fnOs;
    }

    getMagicBox() {
        const obj = {};
        const maxCombinations = Math.pow(2, this._symbols.length);
        const maxFns = Math.pow(2, maxCombinations);
        const inputsIndexList = ((inp) => inp.map((e) => parseInt(e.join(""), 2)))(this._inputs);
        const getBinaryOutputSequence = (k: number,l: number) => {
            const t = BinaryUtil.decimalToBitArray(k);
            t.unshift(...Array(l-t.length).fill(0));
            return t;
        }
        const calculate = (k: number) => {
            const outputSeq = getBinaryOutputSequence(k, maxCombinations);
        }
    }
}

class BinaryUtil {
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