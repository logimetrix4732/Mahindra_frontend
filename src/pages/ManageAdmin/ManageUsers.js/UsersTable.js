import {
  Grid,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersTable({ usersTableData }) {
  // const rowsPerPage = 10;
  // const page = 3;
  const [paginatedData, setPaginatedData] = useState(usersTableData);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (usersTableData) {
      setPaginatedData(usersTableData);
    }
  }, [usersTableData]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, paginatedData.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //create columns from data
  // const columns = useMemo(
  //   () =>
  //     usersTableData.length
  //       ? Object.keys(usersTableData[0]).map((columnId) => ({
  //           header: columnNames[columnId] ?? columnId,
  //           accessorKey: columnId,
  //           id: columnId,
  //         }))
  //       : [],
  //   [usersTableData]
  // );
  // console.log(columns, "TableData54");

  return (
    <Grid container>
      <TableContainer component={Paper} style={{ maxWidth: "91vw" }}>
        <Table stickyHeader size="small" aria-label="simple table">
          {/* <TableHead> */}
          <TableRow style={{ backgroundColor: "#ffffbf" }}>
            <TableCell>Sr. No.</TableCell>
            <TableCell>
              <span
                // onClick={(event) => handleOrderChange(event, "email", "emailHeader")}
                id="emailHeader"
                className="header"
              >
                Email
              </span>
            </TableCell>
            <TableCell>
              <span
                // onClick={(event) => handleOrderChange(event, "firstname", "firstnameHeader")}
                id="firstnameHeader"
                className="header"
              >
                Name
              </span>
            </TableCell>
            <TableCell>
              <span
                // onClick={(event) => handleOrderChange(event, "role", "roleHeader")}
                id="roleHeader"
                className="header"
              >
                User Type
              </span>
            </TableCell>
            <TableCell>
              <span
                // onClick={(event) => handleOrderChange(event, "locations", "locationsHeader")}
                id="locationsHeader"
                className="header"
              >
                Sites
              </span>
            </TableCell>
            <TableCell>
              <span
                // onClick={(event) => handleOrderChange(event, "timestamp", "timestampHeader")}
                id="timestampHeader"
                className="header"
              >
                Login Date/Time
              </span>
            </TableCell>
            <TableCell>
              <span style={{ paddingLeft: "2rem" }}>Action</span>
            </TableCell>
            <TableCell>
              <span
                // onClick={(event) => handleOrderChange(event, "action_by", "action_byHeader")}
                id="action_byHeader"
                className="header"
              >
                Status
              </span>
            </TableCell>
          </TableRow>
          {/* </TableHead> */}
          <TableBody>
            {(rowsPerPage > 0
              ? paginatedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : paginatedData
            ).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={
                  {
                    // backgroundColor: user && row.email === user.email ? "lightblue" : "white",
                  }
                }
              >
                <TableCell style={{ color: "#000" }}>
                  <Grid container>{page * 10 + index + 1}</Grid>
                </TableCell>
                <TableCell style={{ color: "#000" }}>
                  <Grid container>{row.email}</Grid>
                </TableCell>
                <TableCell style={{ color: "#000" }}>
                  {row.firstname}&nbsp;{row.lastname}
                </TableCell>
                <TableCell style={{ color: "#000" }}>
                  {String(row.role).charAt(0).toUpperCase()}
                  {String(row.role).slice(1)}
                </TableCell>

                <TableCell style={{ color: "#000" }}>{row.locations?.length}</TableCell>
                <TableCell style={{ color: "#000" }}>
                  {row.timestamp === null
                    ? `x`
                    : new Date(Number(row.timestamp * 1000)).toLocaleString()}
                </TableCell>
                <TableCell style={{ color: "#000" }}>
                  <Tooltip title="Enable/Disable" placement="bottom">
                    <Switch
                      key={index}
                      checked={row.status === "active" ? true : false}
                      // onChange={(event) => handleUserStatusChange(event, row)}
                      color="primary"
                      name="statusSwitch"
                      // size="small"
                    />
                  </Tooltip>
                  <Tooltip title="Edit" placement="bottom">
                    <IconButton
                      size="small"
                      // onClick={() => handleUserChange(row.email)}
                      style={{ paddingInline: ".5rem" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="bottom">
                    <IconButton
                      size="small"
                      // onClick={() => handleUserDelete(row)}
                      color="red"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{ color: "#000" }}>{row.action_by}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justifyContent="flex-end"
        style={{ marginTop: "0rem", marginRight: "0.5rem" }}
      >
        <Grid item>
          {/* <div className={classes.paginationicon}> */}
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
            colSpan={3}
            count={paginatedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            // classes={{
            //   menuItem: classes.menuItem,
            //   selectBack: classes.selectDropdown,
            //   sp: classes.tablePagination,
            //   caption: classes.tablePaginationCaption,
            //   selectIcon: classes.tablePaginationSelectIcon,
            //   select: classes.tablePaginationSelect,
            //   actions: classes.tablePaginationActions,
            // }}
            // onChangePage={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          {/* </div> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
