import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Toolbar,
  TableFooter,
  TablePagination,
  NativeSelect,
  Dialog,
  ListItem,
  List
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

import styles from "../styles/ManagerDashboard.css";

const columns = [
  { id: "action", label: "Action", minWidth: 20, align: "center" },
  { id: "info", label: "Information", minWidth: 20, align: "center" },
  { id: "status", label: "Status", minWidth: 20, align: "center" }
];

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
  // rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  }
});

const useStyles3 = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(useStyles3)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function MentorsTable(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [studentVal, setStudentVal] = useState(0);

  const [open, setOpen] = React.useState(false);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.mentorsList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const findIndex = (tableElement, row) => {
    let index = -1;
    for (let i = 1; i < tableElement.rows.length; i++) {
      if (tableElement.rows[i].id === row.id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const handleEditableRow = editRow => {
    const mentorTable = document.getElementsByClassName("mentorsTable")[0];
    const index = findIndex(mentorTable, editRow);
    const row = mentorTable.rows[index];
    editRow.edit = editRow.edit || false;
    if (editRow.edit) {
      if (editRow.id === 0) {
        addMentor(studentVal);
      }
      if (row) row.contentEditable = "false";
    } else {
      row.contentEditable = "true";
    }
    editRow.edit = !editRow.edit;

    setIsEdit(editRow.edit);
  };

  const addMentor = async us_id => {
    const body = {
      user_id: us_id
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/mentors/manager",
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    if (data) {
      props.updateMentorsList();
      props.updateStudentsList();
    }
  };

  const handleAddRow = async () => {
    const copyRow = {
      id: 0,
      key: 0,
      User: { email: "" }
    };

    copyRow.edit = copyRow.edit || true;
    props.setMentorsList([copyRow, ...props.mentorsList]);
    copyRow.contentEditable = "true";
  };

  const handleDeleteRow = async id => {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/mentors/${id}/manager`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    props.updateMentorsList();
    props.updateStudentsList();
  };
  const handleChangeStudent = event => {
    console.log("change", event.target.value);
    setStudentVal(event.target.value);
  };

  // ------------------------------------------------ Dialog handlers --------------------------------------------
  const handleClickOpen = r => {
    console.log(345, r);
    if (!r.edit && r.id !== 0) {
      console.log(12344444, !r.edit, r.id);
      props.fetchMentorsSkillsData(r.id);
      setOpen(true);
    }
  };

  const handleClose = value => {
    props.updateMentorsSkills();
    setOpen(false);
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <Toolbar>
        {" "}
        <Typography id="tableTitle" component="div">
          Mentors
        </Typography>
        <IconButton onClick={() => handleAddRow()}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table
          className={`mentorsTable ${classes.table}`}
          stickyHeader
          size="small"
          id="mentorsTable"
        >
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody id="levelsTableBody">
            {(rowsPerPage > 0
              ? props.mentorsList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.mentorsList
            ).map((row, index) => (
              <TableRow
                id={row.id}
                key={row.id}
                hover
                onClick={() => handleClickOpen(row)}
              >
                <TableCell id={row.id}>
                  <IconButton
                    hidden={!row.edit}
                    onClick={() => handleEditableRow(row)}
                  >
                    <DoneOutlinedIcon />
                  </IconButton>
                  <IconButton
                    hidden={row.edit}
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    hidden={!row.edit}
                    onClick={() => handleEditableRow(row)}
                  >
                    <ClearOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  {row.edit === true ? (
                    <NativeSelect
                      value={studentVal}
                      onChange={handleChangeStudent}
                    >
                      {props.studentsList.map
                        ? props.studentsList.map(item => (
                            <option key={item.User.id} value={item.User.id}>
                              {item.User.email} {item.User.firstName}{" "}
                              {item.User.lastName} {item.User.middleName}
                            </option>
                          ))
                        : []}
                    </NativeSelect>
                  ) : (
                    row.User.email +
                    " " +
                    row.User.lastName +
                    " " +
                    row.User.firstName +
                    " " +
                    row.User.middleName
                  )}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 60 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage=""
                // rowsPerPageOptions={{ paging: false }}
                rowsPerPageOptions=""
                count={props.mentorsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Skills
        </DialogTitle>
        <DialogContent dividers>
          <List>
            <ListItem>{props.mentorsSkills}</ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
