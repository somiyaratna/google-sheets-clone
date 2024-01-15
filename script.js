const header = document.getElementById("header");
const body = document.getElementById("body");

//loop to generate the no. of columns (A, B, C and so on...)
for (let i = 65; i <= 90; i++) {
  let char = String.fromCharCode(i);
  const bold = document.createElement("b");
  bold.innerText = char;
  header.appendChild(bold);
}

function createAndAppendRow(rowNumber) {
  const row = document.createElement("div");
  row.className = "row";

  //Inside each row, create 27 cells, 1 extra cell for Serial No.
  for (let i = 64; i <= 90; i++) {
    if (i === 64) {
      //checking if first cell is A, if so, generate row no.
      const b = document.createElement("b");
      b.innerText = rowNumber;
      row.appendChild(b);
    } else {
      //row no. already generated, first cell skipped, then create all divs
      const cell = document.createElement("div");
      cell.id = `${String.fromCharCode(i)}${rowNumber}`;
      cell.contentEditable = "true";
      cell.addEventListener("focus", onCellFocus);
      row.appendChild(cell);
    }
    //after loop completed, all rows have been generated, so all of them are appended in the body
    body.appendChild(row);
  }
}

//create 100 rows, call above function for 100 times
for (let i = 1; i <= 100; i++) {
  createAndAppendRow(i);
}
