console.log("Js File : utilities.js");

/* ..........
    Function : Get Input-Field Value-String By Id 
.......... */
function getInputFieldValueStringById(inputFieldId) {
  const inputField = document.getElementById(inputFieldId);
  const inputFieldValueString = inputField.value;

  inputField.value = "";

  return inputFieldValueString;
}

/* ..........
    Function : Get Input-Field Value By Id 
.......... */
function getInputFieldValueById(inputFieldId) {
  const inputField = document.getElementById(inputFieldId);
  const inputFieldValue = parseFloat(inputField.value);

  inputField.value = "";

  return inputFieldValue;
}

/* ..........
    Function : Get Text-Element Value-String By Id 
.......... */
function getTextElementValueStringById(textElementId) {
  const textElement = document.getElementById(textElementId);
  const textElementValueString = textElement.innerText;

  return textElementValueString;
}

/* ..........
    Function : Get Text-Element Value By Id 
.......... */
function getTextElementValueById(textElementId) {
  const textElementValue = parseFloat(
    getTextElementValueStringById(textElementId)
  );

  return textElementValue;
}

/* ..........
    Function : Set Input-Field Value By Id 
.......... */
function setInputFieldValueById(inputFieldId, newValue) {
  const inputField = document.getElementById(inputFieldId);

  inputField.value = newValue;
}

/* ..........
    Function : Set Text-Element Value By Id 
.......... */
function setTextElementValueById(textElementId, newValue) {
  const textElement = document.getElementById(textElementId);

  textElement.innerText = newValue;
}

/* ..........
    Function : Value Reset
.......... */
function resetInnerHtmlComponent(innerHtml_Component_Id, newValueString) {
  const innerHtml_Component = document.getElementById(innerHtml_Component_Id);
  innerHtml_Component.innerHTML = newValueString;
}

function resetInnerTextComponent(innerText_Component_Id, newValueString) {
  const innerText_Component = document.getElementById(innerText_Component_Id);
  innerText_Component.innerText = newValueString;
}

function resetInputFieldComponent(inputField_Component_Id, newValue) {
  const inputField_Component = document.getElementById(inputField_Component_Id);
  inputField_Component.value = newValue;
}
