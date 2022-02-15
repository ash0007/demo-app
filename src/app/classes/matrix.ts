type IMatrix<T> = Array<IMatrix<T>> | Array<T>;

const DEFAULT_DEPTH = 0;
const DEFAULT_DIMENSION: Array<number> = [];

enum ErrorMsg {
    INVALID_MATRIX = `Invalid Matrices`,
    INVALID_MATRIX_DIMENSION = `Invalid matrix dimensions`,
    MULTIPLICATION_NOT_VALID = `Multiplication is not valid`
};

class Matrix<T> {
    private _depth: number;
    private _dimension: Array<number>;
    private _matrix: IMatrix<T>;
    constructor();
    constructor(depth: number);
    constructor(dimenstion: Array<number>);
    constructor(depth: number, dimenstion: Array<number>);
    constructor(input1?: number | Array<number>, input2?: Array<number>) {
        if(!input1) {
            this._depth = DEFAULT_DEPTH;
            this._dimension = DEFAULT_DIMENSION;
        } else if(!input2) {
            if(typeof input1 === 'number') {
                this._depth = input1;
                this._dimension = Array.from({length: this._depth}).fill(0) as Array<number>;
            }
            if(Array.isArray(input1)) {
                this._depth = input1.length;
                this._dimension = input1;
            }
        } else {
            this._depth = input1 as number;
            this._dimension = input2;
        }
        const utilProps = Object.getPrototypeOf(MatrixUtil.getInstance());
        for(let prop in utilProps) {
            (this as any)[prop] = utilProps[prop];
        }
        // Object.assign(this, MatrixUtil.getInstance());
        // console.log(MatrixUtil.getInstance());
    }
    get depth(): number {
        return this._depth;
    }
    set depth(depth: number) {
        this._depth = depth;
    }
    get dimension(): Array<number> {
        return this._dimension;
    }
    set dimension(dimension: Array<number>) {
        this._depth = this._dimension.length;
        this._dimension = dimension;
    }
    get matrix(): IMatrix<T> {
        return this._matrix;
    }
    set matrix(matrix: IMatrix<T>) {
        this.depth = 0;
        this.depth = this.getDepthFromMatrix(matrix);
        this.dimension = Array.from({length: this._depth}).fill(0) as Array<number>;
        this.dimension = this.getDimensionFromMatrix(matrix, 0);
        this._matrix = matrix;
    }
    private getDepthFromMatrix(matrix: IMatrix<T> | T): number {
        if (Array.isArray(matrix)) {
            this.depth++;
            this.getDepthFromMatrix(matrix[0]);
        }
        return this.depth;
    }
    getDimensionFromMatrix(matrix: IMatrix<T> | T, i: number): Array<number> {
        if (Array.isArray(matrix)) {
            this.dimension[i++] = matrix.length;
            this.getDimensionFromMatrix(matrix[0], i);
        }
        return this.dimension;
    }
}

