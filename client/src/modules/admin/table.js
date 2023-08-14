import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TablePagination,
} from "@mui/material";
import { Box } from "@mui/system";
import { StyledTableCell, StyledTableRow, styles } from "./styles/styles";
import { getUsers, updateStatus } from "../../action/user";
import PageLoader from "../../layout/app-skeleton";
import ResponsiveDatePickers from "../../util/date";
import WarningIcon from "@mui/icons-material/Warning";
const Switcher = ({ _id, status, dispatch, setODialog, setId }) => {
  const [checked, setChecked] = React.useState(status);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setId(_id);
    event.target.checked && setODialog(true);
    const status = { status: event.target.checked };
    const finalResult = Object.assign({ _id }, status);
    dispatch(updateStatus(finalResult));
  };
  return (
    <FormGroup sx={{ ...styles.formInput }}>
      <FormControlLabel
        control={
          <Switch
            size="small"
            color="error"
            checked={!status ? false : checked}
            onChange={handleChange}
          />
        }
        label={status ? `აქტიური` : "გმორთული"}
        sx={{ p: 0.5 }}
      />
    </FormGroup>
  );
};
function createData(email, name, lastname, status, activeDate, password) {
  return { email, name, lastname, status, activeDate, password };
}
const AdminPanel = () => {
  const dispatch = useDispatch();
  const [datePick, setDate] = React.useState(new Date());
  const [id, setId] = React.useState();
  const users = useSelector((action) => action.UserReducer);
  const [oDialog, setODialog] = React.useState(false);
  const rows = [];
  users.allUsers.map((element) =>
    rows.push(
      createData(
        `${element.email}`,
        `${element.name}`,
        `${element.lastname}`,
        <Switcher
          _id={element._id}
          status={element.status}
          dispatch={dispatch}
          setODialog={setODialog}
          date={datePick}
          setId={setId}
          active={element.active}
        />,
        `${element.active}`,
        `${element.password}`
      )
    )
  );
  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
      return true;
    } else if (date1 > date2) {
      return false;
    } else {
      return true;
    }
  };
  var today = new Date();
  var dates =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return (
    <Box>
      <PageLoader loading={users.isLoading}>
        <TableContainer component={Paper}>
          <ResponsiveDatePickers
            open={oDialog}
            setOpen={setODialog}
            setDate={setDate}
            date={datePick}
            id={id}
          />
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">იმეილი</StyledTableCell>
                <StyledTableCell align="left">სახელი</StyledTableCell>
                <StyledTableCell align="left">გვარი</StyledTableCell>
                <StyledTableCell align="left">სტატუსი</StyledTableCell>
                <StyledTableCell align="left">დრო</StyledTableCell>
                <StyledTableCell align="left">პაროლი</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.lastname}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Stack
                        flexDirection={"row"}
                        justifyContent="flex-start"
                        alignItems="center"
                        gap={0.5}
                      >
                        {!compareDates(dates, row.activeDate) &&
                          row.activeDate && (
                            <WarningIcon
                              size="small"
                              sx={{ color: "#C9CC00" }}
                            />
                          )}
                        {row.activeDate.substring(0, 10)}{" "}
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.password}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PageLoader>
    </Box>
  );
};

export default AdminPanel;
