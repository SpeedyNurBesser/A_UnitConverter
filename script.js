let root = document.querySelector(":root");
let units = null;

async function loadUnits() {
  units = await fetch("./units.json")
    .then((response) => response.json())
    .then((json) => json);

  createSelectOptions("LengthSelect", units.LengthUnits);
  createSelectOptions("AreaSelect", units.AreaUnits);
  createSelectOptions("VolumeSelect", units.VolumeUnits);
  createSelectOptions("TimeSelect", units.TimeUnits);
  createSelectOptions("MassSelect", units.MassUnits);
  createSelectOptions("VelocitySelect", units.VelocityUnits);
}
loadUnits();

function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

function toggleDisplayMode() {
  let bgColor = getComputedStyle(root).getPropertyValue("--bgColor");

  if (bgColor == "#1c1e1f") {
    // already darkMode => set lightMode
    root.style.setProperty("--bgColor", "#f7f8f9");
    root.style.setProperty("--selectBgColor", "#f1f2f4");
    root.style.setProperty("--selectActiveColor", "#b3b9c4");
    root.style.setProperty("--tabBgColor", "#dcdfe4");

    root.style.setProperty("--textColor", "#1c1e1f");
    root.style.setProperty("--borderColor", "#1c1e1f");
    root.style.setProperty("--headingColor", "#161a1d");

    document.getElementById("DisplayMode").innerHTML = "<b>&#9790;</b>";
  } else {
    // already lightMode => set darkMode
    root.style.setProperty("--bgColor", "#1c1e1f");
    root.style.setProperty("--selectBgColor", "#21282c");
    root.style.setProperty("--selectActiveColor", "#353f46");
    root.style.setProperty("--tabBgColor", "#313b42");

    root.style.setProperty("--textColor", "#e1e2e3");
    root.style.setProperty("--borderColor", "#e1e2e3");
    root.style.setProperty("--headingColor", "#f3a96a");

    document.getElementById("DisplayMode").innerHTML = "<b>&#9788;</b>";
  }
}

function swapSelectValues(selectId1, selectId2) {
  let element1 = document.getElementById(selectId1);
  let element2 = document.getElementById(selectId2);

  let value1 = element1.value;
  let value2 = element2.value;

  element1.value = value2;
  element2.value = value1;
}

function createSelectOptions(selectClass, optionsToCreate) {
  let select = document.querySelectorAll("select." + selectClass);

  for (let i = 0; i < select.length; i++) {
    for (let option = 0; option < optionsToCreate.length; option++) {
      let opt = document.createElement("option");
      opt.innerHTML = optionsToCreate[option].displayName;
      select[i].appendChild(opt);
    }
  }
}

async function convert(unitType, number, unit1, unit2, displayId) {
  if (number == "") {
    return;
  }
  // unitType = nameOfJsonNamespace
  let json = units[unitType];

  for (option in json) {
    if (json[option].displayName == unit1) {
      var toBase = json[option].toBase;
    }
  }

  for (option in json) {
    if (json[option].displayName == unit2) {
      var fromBase = json[option].fromBase;
    }
  }

  // calculate number toBase
  let result = number * toBase;
  // calculate result fromBase
  result = result * fromBase;
  // display result
  document.getElementById(displayId).value = result;
}

window.onload = function () {
  document.getElementById("LengthInput1").value = "";
  document.getElementById("LengthInput2").value = "";

  document.getElementById("AreaInput1").value = "";
  document.getElementById("AreaInput2").value = "";

  document.getElementById("VolumeInput1").value = "";
  document.getElementById("VolumeInput2").value = "";

  document.getElementById("TimeInput1").value = "";
  document.getElementById("TimeInput2").value = "";

  document.getElementById("MassInput1").value = "";
  document.getElementById("MassInput2").value = "";
};

// TODO: finish units.json
// TODO: add copy result
