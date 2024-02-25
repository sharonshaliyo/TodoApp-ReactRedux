import React, { useReducer, useState, useEffect } from 'react';
import { SLOT_HEIGHT, SLOT_STYLE } from './constants'

import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';
import dayjs from 'dayjs';

const rowLevelActionStyles = { cursor: 'pointer', width: '30px', border: '1px solid', textAlign: 'center', marginRight: '5px' }

const createSlot = (name, index) => {
  const hour = Math.floor(index/2)
  const min = index%2 === 0 ? 0 : 30
  return { id: index, name: name !== null ? name : '', hour, min }
}

const createAllSlots = () => {
  return Array(48).fill(null).map(createSlot)
}

const initialState = {
  items: createAllSlots()
}
const reducer = (state, action) => {
  switch (action.type) {
    case "setItems":
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
}

const VerticalDraggableContainer = () => {
  const [itemsState, dispatch] = useReducer(reducer, initialState)
  const [newItem, setNewItem] = useState({ name: '', details: '' });
  const [draggedItem, setDraggedItem] = useState(null);

  const addItemToNextEmptySlot = (items, itemName) => {
    const emptySlotIndex = items.findIndex(item => item.name === '' || item.name === ' ');
    if (emptySlotIndex !== -1) {
      items[emptySlotIndex] = {
        id: emptySlotIndex,
        hour: items[emptySlotIndex].hour,
        min: items[emptySlotIndex].min,
        name: itemName? itemName : ' '
      };
    }
    return [...items];
  }
  const handlePasteAnywhere = textContent => {
    const tasks = textContent.split('\n').map(c => c.trim())
    // console.log(tasks);
    let items = []
    tasks.forEach(t => {
      items = [...addItemToNextEmptySlot(itemsState.items, t)]
    });
    dispatch({ type: 'setItems', payload: items })
    console.log('items', items)
  };

  useEffect(() => {
    window.addEventListener('paste', e => handlePasteAnywhere(e.clipboardData.getData('text')));
    return () => {
      window.removeEventListener('paste', handlePasteAnywhere);
    };
  }, []);

  const highlightCurrentTask = item => {
    const currHour = dayjs().hour()
    const currMin = dayjs().minute()
    let style = { backgroundColor: '', fontWeight: '' }
    if (currHour === item.hour
      && (item.min === 0 && currMin >= 0 && currMin < 30
        || item.min === 30 && currMin >= 30 && currMin < 60)) {
      style.backgroundColor = '#ACE1AF' // '#b7e1cd'
      style.fontWeight = 'bold'
    }
    return style
  }

  const serialize = () => itemsState.items.map(t => t.name).join('\r\n')
  const deserialize = itemsString => itemsString.split('\r\n').map(createSlot)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serialize());
  }

  const pasteFromClipboard = async () => {
    const clipboardContents = await navigator.clipboard.readText();
    console.log(clipboardContents)
    handlePasteAnywhere(clipboardContents)
  }

  const clear = (index) => {
    itemsState.items[index].name = ''
    dispatch({ type: 'setItems', payload: [...itemsState.items] })
  }

  const toggleEdit = item => {
    console.log('toggleEdit', item)
    item.editMode = !item.editMode
    dispatch({ type: 'setItems', payload: [...itemsState.items] })
  }

  const onItemChange = (e, item) => {
    item.name = e.target.value
    dispatch({ type: 'setItems', payload: [...itemsState.items] })
  }

  const handleDnDDragEnd = ({ over, active }) => {
    if (!over) {
      return
    }
    
    console.log(over, active)
    console.log(active.id, parseInt(over.id.split('-')[1]))
    const activeId = active.id
    const overId = parseInt(over.id.split('-')[1])

    if (activeId === overId)
      return
    if (activeId > overId) {
      for (let i = activeId; i > overId; i--) {
        const d = itemsState.items[i].name
        itemsState.items[i].name = itemsState.items[i-1].name
        itemsState.items[i-1].name = d
      }
    } else {
      for (let i = activeId; i < overId; i++) {
        const d = itemsState.items[i].name
        itemsState.items[i].name = itemsState.items[i+1].name
        itemsState.items[i+1].name = d
      }
    }
    dispatch({
      type: 'setItems', payload: [...itemsState.items] 
    })
  }

  const [copyIndex, setCopyIndex] = useState(-1)
  const [enableRowLevel, setEnableRowLevel] = useState(true)

  const copyItem = (index) => {
    setCopyIndex(index)
  }
  const pasteItem = index => {
    if (!itemsState.items[index] || !itemsState.items[index])
      return
    itemsState.items[index].name = itemsState.items[copyIndex].name
    dispatch({ type: 'setItems', payload: [...itemsState.items] })
  }

  const [moveIndex, setMoveIndex] = useState(-1)
  const onMoveClick = index => {
    if (moveIndex === -1) {
      setMoveIndex(index)
    } else {
      const activeId = moveIndex
      const overId = index
      if (activeId === overId)
        return
      if (activeId > overId) {
        for (let i = activeId; i > overId; i--) {
          const d = itemsState.items[i].name
          itemsState.items[i].name = itemsState.items[i-1].name
          itemsState.items[i-1].name = d
        }
      } else {
        for (let i = activeId; i < overId; i++) {
          const d = itemsState.items[i].name
          itemsState.items[i].name = itemsState.items[i+1].name
          itemsState.items[i+1].name = d
        }
      }
      setMoveIndex(-1)
    }
  }

  // console.log(itemsState)
  return (
    <div>
      <DndContext onDragEnd={handleDnDDragEnd}>
        <div style={{ position:'sticky', top: '0px', padding: '3px', backgroundColor: 'white' }}>
          <button onClick={ pasteFromClipboard } style={{ marginRight: '5px' }}>Paste from C</button>
          <button onClick={() => { localStorage.setItem('tasks', serialize()); copyToClipboard(); }} style={{ marginRight: '5px' }}>Save & Copy to C</button>
          <button onClick={() => dispatch({ type: 'setItems', payload: deserialize(localStorage.getItem('tasks')) }) } style={{ marginRight: '5px' }}>Load from LS</button>
          <button onClick={() => dispatch({ type: 'setItems', payload: createAllSlots() }) } style={{ marginRight: '5px' }}>Clear All</button>
          RL <input type="checkbox" checked={enableRowLevel} onChange={() => setEnableRowLevel(e => !e)} />
        </div>
        <div>
          {itemsState.items.map((item, index) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ccc', padding: '2px', ...highlightCurrentTask(item) }}>
                <div style={{ minWidth: '60px', textAlign: 'center' }}>{item.hour}:{item.min}</div>
                <div
                  style={{
                    ...SLOT_STYLE,
                    backgroundColor: draggedItem === index ? 'lightblue' : '',
                    top: `${index * SLOT_HEIGHT}px`,
                    flexGrow: 1
                  }}
                >
                  { !item.editMode && <Droppable id={`droppable-${item.id}`} index={item.id}>
                    { item.name && <Draggable id={item.id} index={item.id}>{item.name}</Draggable> }
                    { !item.name && "Empty" }
                  </Droppable> }
                  { item.editMode && <><input style={{ display: 'flex', width: '90%' }} value={item.name} onChange={ e => onItemChange(e, item) } /></> }
                </div>
                { enableRowLevel && <div style={{ justifySelf: 'flex-end' }}>
                  { <button onClick={() => onMoveClick(item.id) } style={rowLevelActionStyles}>M</button>}
                  { item.editMode && <><button onClick={ () => toggleEdit(item) } style={rowLevelActionStyles}>S</button></> }
                  { !item.editMode && <><button onClick={ () => toggleEdit(item) } style={rowLevelActionStyles}>E</button></> }
                  <button onClick={() => copyItem(item.id)} style={rowLevelActionStyles}>C</button>
                  <button onClick={() => pasteItem(item.id)} style={rowLevelActionStyles}>P</button>
                  { item.name && <button onClick={() => clear(item.id)} style={{ 'justifySelf': 'end', 'cursor': 'pointer' }}>X</button> }
                </div>}
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default VerticalDraggableContainer;
