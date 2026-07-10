import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context.jsx';
import ItemModal from '../GameMenu/ItemModal.jsx';

const Inventory = () => {
    const { 
        isInventoryOpen, closeInventory,
        inventoryItems, selectedItemId, setSelectedItemId,
        useInventoryItem, dropInventoryItem
    } = useContext(Context);

    const [activeInventoryItem, setActiveInventoryItem] = useState(null);

    if (!isInventoryOpen) return null;

    const Slot = ({ item, isSelected, onClick }) => {
        const [isHovered, setIsHovered] = useState(false);
        const isDisabled = Boolean(item?.isUsed);
        
        const baseImage = isHovered && !isDisabled ? '/UI/slot-base-hover.png' : '/UI/slot-base.png';

        return (
            <div 
                className={`inventory__slot ${isSelected ? 'inventory__slot--active' : ''} ${!item ? 'inventory__slot--empty' : ''} ${isDisabled ? 'inventory__slot--disabled' : ''}`}
                onClick={() => {
                    if (isDisabled || !item) return;
                    onClick();
                }}
                onMouseEnter={() => {
                    if (!isDisabled) setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: isDisabled ? 'default' : 'pointer' }}
            >
                <img src={baseImage} alt="slot" className="inventory__slot-bg" />
                
                {item && (item.icon || item.src) && (
                    <img 
                        src={item.icon || item.src} 
                        alt={item.name} 
                        className={`inventory__item-icon ${item.isUsed ? 'inventory__item-icon--used' : ''}`}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="modal-overlay">
            <div className="inventory">
                <img className="inventory__bg" src="/UI/inventario.png" alt="" />
                
                <button className="inventory__close-btn" onClick={closeInventory}>
                    <img src="/UI/x.png" alt="Close" />
                </button>
                
                <div className="inventory__content">
                    
                    <div className="inventory__panel">
                        <h3 className="inventory__title">Reflejo</h3>
                        
                        <div className="inventory__reflection-box">
                            <img src="/UI/pozo.png" alt="Reflejo" className="inventory__reflection-icon pixelated" />
                        </div>
                        
                        <p className="inventory__text">
                            Me veo algo extrañx en este pozo... ¿Soy yo?
                        </p>
                    </div>

                    <div className="inventory__panel--right">
                        <h3 className="inventory__title">Inventario</h3>
                        
                        <div className="inventory__grid">
                            {inventoryItems.map((item) => (
                                <Slot 
                                    key={item.id} 
                                    item={item} 
                                    isSelected={selectedItemId === item.id}
                                    onClick={() => {
                                        if (item.isUsed) return;
                                        setSelectedItemId(item.id);
                                        setActiveInventoryItem(item);
                                    }}
                                />
                            ))}
                            
                            {[...Array(Math.max(0, 12 - inventoryItems.length))].map((_, index) => (
                                <Slot 
                                    key={`empty-${index}`} 
                                    item={null} 
                                    isSelected={false}
                                    onClick={() => {}}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {activeInventoryItem && (
                <ItemModal
                    item={activeInventoryItem}
                    onClose={() => setActiveInventoryItem(null)}
                    onUse={async (item) => {
                        const ok = await useInventoryItem(item);
                        if (ok) {
                            closeInventory();
                            setActiveInventoryItem(null);
                        }
                        return ok;
                    }}
                    onDrop={async (item) => {
                        const ok = await dropInventoryItem(item);
                        if (ok) {
                            closeInventory();
                            setActiveInventoryItem(null);
                        }
                        return ok;
                    }}
                />
            )}
        </div>
    );
};

export default Inventory;