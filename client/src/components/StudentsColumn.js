import React from "react";
import { Container, List } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import Student from "./Student";

export default function Column2(props) {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        height: 571,
        margin: 10,
      }}
    >
      <span style={{ textAlign: "center", fontSize: "1.2rem" }}>Students</span>
      <Droppable droppableId="students">
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: "8px",
              backgroundColor: snapshot.isDraggingOver ? "#fff8e1" : "white",
            }}
          >
            {props.students
              ? props.students.map((student, index) => (
                  <Student
                    key={student.user_id}
                    student={student}
                    index={index}
                  />
                ))
              : ""}

            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Container>
  );
}
