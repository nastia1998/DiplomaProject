import React, { useState } from "react";
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
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
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
  { id: "name", label: "Name", minWidth: 10, align: "center" },
  { id: "level", label: "Level name", minWidth: 15, align: "center" },
  { id: "time", label: "Time for level", minWidth: 10, align: "center" },
  // {
  //   id: "description",
  //   label: "Description",
  //   minWidth: 15,
  //   align: "center",
  // },
];

const options = [
  { id: 1, label: "junior" },
  { id: 2, label: "middle" },
  { id: 3, label: "senior" },
];

const timeLevelOptions = [
  { id: 1, label: 1 },
  { id: 2, label: 2 },
  { id: 3, label: 3 },
  { id: 4, label: 4 },
  { id: 5, label: 5 },
  { id: 6, label: 6 },
  { id: 7, label: 7 },
  { id: 8, label: 8 },
  { id: 9, label: 9 },
  { id: 10, label: 10 },
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
export default function SkillsTable(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [levelName, setLevelName] = useState(options[0].label);
  const [levelTime, setLevelTime] = useState(timeLevelOptions[0].label);
  const [description, setDescription] = useState("");

  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [pageOptions, setPageOptions] = useState([]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.skillsList.length - page * rowsPerPage);

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
    setDescription(editRow.description);
    setLevelName(editRow.level_name);
    setLevelTime(editRow.time_level);
    const skillTable = document.getElementsByClassName("skillsTable")[0];
    const index = findIndex(skillTable, editRow);
    const row = skillTable.rows[index];
    editRow.edit = editRow.edit || false;

    if (editRow.edit) {
      if (editRow.id === 0) {
        if (!row.cells[1].innerHTML || !row.cells[3].innerHTML) {
          props.handleShowMessage("error", "Please, fill in all the fields!");
        } else {
          addSkill(row.cells[1].innerHTML, levelName, levelTime, description);
          row.contentEditable = "false";
        }
      } else {
        if (!row.cells[1].innerHTML || !row.cells[3].innerHTML) {
          props.handleShowMessage("error", "Please, fill in all the fields!");
        } else {
          updateSkillInfo(
            editRow.id,
            row.cells[1].innerHTML,
            levelName,
            levelTime,
            description
          );
        }
      }
      props.updateSkillsList();
      row.contentEditable = "false";
    } else {
      row.contentEditable = "true";
    }
    editRow.edit = !editRow.edit;
    setIsEdit(editRow.edit);
  };

  const addSkill = async (n, l, t, d) => {
    const body = {
      name: n,
      level_name: l,
      time_level: t,
      description: d,
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/skills/manager",
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data) {
      props.handleShowMessage("info", "Skill is added successfully!");
      props.updateSkillsList();
    }
  };
  const updateSkillInfo = async (skill_id, n, l, t, d) => {
    const body = {
      name: n,
      level_name: l,
      time_level: +t,
      description: d,
    };
    await axios.put(
      `http://localhost:3000/api/v1/skills/${skill_id}/manager`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    props.handleShowMessage("info", "Skill is updated successfully!");
    props.updateSkillsList();
  };

  const handleAddRow = async () => {
    const copyRow = {
      id: 0,
      key: 0,
    };

    copyRow.edit = copyRow.edit || true;
    props.setSkillsList([copyRow, ...props.skillsList]);
    copyRow.contentEditable = "true";
  };

  const handleDeleteRow = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/skills/${id}/manager`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    props.handleShowMessage("info", "Skill is deleted successfully!");
    props.updateSkillsList();
  };

  const handleChangeLevel = (event) => {
    setLevelName(event.target.value);
  };

  const handleChangeTimeLevel = (event) => {
    setLevelTime(event.target.value);
  };

  // const handleChangeDescription = (event) => {
  //   setDescription(event.target.value);
  // };
  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <Toolbar>
        {" "}
        <Typography id="tableTitle" component="div">
          Skills
        </Typography>
        <IconButton onClick={() => handleAddRow()}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table
          className={`skillsTable ${classes.table}`}
          stickyHeader
          size="small"
          id="skillsTable"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody id="skillsTableBody">
            {(rowsPerPage > 0
              ? props.skillsList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.skillsList
            ).map((row) => (
              <TableRow
                id={row.id}
                key={row.id}
                hover
                contentEditable={row.edit ? true : false}
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
                    onClick={() => handleEditableRow(row)}
                  >
                    <EditIcon />
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
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  {row.edit === true ? (
                    <NativeSelect
                      value={levelName}
                      onChange={handleChangeLevel}
                    >
                      {options.map((item) => (
                        <option key={item.id} value={item.label}>
                          {item.label}
                        </option>
                      ))}
                    </NativeSelect>
                  ) : (
                    row.level_name
                  )}
                </TableCell>
                <TableCell align="center">
                  {row.edit === true ? (
                    <NativeSelect
                      value={levelTime}
                      onChange={handleChangeTimeLevel}
                    >
                      {timeLevelOptions.map((item) => (
                        <option key={item.id} value={item.label}>
                          {item.label}
                        </option>
                      ))}
                    </NativeSelect>
                  ) : (
                    row.time_level
                  )}
                </TableCell>
                {/* <TableCell align="center">
                  {row.edit === true ? (
                    <TextField
                      disabled={!row.edit}
                      value={description}
                      inputProps={{ maxLength: 20 }}
                      onChange={handleChangeDescription}
                    />
                  ) : (
                    row.description
                  )}
                </TableCell> */}
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
                count={props.skillsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
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
