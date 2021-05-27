import React from "react";
import styled from "styled-components";
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import './DragOuterComponent.css';
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 20px;
  width: 40rem;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`
function Column(props) {
  return (
    <Container className='drag-column'>
         <Title className='drag-header'>{props.column.title}</Title>
        <Droppable droppableId={props.column.id} type="TASK">
          {(provided, snapshot) => (
           
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.tasks.map((task, index) => (
                
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
    </Container>
  );
}

export default Column;
