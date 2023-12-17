import React, { useState } from 'react';
import { SLOT_HEIGHT, SLOT_STYLE } from './constants'

const VerticalDraggableContainer = () => {
    const slots = Array(25).fill(null).map((_, index) => ({ id: index + 1, name: '' }));
    const [items, setItems] = useState(slots);
    const [newItem, setNewItem] = useState({ name: '', details: ''});
    const [draggedItem, setDraggedItem] = useState(null);

    const handleAddItem = () => {
        if (newItem.name.trim() === '')
            return
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            const emptySlotIndex = updatedItems.findIndex(item => item.name === '');
            if (emptySlotIndex !== -1) {
                updatedItems[emptySlotIndex] = {
                    id: emptySlotIndex + 1,
                    name: `${newItem.name}${newItem.details? " : " + newItem.details : "" }`
                };
            }
            return updatedItems;
        });
        setNewItem({ name: '', details: ''});
    };

    const handleDragStart = (e, index) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedItem === null || Math.abs(draggedItem - index) !== 1) {
            return;
        }
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].name = updatedItems[draggedItem].name
            updatedItems[draggedItem].name = ""
            return updatedItems;
        });
        setDraggedItem(index);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

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
                {items.map((item, index) => (
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
                            onDragStart={ e => handleDragStart(e, index) }
                            onDragOver={ e => handleDragOver(e, index) }
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
