let root = document.querySelector(':root');

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
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

function toggleDisplayMode() { // darkMode - lightMode
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

// generate the selections based on a constant!
// <option>micrometre (µm)</option>
// <option>millimetre (mm)</option>
// <option>centimetre (cm)</option>
// <option>decimetre (dm)</option>
// <option>metre (m)</option>
// <option>decametre (dam)</option>
// <option>hectometre (hm)</option>
// <option>kilometre (km)</option>
// <option>inch (in)</option>
// <option>foot (ft)</option>
// <option>yard (yd)</option>
// <option>mile (mi)</option>
// <option>nautical mile (nmi)</option>