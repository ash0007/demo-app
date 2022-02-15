var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DEFAULT_DEPTH = 0;
var DEFAULT_DIMENSION = [];
var ErrorMsg;
(function (ErrorMsg) {
    ErrorMsg["INVALID_MATRIX"] = "Invalid Matrices";
    ErrorMsg["INVALID_MATRIX_DIMENSION"] = "Invalid matrix dimensions";
    ErrorMsg["MULTIPLICATION_NOT_VALID"] = "Multiplication is not valid";
})(ErrorMsg || (ErrorMsg = {}));
;
var Matrix = /** @class */ (function () {
    function Matrix(input1, input2) {
        if (!input1) {
            this._depth = DEFAULT_DEPTH;
            this._dimension = DEFAULT_DIMENSION;
        }
        else if (!input2) {
            if (typeof input1 === 'number') {
                this._depth = input1;
                this._dimension = Array.from({ length: this._depth }).fill(0);
            }
            if (Array.isArray(input1)) {
                this._depth = input1.length;
                this._dimension = input1;
            }
        }
        else {
            this._depth = input1;
            this._dimension = input2;
        }
        // var utilProps = Object.getPrototypeOf(MatrixUtil.getInstance());
        // for (var prop in utilProps) {
        //     this.setPrototypeOf[prop] = utilProps[prop];
        // }
        // Object.assign(this, MatrixUtil.getInstance());
        // console.log(MatrixUtil.getInstance());
    }
    Object.defineProperty(Matrix.prototype, "depth", {
        get: function () {
            return this._depth;
        },
        set: function (depth) {
            this._depth = depth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "dimension", {
        get: function () {
            return this._dimension;
        },
        set: function (dimension) {
            this._depth = this._dimension.length;
            this._dimension = dimension;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "matrix", {
        get: function () {
            return this._matrix;
        },
        set: function (matrix) {
            this.depth = 0;
            this.depth = this.getDepthFromMatrix(matrix);
            this.dimension = Array.from({ length: this._depth }).fill(0);
            this.dimension = this.getDimensionFromMatrix(matrix, 0);
            this._matrix = matrix;
        },
        enumerable: false,
        configurable: true
    });
    Matrix.prototype.getDepthFromMatrix = function (matrix) {
        if (Array.isArray(matrix)) {
            this.depth++;
            this.getDepthFromMatrix(matrix[0]);
        }
        return this.depth;
    };
    Matrix.prototype.getDimensionFromMatrix = function (matrix, i) {
        if (Array.isArray(matrix)) {
            this.dimension[i++] = matrix.length;
            this.getDimensionFromMatrix(matrix[0], i);
        }
        return this.dimension;
    };
    return Matrix;
}());
var NumberMatrix = /** @class */ (function (_super) {
    __extends(NumberMatrix, _super);
    function NumberMatrix(input1, input2) {
        var _this = this;
        if (!input1) {
            _this = _super.call(this) || this;
        }
        else if (!input2) {
            if (typeof input1 === 'number') {
                _this = _super.call(this, input1) || this;
            }
            else {
                _this = _super.call(this, input1) || this;
            }
        }
        else {
            _this = _super.call(this, input1, input2) || this;
        }
        return _this;
        // this.rows = this.matrix.length;
    }
    NumberMatrix.prototype.add = function (matrixRef) {
        var result = [];
        if (this.depth < 1 || matrixRef.depth < 1) {
            throw ErrorMsg.INVALID_MATRIX;
        }
        if (matrixRef.isDimensionSame(this)) {
            this.addArrays(matrixRef.matrix, this.matrix, result);
            return this.getResultant(result);
        }
        else {
            throw ErrorMsg.INVALID_MATRIX_DIMENSION;
        }
    };
    NumberMatrix.prototype.subtract = function (matrixRef) {
        var result = [];
        if (this.depth < 1 || matrixRef.depth < 1) {
            throw ErrorMsg.INVALID_MATRIX;
        }
        if (matrixRef.isDimensionSame(this)) {
            this.subtractArrays(matrixRef.matrix, this.matrix, result);
            return this.getResultant(result);
        }
        else {
            throw ErrorMsg.INVALID_MATRIX_DIMENSION;
        }
    };
    NumberMatrix.prototype.multiply = function (matrixRef) {
        if (this.matrix.length === matrixRef.matrix[0].length) {
        }
        else {
            throw ErrorMsg.MULTIPLICATION_NOT_VALID;
        }
        return null;
    };
    NumberMatrix.prototype.transpose = function () {
        if (this.depth < 1) {
            throw ErrorMsg.INVALID_MATRIX;
        }
        return null;
    };
    NumberMatrix.prototype.getResultant = function (result) {
        var resultant = new Matrix(this.depth, this.dimension);
        resultant.matrix = result;
        return resultant;
    };
    return NumberMatrix;
}(Matrix));
var MatrixUtil = /** @class */ (function () {
    function MatrixUtil() {
    }
    MatrixUtil.prototype.isDimensionSame = function (matrixRef) {
        var that = this;
        var flag = that.dimension.length === matrixRef.dimension.length;
        if (flag) {
            that.dimension.forEach(function (element, index) {
                flag = element === matrixRef.dimension[index];
            });
        }
        return flag;
    };
    MatrixUtil.prototype.addArrays = function (arr1, arr2, result) {
        var _this = this;
        Object.keys(arr1).forEach(function (value, index) {
            if (Array.isArray(arr1[index]) && Array.isArray(arr2[index])) {
                if (!result[index])
                    result[index] = [];
                _this.addArrays(arr1[index], arr2[index], result[index]);
            }
            else {
                result[index] = arr1[index] + arr2[index];
            }
        });
    };
    MatrixUtil.prototype.subtractArrays = function (arr1, arr2, result) {
        var _this = this;
        Object.keys(arr1).forEach(function (value, index) {
            if (Array.isArray(arr1[index]) && Array.isArray(arr2[index])) {
                if (!result[index])
                    result[index] = [];
                _this.subtractArrays(arr1[index], arr2[index], result[index]);
            }
            else {
                result[index] = arr1[index] - arr2[index];
            }
        });
    };
    MatrixUtil.getInstance = function () {
        if (!MatrixUtil._instance) {
            MatrixUtil._instance = new MatrixUtil();
        }
        return MatrixUtil._instance;
    };
    return MatrixUtil;
}());
var MatrixGenerator = /** @class */ (function () {
    function MatrixGenerator() {
    }
    return MatrixGenerator;
}());
