"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var database_1 = require("../database");
exports.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.pool.query('SELECT * from userstable')];
            case 1:
                response = _a.sent();
                return [2 /*return*/, res.status(200).send(response.rows)];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, database_1.pool.query('SELECT * from userstable where id= $1', [id])];
            case 1:
                response = _a.sent();
                return [2 /*return*/, res.status(200).send(response.rows)];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, middleName, lastName, email, phoneNumber, Role, Address, Doj, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, email = _a.email, phoneNumber = _a.phoneNumber, Role = _a.Role, Address = _a.Address, Doj = _a.Doj;
                return [4 /*yield*/, database_1.pool.query('INSERT INTO userstable (firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj)VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [firstName, middleName, lastName, email, phoneNumber, Role, Address, Doj])];
            case 1:
                _b.sent();
                return [2 /*return*/, res.json({
                        message: 'User created Successfully',
                        body: {
                            user: {
                                firstName: firstName,
                                middleName: middleName,
                                lastName: lastName,
                                email: email,
                                phoneNumber: phoneNumber,
                                Role: Role,
                                Address: Address,
                                Doj: Doj
                            }
                        }
                    })];
            case 2:
                e_3 = _b.sent();
                console.log(e_3);
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, firstName, middleName, lastName, email, phoneNumber, Role, Address, Doj, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, email = _a.email, phoneNumber = _a.phoneNumber, Role = _a.Role, Address = _a.Address, Doj = _a.Doj;
                return [4 /*yield*/, database_1.pool.query('UPDATE userstable SET firstName = $1, middleName  = $2, lastName = $3 ,email = $4 ,phoneNumber = $5 ,Role = $6 , Address  = $7 ,Doj = $8 where id= $9', [firstName, middleName, lastName, email, phoneNumber, Role, Address, Doj, id])];
            case 1:
                _b.sent();
                return [2 /*return*/, res.json("User " + id + " updated successfully")];
            case 2:
                e_4 = _b.sent();
                console.log(e_4);
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, database_1.pool.query('DELETE FROM userstable WHERE id= $1', [id])];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json("User " + id + " deleted successfully")];
            case 2:
                e_5 = _a.sent();
                console.log(e_5);
                return [2 /*return*/, res.status(500).json('Internal Server Error')];
            case 3: return [2 /*return*/];
        }
    });
}); };
