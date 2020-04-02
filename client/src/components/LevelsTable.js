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
  TablePagination
} from "@material-ui/core";
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
  { id: "value", label: "Value", minWidth: 20, align: "center" },
  { id: "time", label: "Time for level", minWidth: 20, align: "center" },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "center"
  }
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
export default function LevelsTable(props) {
  const [isEdit, setIsEdit] = useState(false);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.levelsList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const findIndex = (tableElement, row) => {
    let index = -1;
    for (let i = 1; i < tableElement.rows.length; i++) {
      if (tableElement.rows[i].id == row.id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const handleEditableRow = editRow => {
    const levelTable = document.getElementsByClassName("levelsTable")[0];
    const index = findIndex(levelTable, editRow);
    const row = levelTable.rows[index];
    editRow.edit = editRow.edit || false;
    if (editRow.edit) {
      if (editRow.id === 0) {
        addLevel(
          row.cells[1].innerHTML,
          row.cells[2].innerHTML,
          row.cells[3].innerHTML
        );
      } else {
        updateLevelInfo(
          editRow.id,
          row.cells[1].innerHTML,
          row.cells[2].innerHTML,
          row.cells[3].innerHTML
        );
      }
      row.contentEditable = "false";
    } else {
      row.contentEditable = "true";
    }
    editRow.edit = !editRow.edit;

    setIsEdit(editRow.edit);
  };

  const addLevel = async (v, t, d) => {
    const body = {
      value: v,
      time_level: t,
      description: d
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/levels/manager",
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    if (data) {
      props.updateLevelsList();
    }
  };
  const updateLevelInfo = async (lvl_id, v, t, d) => {
    const body = {
      value: v,
      time_level: t,
      description: d
    };
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/levels/${lvl_id}/manager`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    if (data) {
      props.updateLevelsList();
      props.updateSkillsList();
    }
  };

  const handleAddRow = async () => {
    const copyRow = {
      id: 0,
      key: 0
    };

    copyRow.edit = copyRow.edit || true;
    props.setLevelsList([copyRow, ...props.levelsList]);
    copyRow.contentEditable = "true";
  };

  const handleDeleteRow = async id => {
    console.log(id);
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/levels/${id}/manager`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    props.updateLevelsList();
    props.updateSkillsList();
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <Toolbar>
        {" "}
        <Typography id="tableTitle" component="div">
          Levels
        </Typography>
        <IconButton onClick={() => handleAddRow()}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table
          className={`levelsTable ${classes.table}`}
          stickyHeader
          size="small"
          id="levelsTable"
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
              ? props.levelsList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.levelsList
            ).map(row => (
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
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.time_level}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
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
                count={props.levelsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
