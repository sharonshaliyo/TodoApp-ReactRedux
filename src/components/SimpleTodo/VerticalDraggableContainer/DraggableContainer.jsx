import React, { useReducer, useState } from 'react';
import { SLOT_HEIGHT, SLOT_STYLE } from './constants'

const slots = Array(25).fill(null).map((_, index) => ({ id: index, name: '' }));
const initialState = {
    items: slots
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
    const [newItem, setNewItem] = useState({ name: '', details: ''});
    const [draggedItem, setDraggedItem] = useState(null);

    const handleAddItem = () => {
        if (newItem.name.trim() === '')
            return
        dispatch({ type: 'setItems', payload: (() => {
            const emptySlotIndex = itemsState.items.findIndex(item => item.name === '');
            if (emptySlotIndex !== -1) {
                itemsState.items[emptySlotIndex] = {
                    id: emptySlotIndex,
                    name: `${newItem.name}${newItem.details? " : " + newItem.details : "" }`
                };
            }
            return [...itemsState.items];
        })() })
        setNewItem({ name: '', details: ''});
    };

    const handleDragStart = (e, index) => {
        setDraggedItem({ ...itemsState.items[index] });
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedItem === null || Math.abs(draggedItem.id - index) !== 1) {
            return;
        }
        dispatch({ type: 'setItems', payload: (() => {
            if (index === draggedItem.id)
                return itemsState.items
            itemsState.items[index].name = draggedItem.name
            itemsState.items[draggedItem.id].name = ""
            return [...itemsState.items];
        })() })
        setDraggedItem({ ...itemsState.items[index] });
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    // console.log(itemsState)
    return (
        <div>
            <div style={{ margin: '10px 0' }}>
                <input
                    style={{ marginRight: '5px', padding: '5px' }}
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={ e => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    style={{ marginRight: '5px', padding: '5px' }}
                    type="text"
                    placeholder="Details"
                    value={newItem.details}
                    onChange={ e => setNewItem({ ...newItem, details: e.target.value }) }
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            <div style={{ width: '300px', height: '1000px', position: 'relative' }}>
                { itemsState.items.map((item, index) => (
                    <div key={item.id} style={{ display: 'flex' }}>
                        <span style={{ marginLeft: 10 }}>{item.id}: </span>
                        <div
                            style={{
                                ...SLOT_STYLE,
                                backgroundColor: draggedItem === index ? 'lightblue' : 'white',
                                top: `${index * SLOT_HEIGHT}px`,
                                cursor: item.name === '' ? 'default' : 'grab'
                            }}
                            draggable={item.name !== ''}
                            onDragStart={e => handleDragStart(e, index)}
                            onDragOver={e => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                        >
                            <span>{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalDraggableContainer;
