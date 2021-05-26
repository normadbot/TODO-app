import React from "react";
import "./DragOuterComponent.css";

import { DragDropContext } from "react-beautiful-dnd";
import styled from 'styled-components'
import Column from "./Column";
import initialData from './initialData'
const Container = styled.div`
  display: flex;
`;

const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = initialData.columns[source.droppableId]
    const finish = initialData.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

function DragOuterComponent() {

   

  return (
    <React.Fragment>
      <div className="drag-outer">
        <DragDropContext onDragEnd={onDragEnd}>
          <Container>
          {initialData.columnOrder.map(columnId => {
            const column = initialData.columns[columnId]
            const tasks = column.taskIds.map(
              taskId => initialData.tasks[taskId]
            )

            return (
              <Column key={column.id} column={column} tasks={tasks} />
            )
          })}
          </Container>
        </DragDropContext>
      </div>
    </React.Fragment>
  );
}

export default DragOuterComponent;
