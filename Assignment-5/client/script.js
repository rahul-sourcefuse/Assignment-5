"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var _a;
exports.__esModule = true;
var dat;
function userCreatedDate() {
    return function (target, propertyKey, descriptor) {
        var d = new Date();
        var dt = d.getDate() +
            " " +
            d.toLocaleString("en-US", { month: "long" }) +
            " " +
            d.getFullYear() +
            " Time: " +
            d.getHours() +
            ":" +
            d.getMinutes();
        dat = dt.toString();
    };
}
var env;
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var fetchData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('./env.json')];
                case 1:
                    fetchData = _a.sent();
                    return [4 /*yield*/, fetchData.json()];
                case 2:
                    env = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
function api(url) {
    return fetch(url)
        .then(function (response) {
        return response.json();
    });
}
var User = /** @class */ (function () {
    function User(UsersData) {
        this.UsersData = UsersData;
    }
    User.prototype.addUser = function (arr) {
        var newUser = [];
        for (var i = 0; i < arr.target.length - 1; i++) {
            newUser.push(arr.target[i].value);
        }
        newUser.push(dat);
        //newUser have all details of form data
        var data = {
            "firstName": newUser[0],
            "middleName": newUser[1],
            "lastName": newUser[2],
            "email": newUser[3],
            "phoneNumber": newUser[4],
            "Role": newUser[5],
            "Address": newUser[6],
            "Doj": newUser[7]
        };
        console.log(JSON.stringify(data));
        fetch(env.API_URL, {
            method: "POST", body: JSON.stringify(data), headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function (response) {
            return response.json();
        });
        UsersData.push(newUser);
        var placeholder = document.querySelector("#data-output");
        var out = "";
        out = "<tr>\n<td>" + newUser[0] + " </td>\n<td>" + newUser[1] + "</td>\n<td>" + newUser[2] + "</td>\n<td>" + newUser[3] + "</td>\n<td>" + newUser[4] + "</td>\n<td>" + newUser[5] + "</td>\n<td>" + newUser[6] + "</td>\n<td>" + dat + "</td>\n\n<td id=\"buttons\"><button onclick=\"buttons(this)\">Edit</button> <button onclick=\"removeTr(this)\">Delete</button></button></td>\n</tr>";
        placeholder.innerHTML += out;
        // console.log(out);
        // console.log(user);
    };
    User.prototype.buttons = function (e) {
        console.log('edit button is going to hold');
        var ide = e.parentNode.parentNode;
        var prevData = ide;
        var updatedArr = [];
        console.log(ide.rowIndex + "qwertyui");
        updatedArr.push(ide.rowIndex);
        var len = ide.parentNode.parentNode.rows[0].cells.length;
        // var a=document.getElementById("table")!.rows[ide.rowIndex].cells[0].innerText;
        // console.log(a);
        ide.contentEditable = "true";
        ide.id = "edit";
        console.log("edit");
        document.getElementById("buttons").contentEditable = "false";
        //  var editElem = document.getElementById("edit");
        var saveBtn = document.getElementById("saveid");
        if (!saveBtn) {
            //#myElementID element DOES NOT exist
            var savebutton = document.createElement("button");
            savebutton.innerHTML = "Save";
            savebutton.className = "save";
            savebutton.id = "saveid";
            document.getElementById("btn").appendChild(savebutton);
            savebutton.onclick = function () {
                saveEdits();
                for (var i = 0; i < len - 1; i++) {
                    var a = document.getElementById("table").rows[ide.rowIndex].cells[i].innerText;
                    updatedArr.push(a);
                }
                console.log(updatedArr);
                var data = {
                    "firstName": updatedArr[1],
                    "middleName": updatedArr[2],
                    "lastName": updatedArr[3],
                    "email": updatedArr[4],
                    "phoneNumber": updatedArr[5],
                    "Role": updatedArr[6],
                    "Address": updatedArr[7],
                    "Doj": updatedArr[8]
                };
                fetch(env.API_URL + "/" + updatedArr[0], {
                    method: 'PUT',
                    body: JSON.stringify(data), headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
            };
        }
        var cancelBtn = document.getElementById("cancelid");
        if (!cancelBtn) {
            //#myElementID element DOES NOT exist
            var cancelButton = document.createElement("button");
            cancelButton.innerHTML = "Cancel";
            cancelButton.className = "cancel";
            cancelButton.id = "cancelid";
            document.getElementById("btn").appendChild(cancelButton);
            cancelButton.onclick = function () {
                cancelTr(prevData, this, cancelButton, savebutton);
            };
        }
        function saveEdits() {
            console.log("saveEdits");
            //get the editable element
            var editElem = document.getElementById("edit");
            //get the edited element content
            var userVersion = editElem.innerHTML;
            //save the content to local storage
            localStorage.userEdits = userVersion;
            //write a confirmation to the user
            //   document.getElementById("update").innerHTML="Edits saved!";
            document.getElementById("btn").removeChild(savebutton);
            document.getElementById("btn").removeChild(cancelButton);
            savebutton.addEventListener("click", saveEdits);
        }
    };
    User.prototype.removeTr = function (e) {
        var ide = e.parentNode.parentNode;
        console.log(ide);
        var p = ide.parentNode;
        p.removeChild(ide);
        fetch(env.API_URL + "/" + ide.rowIndex, {
            method: "DELETE",
            headers: { "Content-type": "applicaton/json;charset=UTF-8" }
        });
        // document.getElementById("btn").removeChild(savebutton);
    };
    __decorate([
        userCreatedDate()
    ], User.prototype, "addUser");
    return User;
}());
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["Subscriber"] = "subscriber";
})(Role || (Role = {}));
var UsersData = [];
var columnData = [];
function hideTable() {
    document.getElementById("table").style.visibility = "hidden";
}
function load() {
    return __awaiter(this, void 0, void 0, function () {
        var dataNew, placeholder, out, i, userItem, _i, dataNew_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api(env.API_URL)];
                case 1:
                    dataNew = _a.sent();
                    console.log(dataNew);
                    document.getElementById("load").innerText = "Refresh Data";
                    document.getElementById("table").style.visibility = "visible";
                    placeholder = document.querySelector("#data-output");
                    out = "";
                    i = 0;
                    for (_i = 0, dataNew_1 = dataNew; _i < dataNew_1.length; _i++) {
                        userItem = dataNew_1[_i];
                        // console.log(dataNew[userItem]);
                        // let data:any;
                        // data=Object.values(userItem);
                        // console.log(userItem.firstname);
                        // console.log(data[0]);
                        out += "\n             <tr id=\"t" + i + "\">\n                <td>" + userItem.firstname + " </td>\n                <td>" + userItem.middlename + "</td>\n                <td>" + userItem.lastname + "</td>\n                <td>" + userItem.email + "</td>\n                <td>" + userItem.phonenumber + "</td>\n                <td>" + userItem.role + "</td>\n                <td>" + userItem.address + "</td>\n                <td>" + userItem.dat + "</td>\n                <td id=\"buttons\"><button onclick=\"user.buttons(this)\">Edit</button> <button onclick=\"user.removeTr(this)\">Delete</button></button></td>\n               \n             </tr>\n          ";
                        i++;
                    }
                    placeholder.innerHTML = out;
                    console.log("loaded");
                    return [2 /*return*/];
            }
        });
    });
}
var user = new User(UsersData);
(_a = document.getElementById("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target[5].value in Role) {
        user.addUser(e);
    }
    else {
        alert(e.target[5].value +
            " role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber");
        return;
    }
});
function cancelTr(p, e, btn, sbtn) {
    var index = p.rowIndex;
    console.log(UsersData[index]);
    // console.log(p.cells);
    console.log(UsersData);
    for (var i = 0; i < UsersData[index].length; i++) {
        p.cells[i].innerHTML = UsersData[index][i];
    }
    document.getElementById("btn").removeChild(sbtn);
    document.getElementById("btn").removeChild(btn);
}
