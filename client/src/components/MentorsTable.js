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
  List,
  Snackbar,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
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
];

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
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
  page: PropTypes.number.isRequired,
  // rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const useStyles3 = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(useStyles3)((props) => {
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
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function MentorsTable(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [studentVal, setStudentVal] = useState(0);
  const [skillVal, setSkillVal] = useState(0);

  const [open, setOpen] = useState(false);
  const [openUserSkills, setOpenUserSkills] = useState(false);

  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [pageOptions, setPageOptions] = useState([]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.mentorsList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const findIndex = (tableElement, row) => {
    let index = -1;
    for (let i = 1; i < tableElement.rows.length; i++) {
      if (+tableElement.rows[i].id === +row.id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const handleEditableRow = (editRow) => {
    const mentorTable = document.getElementsByClassName("mentorsTable")[0];
    const index = findIndex(mentorTable, editRow);
    const row = mentorTable.rows[index];
    editRow.edit = editRow.edit || false;
    if (editRow.edit) {
      if (editRow.id === 0) {
        addMentor(studentVal);
        row.contentEditable = "false";
      }
      props.updateMentorsList();
      row.contentEditable = "false";
    } else {
      row.contentEditable = "true";
    }
    editRow.edit = !editRow.edit;

    setIsEdit(editRow.edit);
  };

  const addMentor = async (us_id) => {
    const body = {
      user_id: us_id,
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/mentors/manager",
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data) {
      // props.handleShowMessage("info", "Mentor is added successfully!");
      props.updateMentorsList();
      props.updateStudentsList();
    }
  };

  const handleAddRow = async () => {
    const copyRow = {
      id: 0,
      key: 0,
      User: { email: "" },
    };

    copyRow.edit = copyRow.edit || true;
    props.setMentorsList([copyRow, ...props.mentorsList]);
    copyRow.contentEditable = "true";
  };

  const handleDeleteRow = async (id) => {
    setDeleteFlag(true);
    await axios.delete(`http://localhost:3000/api/v1/mentors/${id}/manager`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    props.updateMentorsList();
    props.updateStudentsList();
    props.handleShowMessage("info", "Mentor is deleted successfully!");
  };
  const handleChangeStudent = (event) => {
    setStudentVal(event.target.value);
  };

  const handleChangeSkill = (event) => {
    setSkillVal(event.target.value);
  };

  const handleAddUserSkill = async () => {
    const body = {
      user_id: studentVal,
      skill_id: skillVal,
    };
    await axios.post(`http://localhost:3000/api/v1/userskills/approved`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setOpenUserSkills(false);
    props.updateStudentsList();
  };

  // ------------------------------------------------ Dialog handlers --------------------------------------------
  const handleClickOpen = (r) => {
    if (!r.edit && r.id !== 0) {
      props.fetchMentorsSkillsData(r.id);
      setOpen(true);
    }
  };

  const handleClickOpenUserSkills = () => {
    setOpenUserSkills(true);
  };

  const handleClose = (value) => {
    props.updateMentorsSkills();
    setOpen(false);
    setDeleteFlag(false);
  };

  const handleCloseUserSkills = () => {
    setOpenUserSkills(false);
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
        <Button onClick={() => handleClickOpenUserSkills()}>
          <Typography component="div">Add skill to user</Typography>
        </Button>
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
              {columns.map((column) => (
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
          <TableBody>
            {(rowsPerPage > 0
              ? props.mentorsList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.mentorsList
            ).map((row) => (
              <TableRow id={row.id} key={row.id} hover>
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
                <TableCell align="center" onClick={() => handleClickOpen(row)}>
                  {row.edit === true ? (
                    <NativeSelect
                      value={studentVal}
                      onChange={handleChangeStudent}
                    >
                      <option aria-label="None" value="">
                        Not selected
                      </option>
                      {props.studentsList
                        ? props.studentsList.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.email} {item.firstName} {item.lastName}{" "}
                              {item.middleName}
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
                rowsPerPageOptions={pageOptions}
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
      <Dialog
        onClose={handleCloseUserSkills}
        open={openUserSkills}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseUserSkills}
        >
          Add skill to user
        </DialogTitle>
        <DialogContent
          dividers
          style={{ display: "flex", flexDirection: "column" }}
        >
          <NativeSelect value={studentVal} onChange={handleChangeStudent}>
            <option>Select a user to whom to add skill</option>
            {props.usersList
              ? props.usersList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.email} {item.firstName} {item.lastName}{" "}
                    {item.middleName}
                  </option>
                ))
              : []}
          </NativeSelect>
          <NativeSelect value={skillVal} onChange={handleChangeSkill}>
            <option>Select a skill from the list</option>
            {props.specialSkillsList
              ? props.specialSkillsList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              : []}
          </NativeSelect>
          <Button onClick={() => handleAddUserSkill()}>Add</Button>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={props.openMessage}
        autoHideDuration={6000}
        onClose={props.handleCloseMessage}
      >
        <Alert severity={props.severity} onClose={props.handleCloseMessage}>
          {props.messageText}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
