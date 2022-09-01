var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var _a;
let dat;
function userCreatedDate() {
    return function (target, propertyKey, descriptor) {
        let d = new Date();
        let dt = d.getDate() +
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
let env;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let fetchData = yield fetch('./env.json');
        env = yield fetchData.json();
    });
})();
function api(url) {
    return fetch(url)
        .then(response => {
        return response.json();
    });
}
class User {
    constructor(UsersData) {
        this.UsersData = UsersData;
    }
    addUser(arr) {
        let newUser = [];
        for (let i = 0; i < arr.target.length - 1; i++) {
            newUser.push(arr.target[i].value);
        }
        newUser.push(dat);
        //newUser have all details of form data
        let data = {
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
        }).then(response => {
            return response.json();
        });
        UsersData.push(newUser);
        let placeholder = document.querySelector("#data-output");
        var out = "";
        out = `<tr>
<td>${newUser[0]} </td>
<td>${newUser[1]}</td>
<td>${newUser[2]}</td>
<td>${newUser[3]}</td>
<td>${newUser[4]}</td>
<td>${newUser[5]}</td>
<td>${newUser[6]}</td>
<td>${dat}</td>

<td id="buttons"><button onclick="buttons(this)">Edit</button> <button onclick="removeTr(this)">Delete</button></button></td>
</tr>`;
        placeholder.innerHTML += out;
        // console.log(out);
        // console.log(user);
    }
    buttons(e) {
        console.log('edit button is going to hold');
        var ide = e.parentNode.parentNode;
        var prevData = ide;
        let updatedArr = [];
        console.log(ide.rowIndex + "qwertyui");
        updatedArr.push(ide.rowIndex);
        let len = ide.parentNode.parentNode.rows[0].cells.length;
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
                for (let i = 0; i < len - 1; i++) {
                    var a = document.getElementById("table").rows[ide.rowIndex].cells[i].innerText;
                    updatedArr.push(a);
                }
                console.log(updatedArr);
                let data = {
                    "firstName": updatedArr[1],
                    "middleName": updatedArr[2],
                    "lastName": updatedArr[3],
                    "email": updatedArr[4],
                    "phoneNumber": updatedArr[5],
                    "Role": updatedArr[6],
                    "Address": updatedArr[7],
                    "Doj": updatedArr[8]
                };
                fetch(`${env.API_URL}/${updatedArr[0]}`, {
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
    }
    removeTr(e) {
        var ide = e.parentNode.parentNode;
        console.log(ide);
        var p = ide.parentNode;
        p.removeChild(ide);
        fetch(`${env.API_URL}/${ide.rowIndex}`, {
            method: "DELETE",
            headers: { "Content-type": "applicaton/json;charset=UTF-8" }
        });
        // document.getElementById("btn").removeChild(savebutton);
    }
}
__decorate([
    userCreatedDate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], User.prototype, "addUser", null);
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["Subscriber"] = "subscriber";
})(Role || (Role = {}));
let UsersData = [];
let columnData = [];
function hideTable() {
    document.getElementById("table").style.visibility = "hidden";
}
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        let dataNew = yield api(env.API_URL);
        console.log(dataNew);
        document.getElementById("load").innerText = "Refresh Data";
        document.getElementById("table").style.visibility = "visible";
        var placeholder = document.querySelector("#data-output");
        let out = "";
        let i = 0;
        // var myData:any = Object.values(users);
        // for(let i=0;i<myData.length;i++){
        //   let columnData:any=Object.values(myData[i]);
        //   UsersData.push(columnData);
        // }
        // console.log(UsersData);
        let userItem;
        for (userItem of dataNew) {
            // console.log(dataNew[userItem]);
            // let data:any;
            // data=Object.values(userItem);
            // console.log(userItem.firstname);
            // console.log(data[0]);
            out += `
             <tr id="t${i}">
                <td>${userItem.firstname} </td>
                <td>${userItem.middlename}</td>
                <td>${userItem.lastname}</td>
                <td>${userItem.email}</td>
                <td>${userItem.phonenumber}</td>
                <td>${userItem.role}</td>
                <td>${userItem.address}</td>
                <td>${userItem.dat}</td>
                <td id="buttons"><button onclick="user.buttons(this)">Edit</button> <button onclick="user.removeTr(this)">Delete</button></button></td>
               
             </tr>
          `;
            i++;
        }
        placeholder.innerHTML = out;
        console.log("loaded");
    });
}
let user = new User(UsersData);
(_a = document.getElementById("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
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
    for (let i = 0; i < UsersData[index].length; i++) {
        p.cells[i].innerHTML = UsersData[index][i];
    }
    document.getElementById("btn").removeChild(sbtn);
    document.getElementById("btn").removeChild(btn);
}
