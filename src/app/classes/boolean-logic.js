/**
 * TO DO
 * 1. For multiple input combinations less than all possible combinations
 * 2. Calculate expression for > 4 variable system
 * DONE 3. Support of all types of input formats like string, boolean sequence, decimal, decimal sequence
 * 4. BooleanMagicBox smart input support
 * 5. Implementation for SOP and POS
 * 6. Modes implementation like educational/observational and practical/industrial
 */

import { solve } from './k-map-solver';
/**
 * 
 * @param {any value} value 
 * 1. Checks, if the input value is not null or zero or empty object or array
 * @returns boolean
 */
const hasValue = (value) => {
    const isUnDefined = (value === undefined || value === 'undefined');
    const isNull = (value === null || value === 'null');
    const isArray = Array.isArray(value);
    const isEmptyArray = (isArray && value.length <= 0);
    const isRegExp = value instanceof RegExp;
    const isDate = value instanceof Date;
    const isBlankObj = (typeof value === 'object' && !isArray && !isEmptyArray && !isNull && !isRegExp && !isDate && Object.keys(value).length > 0);
    return !isUnDefined && !isNull && !isEmptyArray && !isBlankObj;
}

/**
 * 
 * @param {*} arr 
 * 1. Removes duplicates from array of primitive data types.
 * @returns arr
 */
const uniq = (arr) => {
    return Array.isArray(arr) ? arr.filter((e, idx) => (arr.indexOf(e) === idx)) : []
}

/**
 * 
 * @param {*} arr 
 * 1. Checks if the input value is 2D array, i.e.
 * @returns boolean
 */
const isArrayOfArray = (arr) => (Array.isArray(arr) && arr.filter(e => Array.isArray(e)).length === arr.length);

/**
 * 
 * @param {*} arr 
 * 1. convert any string literal or base 10 number to equivalent binary digit of 2D input array
 * @returns arr
 */
const sanitizeTwoDArray = (arr) => {
    arr = arr.filter(e => Array.isArray(e));
    return arr.map(a => a.map(e => Number(Boolean(Number(e)))));
}

/**
 * 
 * @param {*} inp 
 * 1. Checks if the given input is binary number or not
 * @returns boolean
 */
const isBinary = (inp) => inp.toString().split("").findIndex(e => !(Number(e) > 1 || Number(e) < 0)) > -1;

/**
 * 
 * @param {*} n
 * 1. Converts the binary sequence to bit array 
 * @returns arr
 */
const binaryToBitArray = (n) => n.toString().split("").map(e => Number(e));

/**
 * 
 * @param {*} n
 * 1. Converts the decimal number or sequence to bit array 
 * @returns arr
 */
const decimalToBitArray = (n) => Number(n).toString(2).split("").map(e => Number(e));

/**
 * 
 * @param {*} array 
 * 1. Convert the 2D input array to minimal input array
 * @returns arr
 */
const minStandardInputsArray = (array) => {
    let minLength = Math.pow(2, 32) - 1;
    array.forEach(e => minLength > e.length ? minLength = e.length : null);
    array.forEach(e => minLength < e.length ? e.length = minLength : null);
    return array
};

/**
 * 
 * @param {*} array 
 * 1. Convert the 2D input array to max input array
 * @returns array
 */
const maxStandardInputsArray = (array) => {
    let maxLength = 0;
    array.forEach(e => maxLength < e.length ? maxLength = e.length : null);
    array.forEach(e => maxLength > e.length ? e.unshift(...Array(maxLength - e.length).fill(0)) : null);
    return array;
};

/**
 * 
 * @param {*} inputs 
 * @param {*} isMinimalSystem 
 * 1. Conver the input given by other system to the input accepted by the digital environment
 * 2. first input - "inputs" is the input given by the other system
 * 3. second input - "isMinimalSystem" is the input to identify the size of the digital system
 * @returns array
 */
const getInputsArray = (inputs, isMinimalSystem) => {
    let isBinaryInput = false;
    const convertTo2DArray = (isBinary) => {
        if(!isBinary) {
            inputs = inputs.map(e => decimalToBitArray(e));
        } else {
            inputs = inputs.map(e => binaryToBitArray(e));
        }
    }
    if(!isArrayOfArray(inputs) && !Array.isArray(inputs)) {
        isBinaryInput = isBinary(inputs);
        inputs = inputs.toString().split(",");
        convertTo2DArray(isBinaryInput);
    } else if(!isArrayOfArray(inputs) && Array.isArray(inputs)) {
        isBinaryInput = isBinary(inputs[0]);
        convertTo2DArray(isBinaryInput);
    } else {
        inputs = sanitizeTwoDArray(inputs);
    }
    
    return isMinimalSystem ? minStandardInputsArray(inputs) : maxStandardInputsArray(inputs);
};

/**
 * 
 * @param {*} arr 
 * 1. returns the maxLength array from the input
 * @returns arr
 */
const maxLengthArray = (arr) => {
    let maxLengthArr = 0, index = 0;
    arr.forEach((a, i) => (maxLengthArr = (maxLengthArr <= a.length) ? (a.length, index = i) : maxLengthArr));
    return arr[index];
};

/**
 * 
 * @param {*} arr 
 * 1. returns the minLength array from the input
 * @returns arr
 */
