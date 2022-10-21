let dat: string
function userCreatedDate() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    let d: Date = new Date()
    let dt =
      d.getDate() +
      ' ' +
      d.toLocaleString('en-US', { month: 'long' }) +
      ' ' +
      d.getFullYear() +
      ' Time: ' +
      d.getHours() +
      ':' +
      d.getMinutes()
    dat = dt.toString()
  }
}

let env: { API_URL: string }

;(async function () {
  let fetchData = await fetch('./env.json')
  env = await fetchData.json()
})()

function api<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    return response.json()
  })
}

interface UserAction<T> {
  UsersData: Array<Array<string>>
  addUser(refer: any): void
  buttons(e: HTMLTableRowElement): void
  removeTr(e: HTMLButtonElement): void
}

class User<T> implements UserAction<T> {
  constructor(public UsersData: Array<Array<string>>) {}
  @userCreatedDate()
  addUser(arr: any) {
    console.log(arr)
    let newUser: Array<string> = []
    for (let i = 0; i < arr.target.length - 1; i++) {
      newUser.push(arr.target[i].value)
    }
    newUser.push(dat)
    //newUser have all details of form data
    let data = {
      firstName: newUser[0],
      middleName: newUser[1],
      lastName: newUser[2],
      email: newUser[3],
      phoneNumber: newUser[4],
      Role: newUser[5],
      Address: newUser[6],
      Doj: newUser[7],
    }
    // console.log(JSON.stringify(data));

    fetch(env.API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      return response.json()
    })
    UsersData.push(newUser)
    let placeholder = document.querySelector('#data-output')
    var out = ''
    let r = document.getElementById('table') as HTMLTableElement
    // let i=r.rows[r.rows.length-1];
    let t = r.getElementsByTagName('TR')
    let id: any = t[t.length - 1].getAttribute('id')
    // console.log(i);
    id++
    out = `<tr id="${id}">
<td>${newUser[0]} </td>
<td>${newUser[1]}</td>
<td>${newUser[2]}</td>
<td>${newUser[3]}</td>
<td>${newUser[4]}</td>
<td>${newUser[5]}</td>
<td>${newUser[6]}</td>
<td>${dat}</td>

<td id="buttons"><button onclick="buttons(this)">Edit</button> <button onclick="removeTr(this)">Delete</button></button></td>
</tr>`
    placeholder!.innerHTML += out
    console.log(out)
    // console.log(user);
  }
  buttons(e: any) {
    var ide = e.parentNode?.parentNode
    var prevData = ide
    let updatedArr: Array<string> = []
    // console.log(ide);
    // console.log(ide.rowIndex+"qwertyui");
    updatedArr.push(ide?.rowIndex)
    let len = ide?.parentNode.parentNode.rows[0].cells.length
    // var a=document.getElementById("table")!.rows[ide.rowIndex].cells[0].innerText;
    // console.log(a);

    let id = ide.getAttribute('id')
    // console.log(id + "idddddddddddddddddddd");
    ide.contentEditable = 'true'
    ide.id = `${1}`
    console.log('edit')

    document.getElementById('buttons')!.contentEditable = 'false'

    //  var editElem = document.getElementById("edit");
    var saveBtn = document.getElementById('saveid')
    if (!saveBtn) {
      //#myElementID element DOES NOT exist
      var savebutton = document.createElement('button')
      savebutton.innerHTML = 'Save'
      savebutton.className = 'save'
      savebutton.id = 'saveid'

      document.getElementById('btn')!.appendChild(savebutton)
      savebutton.onclick = function () {
        saveEdits()

        // console.log(updatedArr[0] + "refer id");
        for (let i = 0; i < len - 1; i++) {
          var t = document.getElementById('table') as HTMLTableElement
          var a = t.rows[ide.rowIndex].cells[i].innerText
          // console.log(a);
          updatedArr.push(a)
        }
        // console.log(updatedArr);
        let data = {
          firstName: updatedArr[1],
          middleName: updatedArr[2],
          lastName: updatedArr[3],
          email: updatedArr[4],
          phoneNumber: updatedArr[5],
          Role: updatedArr[6],
          Address: updatedArr[7],
          Doj: updatedArr[8],
        }

        fetch(`${env.API_URL}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
      }
    }

    var cancelBtn = document.getElementById('cancelid')
    if (!cancelBtn) {
      //#myElementID element DOES NOT exist

      var cancelButton = document.createElement('button')
      cancelButton.innerHTML = 'Cancel'
      cancelButton.className = 'cancel'
      cancelButton.id = 'cancelid'
      document.getElementById('btn')!.appendChild(cancelButton)

      cancelButton.onclick = function () {
        cancelTr(prevData, cancelButton, savebutton)
      }
    }

    function saveEdits() {
      console.log('saveEdits')

      //get the editable element
      var editElem = document.getElementById('edit')

      //get the edited element content
      // var userVersion = editElem!.innerHTML;

      //save the content to local storage
      // localStorage.userEdits = userVersion;

      //write a confirmation to the user
      //   document.getElementById("update").innerHTML="Edits saved!";
      document.getElementById('btn')!.removeChild(savebutton)

      document.getElementById('btn')!.removeChild(cancelButton)

      savebutton.addEventListener('click', saveEdits)
    }
  }
  removeTr(e: HTMLButtonElement) {
    let ide = e!.parentNode!.parentNode
    // let id=ide.rowIndex;
    let i = document.getElementById('id')?.innerHTML
    // let i = ide!.getAttribute("id") as HTMLElement;
    // console.log(ide.getAttribute('id'),'iddddddddddddddddddddddddddddddd');
    // console.log(ide.rowIndex);
    var p = ide!.parentNode
    p!.removeChild(ide!)
    fetch(`${env.API_URL}/${i}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'applicaton/json;charset=UTF-8' },
    })

    // document.getElementById("btn").removeChild(savebutton);
  }
}

enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'subscriber',
}

let UsersData: Array<Array<string>> = []
let columnData: Array<string> = []

function hideTable() {
  document.getElementById('table')!.style.visibility = 'hidden'
}

async function load() {
  let dataNew: Array<object> = await api(env.API_URL)
  console.log(dataNew)
  document.getElementById('load')!.innerText = 'Refresh Data'
  document.getElementById('table')!.style.visibility = 'visible'

  var placeholder = document.querySelector('#data-output')
  let out = ''
  let i = 1
  let userItem: any
  for (userItem of dataNew) {
    console.log(userItem)
    out += `
             <tr id="${userItem.id}">
                <td>${userItem.firstname} </td>
                <td>${userItem.middlename}</td>
                <td>${userItem.lastname}</td>
                <td>${userItem.email}</td>
                <td>${userItem.phonenumber}</td>
                <td>${userItem.role}</td>
                <td>${userItem.address}</td>
                <td>${userItem.doj}
                </td>
                <td id="buttons"><button onclick="user.buttons(this)">Edit</button> <button onclick="user.removeTr(this)">Delete</button></button></td>
             </tr>
          `
    i++
  }
  placeholder!.innerHTML = out
  console.log('loaded')
}

let user = new User(UsersData)

document.getElementById('form')?.addEventListener('submit', (e: any) => {
  e.preventDefault()
  if (e.target[5].value in Role) {
    user.addUser(e)
  } else {
    alert(
      e!.target[5].value +
        ' role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber',
    )
    return
  }
})

function cancelTr(
  p: HTMLTableRowElement,
  btn: HTMLButtonElement,
  sbtn: HTMLButtonElement,
) {
  var index = p.rowIndex
  console.log(UsersData[index])

  // console.log(p.cells);
  console.log(UsersData)

  for (let i = 0; i < UsersData[index].length; i++) {
    p.cells[i].innerHTML = UsersData[index][i]
  }
  document.getElementById('btn')!.removeChild(sbtn)
  document.getElementById('btn')!.removeChild(btn)
}
