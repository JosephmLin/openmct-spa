const clearDiv = (div) => (div.innerHTML = "");

const generateIdCheckboxes = (checkedState, oncheck) => {
  const checkboxDiv = document.getElementById("checkboxes");
  clearDiv(checkboxDiv);
  Object.keys(checkedState).map((id) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.class = "form-check-input";
    input.checked = checkedState[id];
    input.onclick = oncheck(id);
    const label = document.createElement("label");
    label.class = "form-check-label";
    label.innerText = id;
    checkboxDiv.appendChild(input);
    checkboxDiv.appendChild(label);
  });
};

export { generateIdCheckboxes };
