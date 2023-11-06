import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "User Session", label: "User Session Id", minWidth: 170 },
  { id: "Country", label: "Country", minWidth: 50 },
  {
    id: "Mobile",
    label: "User Mobile",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Session Time",
    label: "Session Time Stamp",
    minWidth: 170,
    align: "right",
    format: (value) => {
      const dateTime = new Date(value);
      const formattedDate = dateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const formattedTime = dateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return `${formattedDate} ${formattedTime}`;
    },
  },
  {
    id: "Objects",
    label: "Objects",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Method",
    label: "Method",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Credits",
    label: "Credits",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Edited",
    label: "Edited",
    minWidth: 170,
    align: "right",
    format: (value) => (value ? "true" : "false"),
  },
];

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRowsData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    const fetchNextData = async (
      url = "",
      machine_id = "",
      phone_numbe = "",
      start_date = "",
      end_date = ""
    ) => {
      console.log(url + "/");
      try {
        const response = await fetch(url + "/", {
          method: "POST",
          headers: {
            Authorization: "Token 97906891eae54f1478f808e6e313cabaae773fc8",
          },
          body: new URLSearchParams({
            machine_id: machine_id,
            phone_number: phone_numbe,
            start_date: start_date,
            end_date: end_date,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data, "data");
        setRowsData([...rows, ...data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    const url = props?.data?.next || "";
    if (url) fetchNextData(url);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };
  useEffect(() => {
    const { data } = props;
    setRowsData([...data.results]);
  }, [props]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 320 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#608FBE",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={() => {
                      props?.openModal(row["User Session"]);
                    }}
                  >
                    {columns.map((column) => {
                      let value = row[column.id];
                      value = typeof value === "boolean" ? value.toString() : value
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 20, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
