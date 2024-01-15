//Managing options selections
const activeCellElement = document.getElementById("active-cell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldBtn = document.getElementById("bold");
const italicBtn = document.getElementById("italic");
const underlineBtn = document.getElementById("underline");
const fontFamily = document.getElementById("font-family");

let activeCell = null;

const defaultOptionsState = {
  fontfamily: "",
  isBoldSelected: false,
  isItalicSelected: false,
  isUnderLineSelected: false,
  textAlign: "left", //it can be left, center, right, by default its set to left
  textColor: "#000",
  backgroundColor: "#fff",
  fontSize: 14,
};

let activeOptionsState;

function highlightFocusOnOptions() {
  //check bold highlight
  if (
    activeOptionsState.isBoldSelected &&
    !boldBtn.classList.contains("active-option")
  ) {
    boldBtn.classList.add("active-option");
    boldBtn.style.fontWeight = "700";
  } else {
    boldBtn.classList.remove("active-option");
    boldBtn.style.fontWeight = "400";
  }

  //check italic highlight
  if (
    activeOptionsState.isItalicSelected &&
    !italicBtn.classList.contains("active-option")
  ) {
    italicBtn.classList.add("active-option");
    italicBtn.style.fontStyle = "italic";
  } else {
    italicBtn.classList.remove("active-option");
    italicBtn.style.fontStyle = "normal";
  }

  //check underline
  if (
    activeOptionsState.isUnderLineSelected &&
    !underlineBtn.classList.contains("active-option")
  ) {
    underlineBtn.classList.add("active-option");
    underlineBtn.style.textDecoration = "underline";
  } else {
    underlineBtn.classList.remove("active-option");
    underlineBtn.style.textDecoration = "none";
  }

  highlightAlignBtns(activeOptionsState.textAlign);
}

function onCellFocus(e) {
  //on focus on a cell, change the activeCell value to the id of the cell
  if (activeCell && activeCell.id === e.target.id) {
    return;
  }
  activeCell = e.target;
  activeCellElement.innerText = e.target.id;

  const computedStyle = getComputedStyle(activeCell);

  activeOptionsState = {
    fontfamily: computedStyle.fontFamily,
    isBoldSelected: computedStyle.fontWeight == "700",
    isItalicSelected: computedStyle.fontStyle == "italic",
    isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
  };

  highlightFocusOnOptions();
}

function toggleBold(boldBtn) {
  //toggle active option class for the button
  boldBtn.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isBoldSelected === false) {
      activeCell.style.fontWeight = "700";
      boldBtn.style.fontWeight = "700";
    } else {
      activeCell.style.fontWeight = "400";
      boldBtn.style.fontWeight = "400";
    }
  }
  activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
}

function toggleItalic(italicBtn) {
  italicBtn.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isItalicSelected) {
      activeCell.style.fontStyle = "normal";
      italicBtn.style.fontStyle = "normal";
    } else {
      activeCell.style.fontStyle = "italic";
      italicBtn.style.fontStyle = "italic";
    }
  }
  activeOptionsState.isItalicSelected = !activeOptionsState.isItalicSelected;
}

function toggleUnderline(underlineBtn) {
  underlineBtn.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isUnderLineSelected) {
      activeCell.style.textDecoration = "none";
      underlineBtn.style.textDecoration = "none";
    } else {
      activeCell.style.textDecoration = "underline";
      underlineBtn.style.textDecoration = "underline";
    }
  }
  activeOptionsState.isUnderLineSelected =
    !activeOptionsState.isUnderLineSelected;
}

function highlightAlignBtns(textAlignValue) {
  for (let i of textAlignElements) {
    if (i.getAttribute("data-value") == textAlignValue) {
      i.classList.add("active-option");
    } else {
      i.classList.remove("active-option");
    }
  }
}

function textAlign(textAlignBtn) {
  let selectedValue = textAlignBtn.getAttribute("data-value");
  highlightAlignBtns(selectedValue);

  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeOptionsState.textAlign = selectedValue;
  }
}

function changeTextColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.color = selectedColor;
    activeOptionsState.textColor = selectedColor;
  }
}

function changeBackgroundColor(bgColorInput) {
  let selectedColor = bgColorInput.value;
  if (activeCell) {
    activeCell.style.backgroundColor = selectedColor;
    activeOptionsState.backgroundColor = selectedColor;
  }
}

function changeFontFamily(fontFamily) {
  let selectedfontFamily = fontFamily.value;
  console.log(selectedfontFamily);
  if (activeCell) {
    activeCell.style.fontFamily = selectedfontFamily;
    activeOptionsState.fontFamily = selectedfontFamily;
    fontFamily.value = selectedfontFamily;
  }
}

function changeFontSize(fontSize) {
  let selectedFontSize = Number(fontSize.value);
  console.log(parseInt(selectedFontSize));
  if (activeCell) {
    activeCell.style.fontSize = selectedFontSize;
    activeOptionsState.fontSize = selectedFontSize;
    console.log(activeCell.style.fontSize);
  }
}
