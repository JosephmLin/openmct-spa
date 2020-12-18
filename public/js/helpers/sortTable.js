const sortTable = (tableId) => (header) => () => {
  const table = document.getElementById(tableId);
  console.log(table);
  let switching = true;
  let dir = "asc";
  while (switching) {
    let shouldSwitch = false;
    switching = false;
    let rows = table.rows;
    for (let i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      const x = rows[i].getElementsByTagName("TD")[header];
      const y = rows[i + 1].getElementsByTagName("TD")[header];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
};

export { sortTable };
