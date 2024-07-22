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

let root = document.querySelector(":root");

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
    // TODO: find some lightMode colors
  } else {
    // already lightMode => set darkMode
    root.style.setProperty("--bgColor", "#1c1e1f");
    root.style.setProperty("--selectBgColor", "#21282c");
    root.style.setProperty("--selectActiveColor", "#353f46");
    root.style.setProperty("--tabBgColor", "#313b42");

    root.style.setProperty("--textColor", "#e1e2e3");
    root.style.setProperty("--borderColor", "#e1e2e3");
  }
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

// TODO: finish units.json
// TODO: add "swap unit arrow button thing"
// TODO: clear Input When Reloading