interface INumberMatrixOps {
    add: (matrix: Matrix<number>) => Matrix<number>;
    subtract: (matrix: Matrix<number>) => Matrix<number>;
    multiply: (matrix: Matrix<number>) => Matrix<number>;
    transpose: () => Matrix<number>;
    determinant: () => number;
    inverse: () => Matrix<number>;
    minor: (element: number) => Matrix<number>;
    cofactor: (minor: Matrix<number> | number) => number;
    isSingular: () => boolean;
    adjoint: () => Matrix<number>;
}
class NumberMatrix extends Matrix<number> implements INumberMatrixOps {
    rows: number;
    columns: number;
    constructor();
    constructor(depth: number);
    constructor(dimenstion: Array<number>);
    constructor(depth: number, dimenstion: Array<number>);
    constructor(input1?: number | Array<number>, input2?: Array<number>) {
        if(!input1) {
            super();
        } else if(!input2) {
            if(typeof input1 === 'number') {
                super(input1);
            } else {
                super(input1);
            }
        } else {
            super(input1 as number, input2);
        }
        // this.rows = this.matrix.length;
    }
    public add(matrixRef: Matrix<number>): Matrix<number> {
        const result: IMatrix<number> = [];
        if(this.depth < 1 || matrixRef.depth < 1) {
            throw ErrorMsg.INVALID_MATRIX;
        }
        if ((matrixRef as any).isDimensionSame(this)) {
            (this as any).addArrays(matrixRef.matrix, this.matrix, result);
            return this.getResultant(result);
        } else {
            throw ErrorMsg.INVALID_MATRIX_DIMENSION;
        }
    }
    public subtract(matrixRef: Matrix<number>): Matrix<number> {
        const result: IMatrix<number> = [];
        if(this.depth < 1 || matrixRef.depth < 1) {
            throw ErrorMsg.INVALID_MATRIX;
        }
        if ((matrixRef as any).isDimensionSame(this)) {
            (this as any).subtractArrays(matrixRef.matrix, this.matrix, result);
            return this.getResultant(result);
        } else {
            throw ErrorMsg.INVALID_MATRIX_DIMENSION;
        }
    }
    public multiply(matrixRef: Matrix<number>): Matrix<number> {
        if(this.matrix.length === (matrixRef.matrix[0] as Array<number>).length) {

        } else {
            throw ErrorMsg.MULTIPLICATION_NOT_VALID;
        }
        return null;
    }
    public transpose(): Matrix<number> {
        if(this.depth < 1) {
            throw ErrorMsg.INVALID_MATRIX;
        }
        
        return null;
    }
    public determinant: () => number;
    public inverse: () => Matrix<number>;
    public minor: (element: number) => Matrix<number>;
    public cofactor: (minor: number | Matrix<number>) => number;
    public isSingular: () => boolean;
    public adjoint: () => Matrix<number>;
    private getResultant(result: IMatrix<number>): Matrix<number> {
        const resultant = new Matrix<number>(this.depth, this.dimension);
        resultant.matrix = result;
        return resultant;
    }
}

class MatrixUtil<T> {
    private static _instance: MatrixUtil<any>;
    private constructor() { }
    public isDimensionSame(matrixRef: Matrix<T>): boolean {
        const that = this as any;
        let flag = that.dimension.length === matrixRef.dimension.length;
        if(flag) {
            that.dimension.forEach((element: number, index: number) => {
                flag = element === matrixRef.dimension[index];
            });
        }
        return flag;
    }
    public addArrays(arr1: IMatrix<number>, arr2: IMatrix<number>, result: IMatrix<number>) {
        Object.keys(arr1).forEach((value: string, index: number) => {
            if(Array.isArray(arr1[index]) && Array.isArray(arr2[index])) {
                if(!result[index]) result[index] = [];
                this.addArrays(arr1[index] as IMatrix<number>, arr2[index] as IMatrix<number>, result[index] as IMatrix<number>);
            } else {
                result[index] = (arr1[index] as number) + (arr2[index] as number);
            }
        });
    }
    public subtractArrays(arr1: IMatrix<number>, arr2: IMatrix<number>, result: IMatrix<number>) {
        Object.keys(arr1).forEach((value: string, index: number) => {
            if(Array.isArray(arr1[index]) && Array.isArray(arr2[index])) {
                if(!result[index]) result[index] = [];
                this.subtractArrays(arr1[index] as IMatrix<number>, arr2[index] as IMatrix<number>, result[index] as IMatrix<number>);
            } else {
                result[index] = (arr1[index] as number) - (arr2[index] as number);
            }
        });
    }
    public static getInstance() {
        if(!MatrixUtil._instance) {
            MatrixUtil._instance = new MatrixUtil();
        }
        return MatrixUtil._instance;
    }
}

class NumberMatrixUtil {
    private constructor() { }
    private _instance: NumberMatrixUtil;
}

class MatrixGenerator {
    constructor() {}
}