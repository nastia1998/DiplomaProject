import React from "react";
import { Container, Typography, List } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import Student from "./Student";

export default function Column2(props) {
  return (
    <Container>
      <Typography>Students</Typography>
      <Droppable droppableId="students">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {props.students
              ? props.students.map((student, index) => (
                  <Student
                    key={student.user_skill_id}
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
