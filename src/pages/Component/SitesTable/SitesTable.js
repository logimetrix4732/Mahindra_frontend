import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableSortLabel, Tooltip } from "@mui/material";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import SignalCellularConnectedNoInternet0BarIcon from "@material-ui/icons/SignalCellularConnectedNoInternet0Bar";
import { visuallyHidden } from "@mui/utils";
import MDBox from "components/MDBox";
import DataTableHeadCell from "./DataTableHeadCell";
import MDBadge from "components/MDBadge";
import linearGradient from "assets/theme/functions/linearGradient";
import offlinesignal from "assets/images/icons/signal/low-signal.png";
import onlinesignal from "assets/images/icons/signal/signal.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <>
      <TableRow
        style={{
          background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
          color: "white",
        }}
      >
        {/* <TableCell padding="checkbox"> */}
        {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        {/* </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}

export default function SitesTable({ tableData, headCells, handleSiteClickInParent }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(tableData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleSiteClick = (event, data) => {
    event.preventDefault();

    handleSiteClickInParent(data);
  };

  return (
    // <TableContainer component={Paper} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        {/* <MDBox component="thead"> */}
        {/* {headCells.map((headerGroup, key) => (
          <TableRow key={key}>
            <DataTableHeadCell
            // key={key}
            //   {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
            //   width={column.width ? column.width : "auto"}
            //   align={column.align ? column.align : "left"}
            //   sorted={setSortedValue(column)}
            >
              {headerGroup.label}
            </DataTableHeadCell>
          </TableRow>
        ))} */}
        {/* </MDBox> */}
        {/* <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead> */}
        <EnhancedTableHead
          //   numSelected={selected.length}
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          //   onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={tableData.length}
        />
        {/* <TableRow>
          {headCells.map((headCell) => (
            <StyledTableCell key={headCell.id}>{headCell.label}</StyledTableCell>
          ))}
        </TableRow> */}
        <TableBody>
          {tableData.map((data) => (
            <StyledTableRow key={data.site}>
              {/* <StyledTableCell component="th" scope="row">
                {data.name}
              </StyledTableCell> */}
              <a href="#" onClick={(event) => handleSiteClick(event, data)}>
                <StyledTableCell>{data.site}</StyledTableCell>
              </a>
              <StyledTableCell>{data.capacity} MW</StyledTableCell>

              <StyledTableCell>
                {data.status == "Online" ? (
                  <Tooltip title={data.status} placement="right">
                    {/* <SignalCellularAltIcon /> */}
                    <img src={onlinesignal} style={{ height: "1rem", width: "1rem" }} />
                  </Tooltip>
                ) : (
                  <Tooltip title={data.status} placement="right">
                    {/* <SignalCellularConnectedNoInternet0BarIcon /> */}
                    <img src={offlinesignal} style={{ height: "2rem", width: "2rem" }} />
                  </Tooltip>
                )}
              </StyledTableCell>
              <StyledTableCell>
                {data.status == "Offline" ? (
                  <>
                    {/* <span style={{ color: "#f44336", fontSize: "16px" }}>Offline</span> */}
                    <MDBox ml={-1}>
                      <MDBadge badgeContent="offline" color="error" variant="gradient" size="sm" />
                    </MDBox>
                  </>
                ) : (
                  <>
                    <MDBox ml={-1}>
                      <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
                    </MDBox>
                    {/* <span style={{ color: "#4caf50", fontSize: "16px" }}>Online</span> */}
                  </>
                )}
              </StyledTableCell>
              <StyledTableCell> {Math.floor(data?.ghi * 100) / 100}</StyledTableCell>
              <StyledTableCell> {Math.floor(data?.gti * 100) / 100}</StyledTableCell>
              <StyledTableCell>
                {Number(data?.module_temperature).toFixed(2) + "°C"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {tableData.length > 0 ? null : (
            <TableRow
              style={{
                height: 53,
              }}
            >
              <TableCell colSpan={8} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// import * as React from "react";
// // import "./style.css";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import Paper from "@mui/material/Paper";
// import { visuallyHidden } from "@mui/utils";
// import TableRow from "@mui/material/TableRow";
// // import { useHistory } from "react-router-dom";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import { TablePagination, Tooltip, Typography } from "@mui/material";
// import TableCell from "@mui/material/TableCell";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import TableContainer from "@mui/material/TableContainer";
// import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
// import SignalCellularConnectedNoInternet0BarIcon from "@material-ui/icons/SignalCellularConnectedNoInternet0Bar";
// function EnhancedTableHead(props) {
//   const { order, orderBy, onRequestSort, headCells } = props;

//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={"normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//             style={{
//               backgroundColor: "#FFFFCC",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             }}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//               style={headCell.style}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// export default function SitesTable({ tableData, headCells }) {
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   //   const history = useHistory();
//   const navigate = (site, capacity) => {
//     history.push("/sitesBoxes", {
//       site: site,
//       capacity: capacity,
//     });
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

//   return (
//     <Box>
//       <Paper>
//         <TableContainer
//           style={{
//             borderRadius: "10px",
//           }}
//         >
//           <Table aria-labelledby="tableTitle" size={"small"}>
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               headCells={headCells}
//               onRequestSort={handleRequestSort}
//             />
//             <TableBody>
//               {tableData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((data, index) => {
//                   const isItemSelected = isSelected(data.name);
//                   const isEvenRow = index % 2 === 1;
//                   return (
//                     <TableRow
//                       key={index}
//                       role="checkbox"
//                       tabIndex={-1}
//                       sx={{
//                         cursor: "pointer",
//                         backgroundColor: isEvenRow ? "#F4F6F6 " : "transparent",
//                       }}
//                     >
//                       <TableCell
//                         className="tableTextSize"
//                         style={{
//                           fontSize: "13px",
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           maxWidth: "200px",
//                           transition: "background-color 0.3s ease",
//                         }}
//                         onClick={() => navigate(data?.site, data?.capacity)}
//                       >
//                         {data?.site}
//                       </TableCell>
//                       <TableCell className="tableTextSize">{data?.capacity} MW</TableCell>
//                       <TableCell className="tableTextSize">
//                         {data.status == "Online" ? (
//                           <Tooltip title={data.status} placement="right">
//                             <SignalCellularAltIcon />
//                           </Tooltip>
//                         ) : (
//                           <Tooltip title={data.status} placement="right">
//                             <SignalCellularConnectedNoInternet0BarIcon />
//                           </Tooltip>
//                         )}
//                       </TableCell>
//                       <TableCell className="tableTextSize">
//                         {data.status == "Offline" ? (
//                           <span style={{ color: "#f44336", fontSize: "16px" }}>Offline</span>
//                         ) : (
//                           <span style={{ color: "#4caf50", fontSize: "16px" }}>Online</span>
//                         )}
//                       </TableCell>
//                       <TableCell className="tableTextSize">
//                         {Math.floor(data?.ghi * 100) / 100}
//                       </TableCell>
//                       <TableCell className="tableTextSize">
//                         {Math.floor(data?.gti * 100) / 100}
//                       </TableCell>
//                       <TableCell className="tableTextSize">
//                         {Number(data?.module_temperature).toFixed(2) + "°C"}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {tableData.length > 0 ? null : (
//                 <TableRow
//                   style={{
//                     height: 53,
//                   }}
//                 >
//                   <TableCell colSpan={8} align="center">
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 20, 30]}
//           component="div"
//           count={tableData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           SelectProps={{
//             inputProps: { "aria-label": "rows per page" },
//             native: true,
//             style: {
//               marginBottom: "13px",
//             },
//           }}
//           nextIconButtonProps={{
//             style: {
//               marginBottom: "12px",
//               color: "green",
//             },
//             tabIndex: -1,
//           }}
//           backIconButtonProps={{
//             style: {
//               marginBottom: "12px",
//               color: "green",
//             },
//             tabIndex: -1,
//           }}
//           style={{
//             height: "40px",
//             overflow: "hidden", // Hide any overflow content
//           }}
//         />
//       </Paper>
//     </Box>
//   );
// }
