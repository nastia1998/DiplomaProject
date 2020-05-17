import React, { useState, useEffect } from "react";
import initialData from "./initialData";
import RequestsColumn from "./RequestsColumn";
import StudentsColumn from "./StudentsColumn";

import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function MentorDashboard2() {
  let history = useHistory();

  const [state, setState] = useState(initialData);
  const [requestsList, setRequestsList] = useState([]);
  const [fullInfoRequest, setFullInfoRequest] = useState([]);
  const [studentsList, setStudentsList] = useState([]);

  /**
   * Moves an item from one list to another list.
   */
  const move = async (
    source,
    destination,
    droppableSource,
    droppableDestination
  ) => {
    const sourceClone = source; //Array.from(source);
    const destClone = destination; //Array.from(destination);
    console.log(destClone);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    console.log(removed);

    destClone.splice(droppableDestination.index, 0, removed);

    if (droppableDestination.droppableId === "students") {
      await approveRequest(removed.user_skill_id);
    }

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  async function fetchRequestsList() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${localStorage.getItem(
        "userId"
      )}/requests`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setRequestsList(data);
  }

  async function fetchFullInfoRequest(req_id) {
    let newRequestsList = requestsList.filter((i) => i.id === +req_id);
    console.log(newRequestsList);
    setFullInfoRequest(newRequestsList);
    console.log(req_id);
  }

  async function getStudentsList() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${localStorage.getItem(
        "userId"
      )}/students`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const result = [];
    const skills = [];
    const map = new Map();

    for (const item of data) {
    }

    for (const item of data) {
      if (!map.has(item.user_id)) {
        map.set(item.user_id, true);
        result.push({
          user_id: item.user_id,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
          middleName: item.middleName,
        });
      }
    }
    setStudentsList(result);
  }

  async function approveRequest(userskill_id) {
    await axios.put(`http://localhost:3000/api/v1/userskills/${userskill_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchRequestsList();
    fetchFullInfoRequest(0, 0);
    getStudentsList();
  }

  const getList = (id) => {
    if (id === "requests") {
      return requestsList;
    } else if (id === "students") {
      return studentsList;
    } else {
      return;
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        requestsList,
        result.source.index,
        result.destination.index
      );

      let state = { items };

      if (source.droppableId === "students") {
        setStudentsList(items);
      } else {
        setRequestsList(state.items);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setRequestsList(result.requests);
      setStudentsList(result.students);
    }
  };

  useEffect(() => {
    fetchRequestsList();
    getStudentsList();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <RequestsColumn
          requests={requestsList}
          fetchFullInfoRequest={(req_id) => fetchFullInfoRequest(req_id)}
          fullInfoRequest={fullInfoRequest}
        />
        <StudentsColumn students={studentsList} />
      </DragDropContext>
    </div>
  );
}
