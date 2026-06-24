import React, { useContext } from 'react';
import { Context } from '../../context/Context.jsx';

const Inventory = () => {
    const { 
        isInventoryOpen, closeInventory, 
        inventoryItems, selectedItemId, setSelectedItemId 
    } = useContext(Context);

    if (!isInventoryOpen) return null;

    const selectedItem = inventoryItems.find(item => item.id === selectedItemId);

    return (
        <div className="modal-overlay">
            <div className="inventory">
                <img className="inventory__bg" src="inventario.png" alt="" />
                
                <button className="inventory__close-btn" onClick={closeInventory}>
                    <img src="/x.png" alt="Close" />
                </button>
                
                <div className="inventory__content">
                    
                    {/* Panel Izquierdo: Reflejo */}
                    <div className="inventory__panel">
                        <h3 className="inventory__title">Reflejo</h3>
                        
                        <div className="inventory__reflection-box">
                            <img src="/pozo.png" alt="Reflejo" className="inventory__reflection-icon pixelated" />
                        </div>
                        
                        <p className="inventory__text">
                            Me veo algo extrañx en este pozo... ¿Soy yo?
                        </p>
                    </div>

                    {/* Panel Derecho: Cuadrícula de Inventario */}
                    <div className="inventory__panel inventory__panel--right">
                        <h3 className="inventory__title">Inventario</h3>
                        
                        <div className="inventory__grid">
                            {inventoryItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className={`inventory__slot ${selectedItemId === item.id ? 'inventory__slot--active' : ''}`}
                                    onClick={() => setSelectedItemId(item.id)}
                                >
                                    {item.icon ? (
                                        <img src={item.icon} alt={item.name} className="inventory__item-icon pixelated" />
                                    ) : (
                                        <div className="inventory__item-icon--empty"></div>
                                    )}
                                </div>
                            ))}
                            
                            {[...Array(Math.max(0, 12 - inventoryItems.length))].map((_, index) => (
                                <div key={`empty-${index}`} className="inventory__slot inventory__slot--empty"></div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Inventory;