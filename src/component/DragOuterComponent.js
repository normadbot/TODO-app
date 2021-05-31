import React,{useState} from "react";
import "./DragOuterComponent.css";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import initialData from "./initialData";
import { Button } from "@material-ui/core";
import Modal from "./Modal/Modal";
import './Modal/Modal.css';
const Container = styled.div`
  display: flex;
`;

function DragOuterComponent() {
  const [showModal, setShowModal] = useState(false);

  const openModal = ()=>{
    setShowModal(prev =>!prev);
  }

  const [state, setstate] = useState(initialData);
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

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setstate(newState)
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setstate(newState)
  };

  return (
    <React.Fragment>
     <Modal showModal={showModal} setShowModal={setShowModal} className='globalStyleModal'></Modal>
      <div className="drag-outer">
      
        <div className="drag-inner">
          
          <Button onClick={openModal} variant="outlined" color="primary" className="button-drag-add">
            Add
          </Button>
        
          <DragDropContext onDragEnd={onDragEnd}>
          
            <Container className="drag-container">
              {state.columnOrder.map((columnId) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );
                 
                return (<Column key={column.id} column={column} tasks={tasks} className='drag-column'/>);
              })}
            </Container>
          </DragDropContext>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DragOuterComponent;