const minLengthArray = (arr) => {
    let minLengthArr = Math.pow(2,32) - 1, index = 0;
    arr.forEach((a, i) => (minLengthArr = (minLengthArr >= a.length) ? (a.length, index = i) : minLengthArr));
    return arr[index];
};

function calculateStandardInputsOfSystem(n, inputs, fnO, isMinimalSystem) {
    const isA = !hasValue(n);
    const isB = !hasValue(inputs);
    const isC = !hasValue(fnO);
    let maxOutputCount = fnO;
    if(!hasValue(n)) {
        if(hasValue(inputs)) {
            inputs = getInputsArray(inputs, isMinimalSystem);
            n = inputs[0].length;
        }
        if(hasValue(fn)) {
            n = Array.isArray(fnO) ? Math.max(...fnO).toString(2).length : Number(fnO).toString(2).length;
        }
    }
    if(!isB && !isC) {
        inputs = ((t) => {
            let dd = Array(Math.pow(2,t)).fill([]).map((_,i) => Number(i).toString(2).split("")).map(e => e.map(t => Number(t)));
            dd.forEach(e => e.unshift(...Array(t - e.length).fill(0)));
            return dd;
        })(n);
        maxOutputCount = n > 5 ? 100 : n;
        fnO = Array(Math.pow(2,Math.pow(2,maxOutputCount))).fill(0).map((_,idx) => idx);
    } else if(!isC && !isA) {
        inputs = getInputsArray(inputs, isMinimalSystem);
        n = inputs[0].length;
        fnO = Array(Math.pow(2,Math.pow(2,n))).fill(0).map((_,idx) => idx);
    } else if(!isA && !isB) {
        n = Array.isArray(fnO) ? Math.max(...fnO).toString(2).length : Number(fnO).toString(2).length;
        inputs = ((t) => {
            let dd = Array(Math.pow(2,t)).fill([]).map((_,i) => Number(i).toString(2).split("")).map(e => e.map(t => Number(t)));
            dd.forEach(e => e.unshift(...Array(t - e.length).fill(0)));
            return dd;
        })(n);
    } else if(!isC) {
        inputs = getInputsArray(inputs, isMinimalSystem);
        if(n < inputs[0].length) inputs.forEach(e => e.length = n);
        fnO = Array(Math.pow(2,Math.pow(2,n))).fill(0).map((_,idx) => idx);
    } else if(!isB) {
        inputs = ((t) => {
            let dd = Array(Math.pow(2,t)).fill([]).map((_,i) => Number(i).toString(2).split("")).map(e => e.map(t => Number(t)));
            dd.forEach(e => e.unshift(...Array(t - e.length).fill(0)));
            return dd;
        })(n);
    } else if(!isA) {
        inputs = getInputsArray(inputs, isMinimalSystem);
        n = inputs[0].length;
    } else {
        inputs = getInputsArray(inputs, isMinimalSystem);
        if(n < inputs[0].length) inputs.forEach(e => e.length = n);
    }
    return { n, inputs, fnO };
}

function BooleanMagicBox(n, input, fnO) {
    if(hasValue(input)) {
        input = sanitizeTwoDArray(getInputsArray(input));
        n = !hasValue(n) ? maxLengthArray(input)?.length : n;
        input = input.forEach(e => e.length > n ? e.length = n : null);
        input.length = n;
    } else {
        n = !hasValue(n) ? 0 : n;
    }
    hasValue(input) && (input.length = n);
    const noOfCombinations = Math.pow(2,n);
    const noOfFns = Math.pow(2, noOfCombinations);
    if(!hasValue(fnO)) {
        fnO = Array(noOfFns).fill(0).map((e,i) => i);
    }
    const obj = {};
    const getBinaryOutputSequence = (k,l) => {
        const t = decimalToBitArray(k);
        t.unshift(...Array(l-t.length).fill(0));
        return t;
    }
    const decimalInput = ((inp) => hasValue(inp) ? (parseInt((Array.isArray(inp) ? inp.join("") : inp), 2)) : null)(input);
    const calculate = (k) => {
        const outputSeq = getBinaryOutputSequence(k,noOfCombinations);
        const variables = Array(n).fill(0).map((_, idx) => String.fromCharCode('a'.charCodeAt(0) + idx));
        const minterm = outputSeq.map((value, index) => value ? index : null).filter(v => (v !== null));
        const ioMap = outputSeq.map((_, idx) => getBinaryOutputSequence(idx, n).reduce((a, v, index) => ({ ...a, [variables[index]]: v, ['f' + k]: outputSeq[idx], Y: outputSeq[idx] }), {}));
        return {
            ioMap: hasValue(decimalInput) ? ioMap[decimalInput] : ioMap,
            outputSeq: hasValue(decimalInput) ? outputSeq[decimalInput] : outputSeq,
            outputString: hasValue(decimalInput) ? [outputSeq[decimalInput]].join("") : outputSeq.join(""),
            expression: (n > 1 & n < 5) ? ((outputSeq.indexOf(1) > -1) ? solve(variables, minterm).expression : '0') : null,
            fn: 'f' + k,
            inputs: variables
        };
    };
    if(!Array.isArray(fnO)) {
        return calculate(Number(fnO));
    } else {
        fnO = uniq(fnO);
        for(let i of fnO) {
            obj['f' + i] = calculate(i);
        }
        return obj;
    }
}
