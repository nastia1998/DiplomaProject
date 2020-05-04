import React from "react";
import { Container, Typography, List } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import Request from "./Request";

export default function Column(props) {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        // borderRadius: "255px 15px 225px 25px/25px 225px 15px 255px",
        height: 571,
        margin: 20,
      }}
    >
      <span style={{ textAlign: "center", fontSize: "1.2rem" }}>Requests</span>
      <Droppable droppableId="requests">
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: "8px",
              backgroundColor: snapshot.isDraggingOver ? "#fff8e1" : "white",
            }}
          >
            {props.requests
              ? props.requests.map((request, index) => (
                  <Request
                    key={request.user_skill_id}
                    request={request}
                    index={index}
                    fetchFullInfoRequest={(req_id) =>
                      props.fetchFullInfoRequest(req_id)
                    }
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
