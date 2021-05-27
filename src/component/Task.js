import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import "./Task.css";
import { Button, Divider } from "@material-ui/core";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
`;

function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={false}
        >
          <h6 className='prio'>Low</h6>
          <div class="column">
            <div className="column-icons">
              <div className="row">
                <Button className="button-actions">
                  <DeleteIcon className='icon-color' />
                </Button>
              </div>
              <div className="row">
                <Button className="button-actions">
                  <EditIcon className='icon-color'/>
                </Button>
              </div>
            </div>
            <Divider orientation="vertical" flexItem variant="fullWidth" className='divider-class'/>
            <div className="task-text">
              <div className="column ">{props.task.content}</div>
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
