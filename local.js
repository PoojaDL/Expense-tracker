// Fetching the document element
const expenditure = document.querySelector("#expense");
const description = document.querySelector("#description");
const category = document.querySelector(".category");
const btn = document.querySelector(".btn");
const ul = document.querySelector(".listOfItems");
const buttonDiv = document.querySelector(".button-class");


let lists = [];
var i = 0;

// function to execute after submit
function myfunction(event) {
  event.preventDefault();

  let expenses = expense.value;
  let descSelected = description.value;
  let catSelected = category.options[category.selectedIndex].text;

  if (expenses && descSelected && catSelected) {
    let list = {
      id: i,
      expense: expenses,
      describe: descSelected,
      categ: catSelected
    }

    lists.push(list);
    localStorage.setItem("lists" + (i++), (list.expense + "-" + list.describe + "-" + list.categ+" :"));
    document.querySelector('form').reset();
    showData();
  }
  else {
    alert("Enter data to continue !");
  }
}

//function to delete list

function deletebutton(e) {
  console.log(e);
  nameOfbtn = e.target.attributes[2].nodeValue;
  btnNumber = (nameOfbtn.slice(6, ));
  const item = localStorage.removeItem("lists" + (btnNumber));
  showData();
}

//function to edit list

function editbutton(e) {
  console.log(e);
  nameOfbtn = e.target.attributes[2].nodeValue;
  btnNumber = (nameOfbtn.slice(4, ));
  let replaceWith = prompt("Enter the values as aaaa-bbbb-cccc");
  const item = localStorage.setItem("lists" + (btnNumber), replaceWith);
  showData();
}

// function to print list

function showData() {
  //emptying ul on load, guess thats why not showing anything after refresh
  ul.innerHTML = "";
  count = 0;
  for (let j = 0; j < i; j++) {
    //appending list
    let li = document.createElement('li');
    li.textContent = JSON.stringify(localStorage.getItem("lists" + (j)));
    ul.appendChild(li);
    //appending delete button
    const editbtn = document.createElement('input');
    editbtn.setAttribute('type', 'button');
    editbtn.setAttribute('value', 'edit');
    editbtn.setAttribute('name', 'edit' + (count));
    editbtn.setAttribute('onclick', 'editbutton(event)');
    li.append(editbtn);
    //appending edit button
    const deletebtn = document.createElement('input');
    deletebtn.setAttribute('type', 'button');
    deletebtn.setAttribute('value', 'delete');
    deletebtn.setAttribute('name', 'delete' + (count));
    deletebtn.setAttribute('onclick', 'deletebutton(event)');
    li.appendChild(deletebtn);
    count++;
    //removing while list when deleted
    if (li.textContent === 'null') {
      li.style.display = "none";
    }
  }
};
