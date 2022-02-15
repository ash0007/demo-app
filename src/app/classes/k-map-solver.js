"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.solve = exports.KMapGrayCodes = void 0;
exports.KMapGrayCodes = new Map([
    [
        2, {
            rows: ['0', '1'],
            cols: ['0', '1']
        }
    ],
    [
        3, {
            rows: ['00', '01', '11', '10'],
            cols: ['0', '1']
        }
    ],
    [
        4, {
            rows: ['00', '01', '11', '10'],
            cols: ['00', '01', '11', '10']
        }
    ]
]);
var getKMap = function (variables) {
    var KMap = [];
    var grayCodes = exports.KMapGrayCodes.get(variables.length);
    if (!grayCodes)
        return KMap;
    var rows = grayCodes.rows, cols = grayCodes.cols;
    for (var row = 0; row < rows.length; row++) {
        KMap.push([]);
        for (var col = 0; col < cols.length; col++) {
            var binary = "".concat(rows[row]).concat(cols[col]);
            var decimal = parseInt(binary, 2);
            KMap[row].push({ binary: binary, decimal: decimal, row: row, col: col });
        }
    }
    return KMap;
};
var findDecimalPos = function (decimal, KMap) {
    for (var row = 0; row < KMap.length; row++) {
        for (var col = 0; col < KMap[0].length; col++) {
            if (decimal == KMap[row][col].decimal)
                return { row: row, col: col };
        }
    }
    return { row: 0, col: 0 };
};
var generateRegions = function (rowCount, colCount) {
    var regions = [];
    for (var w = 1; w <= colCount; w = w * 2) {
        for (var h = 1; h <= rowCount; h = h * 2) {
            regions.push({ w: w, h: h });
            if ((w == 1 && h == 1) || (w == colCount && h == rowCount)) {
                continue;
            }
            if (w == h) {
                regions.push({ w: -w, h: h });
                regions.push({ w: -w, h: -h });
                regions.push({ w: w, h: -h });
                continue;
            }
            if (w > h) {
                regions.push({ w: -w, h: h });
                if (h != 1) {
                    regions.push({ w: w, h: -h });
                    regions.push({ w: -w, h: -h });
                }
                continue;
            }
            if (w < h) {
                regions.push({ w: w, h: -h });
                if (w != 1) {
                    regions.push({ w: -w, h: h });
                    regions.push({ w: -w, h: -h });
                }
                continue;
            }
        }
    }
    return regions.sort(function (a, b) {
        var area_a = Math.abs(a.w * a.h);
        var area_b = Math.abs(b.w * b.h);
        return area_a - area_b;
    });
};
var group = function (decimal, terms, KMap, termQueue) {
    var rowCount = KMap.length;
    var colCount = KMap[0].length;
    var _a = findDecimalPos(decimal, KMap), row = _a.row, col = _a.col;
    var regions = generateRegions(rowCount, colCount);
    var checkRegion = function (w, h) {
        var cells = [];
        var r = 0;
        while (r != h) {
            var curRow = (row + r) % rowCount >= 0 ?
                (row + r) % rowCount :
                rowCount + ((row + r) % rowCount);
            var c = 0;
            while (c != w) {
                var curCol = (col + c) % colCount >= 0 ?
                    (col + c) % colCount :
                    colCount + ((col + c) % colCount);
                if (terms.indexOf(KMap[curRow][curCol].decimal) == -1)
                    return false;
                cells.push(KMap[curRow][curCol]);
                w < 0 ? c-- : c++;
            }
            h < 0 ? r-- : r++;
        }
        return cells;
    };
    var composedGroups = [[KMap[row][col]]];
    for (var i = 0; i < regions.length; i++) {
        var _b = regions[i], w = _b.w, h = _b.h;
        var cells = checkRegion(w, h);
        if (!cells)
            continue;
        if (cells.length > composedGroups[0].length) {
            composedGroups = [__spreadArray([], cells, true)];
            continue;
        }
        if (cells.length == composedGroups[0].length) {
            composedGroups = __spreadArray(__spreadArray([], composedGroups, true), [__spreadArray([], cells, true)], false);
            continue;
        }
    }
    var groupsThatContainCellsGrouppedBefore = [];
    for (var i = 0; i < composedGroups.length; i++) {
        var cellsGrouppedBefore = composedGroups[i].filter(function (cell) { return !termQueue.includes(cell.decimal); });
        if (cellsGrouppedBefore.length > 0) {
            groupsThatContainCellsGrouppedBefore.push(i);
        }
    }
    if (groupsThatContainCellsGrouppedBefore.length > 0 && groupsThatContainCellsGrouppedBefore.length != composedGroups.length) {
        return composedGroups.filter(function (_, i) { return !groupsThatContainCellsGrouppedBefore.includes(i); })[0];
    }
    return composedGroups[0];
};
var extract = function (variables, group) {
    var buffer = group[0].binary.split('');
    var expression = '';
    for (var i = 1; i < group.length; i++) {
        var binary = group[i].binary.split('');
        for (var j = 0; j < binary.length; j++) {
            if (binary[j] != buffer[j])
                buffer[j] = 'X';
        }
    }
    for (var i = 0; i < buffer.length; i++) {
        var value = buffer[i];
        if (value != 'X') {
            expression += value == '0' ? "".concat(variables[i], "'") : "".concat(variables[i]);
        }
    }
    return expression;
};
var solve = function (variables, minterms, dontcares) {
    if (dontcares === void 0) { dontcares = []; }
    var KMap = getKMap(variables);
    var groups = [];
    var expressions = [];
    var termQueue = __spreadArray([], minterms, true);
    var _loop_1 = function () {
        var term = termQueue[0];
        if (term < 0 || term > variables.length * variables.length - 1) {
            termQueue = termQueue.filter(function (_term) { return _term != term; });
            return "continue";
        }
        var cells = group(term, minterms, KMap, termQueue);
        if (dontcares.length > 0) {
            var dc_cells = group(term, __spreadArray(__spreadArray([], minterms, true), dontcares, true), KMap, termQueue);
            if (dc_cells.length > cells.length)
                cells = dc_cells;
        }
        groups.push(cells);
        termQueue = termQueue.filter(function (term) { return !cells.map(function (cell) { return cell.decimal; }).includes(term); });
        var expression = extract(variables, cells);
        expressions.push(expression);
    };
    while (termQueue.length > 0) {
        _loop_1();
    }
    var total_expression = expressions.join('+');
    return {
        groups: groups,
        expression: total_expression == '' ? '1' : total_expression
    };
};
exports.solve = solve;
module.exports = {
    solve: exports.solve,
    KMapGrayCodes: exports.KMapGrayCodes
};
