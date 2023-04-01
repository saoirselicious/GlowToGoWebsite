initSetup();

let category;

function initSetup() {
  console.log("setup");

  fetchJSON().then(json => {
    for (let i = 0; i < Object.keys(json[0]).length; i++) {
      category = Object.keys(json[0])[i];
      let categoryList = document.createElement("li");
      let button = document.createElement("Button");
      let categoryTextElem = document.createTextNode(category);

      categoryList.classList.add("nav-item");
      button.classList.add("btn", "nav-link", "shadow-none");
      button.setAttribute("id", "Btn" + category);
      button.onclick = function () { showHideCatList(this.id.replace("Btn", "")); }
      categoryList.appendChild(button);
      button.appendChild(categoryTextElem);
      document.getElementById("categoryList").appendChild(categoryList);

      let optionsUL = document.createElement("table");
      let tbody = document.createElement("tbody");
      optionsUL.classList.add("table",  "table-borderless");
      if (i > 0) {
        optionsUL.style.display = "none";
      }
      optionsUL.setAttribute("id", "UL" + category);

      for (let i = 0; i < Object.keys(json[0][category]).length; i++) {
        let optionList = document.createElement("tr");
        let optionLink = document.createElement("td");
        let optionButton = document.createElement("button");
        let cost = document.createElement("td");
        let optionsText = document.createTextNode(json[0][category][i]["Name"]);
        let costText = document.createTextNode("Euro: " + json[0][category][i]["Cost"]);

        optionButton.setAttribute("id", json[0][category][i]["Name"]);
        //optionLink.classList.add("text-left");
        optionButton.onclick = function () { setOptionDetails(this.id); }
        optionButton.classList.add("btn", "btn-sm", "btn-primary-outline", "shadow-none");
        optionButton.appendChild(optionsText);
        optionLink.appendChild(optionButton);
        cost.appendChild(costText);

        optionList.appendChild(optionLink);
        optionList.appendChild(cost);
        //optionList.classList.add("list-group", "list-group-item-border-0");

        tbody.appendChild(optionList);
        optionsUL.appendChild(tbody);
        document.getElementById("divOptions").appendChild(optionsUL);
      }
    }
    category = Object.keys(json[0])[0];
  });
}

function showHideCatList(selectedButtonID) {
  console.log("showHideCatList");
  if (category !== selectedButtonID) {
    document.getElementById("UL" + category).style.display = "none";
    document.getElementById("UL" + selectedButtonID).style.display = "Block";
    category = selectedButtonID;
  }
}

async function fetchJSON() {
  console.log(fetchJSON);
  const response = await fetch('../json/list.json');
  const json = await response.json();
  return json;
}

function setOptionDetails(selectedOptionID) {
  console.log("setOptionDetails")
  fetchJSON().then(json => {
    console.log(json[0][category]);
    removeAllChildNodes(document.getElementById("divOptionInfo"));
    let header = document.createElement("h3");
    let headerText = document.createTextNode(selectedOptionID);
    header.appendChild(headerText);

    for (let i = 0; i < Object.keys(json[0][category]).length; i++) {
      if (json[0][category][i]["Name"] == selectedOptionID) {
        if (json[0][category][i].hasOwnProperty('Add_Text')) {
          console.log(json[0][category][i]["Add_Text"]);
          let para = document.createElement("a");
          let paraText = document.createTextNode(json[0][category][i]["Add_Text"]);
          para.appendChild(paraText);
          document.getElementById("divOptionInfo").appendChild(header);
          document.getElementById("divOptionInfo").appendChild(para);
          return;
        }
        else {
          document.getElementById("divOptionInfo").appendChild(header);
          return;
        }
      }
    }

  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}