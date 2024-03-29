//initSetup();

let category ="massage";
var formSelector = "form_" + category;
const formControl = document.querySelector("#form_category");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    console.log("removeAllChildNodes");
      parent.removeChild(parent.firstChild);
  }
}

function showHideCatList(selectedButtonID) {
  console.log(selectedButtonID);
  if (category !== selectedButtonID) {
    document.getElementById("ul_"+category).style.display = "none";
    document.getElementById("ul_"+selectedButtonID).style.display = "Block";
  
    document.getElementById("form_"+category).style.display = "none";
    document.getElementById("form_"+selectedButtonID).style.display = "Block";
    category = selectedButtonID;
    formSelector = "form_" + category;

    document.getElementById("imageWeb").src="images\\services\\"+category+".jpg"; 
    document.getElementById("imageMobile").src="images\\services\\"+category+".jpg"; 

    console.log(formControl);
    formControl.value = category
    //rerunSelectCat(category)
  }
}

function setOptionDetails(selectedOptionID) {
  fetchJSON().then(json => {
    removeAllChildNodes(document.getElementById("divOptionInfoMobile"));
    removeAllChildNodes(document.getElementById("divOptionInfoDesktop"));
    let header = document.createElement("h3");
    let headerText = document.createTextNode(selectedOptionID);
    header.appendChild(headerText);
    for (let i = 0; i < Object.keys(json[category.replace(/_/g, ' ')]).length; i++) {
      if (json[category.replace(/_/g, ' ')][i]["Name"] == selectedOptionID) {

        if (json[category.replace(/_/g, ' ')][i].hasOwnProperty('Add_Text')) {
          let para = document.createElement("a");
          let paraText = document.createTextNode(json[category.replace(/_/g, ' ')][i]["Add_Text"]);
          para.appendChild(paraText);
          document.getElementById("divOptionInfoMobile").appendChild(header.cloneNode(true));
          document.getElementById("divOptionInfoMobile").appendChild(para.cloneNode(true));
          document.getElementById("divOptionInfoDesktop").appendChild(header);
          document.getElementById("divOptionInfoDesktop").appendChild(para);
          if (json[category.replace(/_/g, ' ')][i].hasOwnProperty('Length')) {
            let lengthTime = document.createElement("p");
            let lengthTimeText = document.createTextNode("Length: " + json[category.replace(/_/g, ' ')][i]["Length"] + " minutes");
            lengthTime.appendChild(lengthTimeText);
            document.getElementById("divOptionInfoMobile").appendChild(lengthTime.cloneNode(true));
            document.getElementById("divOptionInfoDesktop").appendChild(lengthTime);
          }
        }
        else {
          document.getElementById("divOptionInfoMobile").appendChild(header.cloneNode(true));
          document.getElementById("divOptionInfoDesktop").appendChild(header);
          if (json[category.replace(/_/g, ' ')][i].hasOwnProperty('Length')) {
            let lengthTime = document.createElement("p");
            let lengthTimeText = document.createTextNode("Length: " + json[category.replace(/_/g, ' ')][i]["Length"] + " minutes");
            lengthTime.appendChild(lengthTimeText);
            document.getElementById("divOptionInfoMobile").appendChild(lengthTime.cloneNode(true));
            document.getElementById("divOptionInfoDesktop").appendChild(lengthTime);
          }
        }
        return;
      }
    }
  });
}

let selectOptions=document.getElementById("form_options"); 

function rerunSelectCat(selectedCategory){
  selectedCategory=selectedCategory;
  console.log("ul_"+category, " " ,"ul_"+selectedCategory);

  document.getElementById("ul_"+category).style.display = "none";
  document.getElementById("ul_"+selectedCategory).style.display = "Block";

  document.getElementById("form_"+category).style.display = "none";
  document.getElementById("form_"+selectedCategory).style.display = "Block";
  category = selectedCategory;
  formSelector = "form_" + category;
  //showHideCatList("ul_"+category);

  document.getElementById("imageWeb").src="images\\services\\"+category+".jpg"; 
  document.getElementById("imageMobile").src="images\\services\\"+category+".jpg";

  //setOptionDetails(category);
}

async function fetchJSON(){
  const response = await fetch("_data/list.json");
  const json = await response.json();
  console.log(json);
  return json;
}

console.log("prices");