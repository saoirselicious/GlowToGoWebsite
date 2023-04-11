//initSetup();

let category ="Massage";


function showHideCatList(selectedButtonID) {
  console.log(selectedButtonID);
  if ("ul_"+category !== selectedButtonID) {
    document.getElementById("ul_"+category).style.display = "none";
    document.getElementById(selectedButtonID).style.display = "Block";
  
    document.getElementById("form_"+category).style.display = "none";
    document.getElementById(selectedButtonID.replace("form","ul")).style.display = "Block";
    category = selectedButtonID.replace("ul_","");
  }
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

$("#form_category").change(function () {
  rerunSelectCat($(this).val());
});

let selectOptions=document.getElementById("form_options"); 

function rerunSelectCat(selectedCategory){
  console.log(selectedCategory);

  document.getElementById("ul_"+category).style.display = "none";
  document.getElementById("ul_"+selectedCategory).style.display = "Block";

  document.getElementById("form_"+category).style.display = "none";
  document.getElementById("form_"+selectedCategory).style.display = "Block";
  category = selectedCategory.replace("form_", "");
}

