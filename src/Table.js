import React from "react";
import GridTable from "@nadavshaar/react-grid-table";
import "./App.css";

// custom cell component
const DateCreated = ({
  tableManager,
  value,
  field,
  data,
  column,
  colIndex,
  rowIndex,
}) => {
  return (
    <div
      className="rgt-cell-inner"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        overflowX: "hidden",
      }}
    >
      <span className="rgt-text-truncate" style={{ marginLeft: 2 }}>
        {value}
      </span>
    </div>
  );
};

const rows = [
  {
    id: 1,
    date: "wotham0",
    gender: "Male",
    last_visited: "12/08/2019",
    test: { x: 1, y: 2 },
    avatar: "https://robohash.org/atquenihillaboriosam.bmp?size=32x32&set=set1",
  },
  {
    id: 2,
    date: "dbraddon2",
    gender: "Female",
    last_visited: "16/07/2018",
    test: { x: 3, y: 4 },
    avatar: "https://robohash.org/etsedex.bmp?size=32x32&set=set1",
  },
  {
    id: 3,
    date: "dridett3",
    gender: "Male",
    last_visited: "20/11/2016",
    test: { x: 5, y: 8 },
    avatar: "https://robohash.org/inimpeditquam.bmp?size=32x32&set=set1",
  },
  {
    id: 4,
    date: "gdefty6",
    gender: "Female",
    last_visited: "03/08/2019",
    test: { x: 7, y: 4 },
    avatar: "https://robohash.org/nobisducimussaepe.bmp?size=32x32&set=set1",
  },
  {
    id: 5,
    date: "hbeyer9",
    gender: "Male",
    last_visited: "10/10/2016",
    test: { x: 2, y: 2 },
    avatar: "https://robohash.org/etconsequatureaque.jpg?size=32x32&set=set1",
  },
];

const columns = [
  {
    id: 1,
    className: "created-cell",
    field: "date",
    label: "Created",
    cellRenderer: DateCreated,
    sort: ({ a, b, isAscending }) => {
      let aa = a.split("/").reverse().join(),
        bb = b.split("/").reverse().join();
      return aa < bb
        ? isAscending
          ? -1
          : 1
        : aa > bb
        ? isAscending
          ? 1
          : -1
        : 0;
    },
  },
  {
    id: 2,
    field: "gender",
    label: "URLs",
  },
  {
    id: 3,
    field: "last_visited",
    label: "Uses",
    test: { x: 1, y: 2 },
  },
];

const MyAwesomeTable = () => (
  <GridTable
    style={{
      width: "30%",
      backgroundColor: "#121212",
      marginTop: "2rem",
    }}
    showSearch={false}
    showColumnVisibilityManager={false}
    columns={columns}
    texts={{
      noRows: "No rows",
    }}
    showRowsInformation={false}
    isPaginated={false}
    rows={rows}
  />
);

export default MyAwesomeTable;
