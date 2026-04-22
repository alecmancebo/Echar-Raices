
import React, { useContext } from 'react';
import { Context } from '../../context/Context.jsx';

const Inventory = () => {
    const { 
        isInventoryOpen, closeInventory, 
        inventoryItems, selectedItemId, setSelectedItemId 
    } = useContext(Context);

    // No renderizar nada si el inventario está cerrado
    if (!isInventoryOpen) return null;

    // cuales el objeto seleccionado actual
    const selectedItem = inventoryItems.find(item => item.id === selectedItemId);

    return (
        <div className="menu-modal-overlay">
            <div className="inventory-modal-box">
                <img className="inventory-bg-image" src="inventario.png" alt="" />
                
                {/* Botón cerrar*/}
                <button className="menu-close-btn" onClick={closeInventory}>
                    <img src="/x.png" alt="Close" />
                </button>
                
                <div className="inventory-content-wrapper">
                    
                    {/*Reflejo */}
                    <div className="inventory-reflection-panel">
                        <h3 className="inventory-panel-title">Reflejo</h3>
                        
                        <div className="reflection-illustration-box">
                            <img src="/pozo.png" alt="Reflejo" className="reflection-icon pixelated" />
                        </div>
                        
                        <p className="reflection-text">
                            Me veo algo extrañx en este pozo... ¿Soy yo?
                        </p>
                    </div>

                    {/*Cuadrícula de Inventario */}
                    <div className="inventory-items-panel">
                        <h3 className="inventory-panel-title">Inventario</h3>
                        
                        <div className="inventory-grid">
                            {inventoryItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className={`inventory-item-slot ${selectedItemId === item.id ? 'active' : ''}`}
                                    onClick={() => setSelectedItemId(item.id)}
                                >
                                    {/*icono del objeto*/}
                                    {item.icon ? (
                                        <img src={item.icon} alt={item.name} className="item-icon pixelated" />
                                    ) : (
                                        <div className="empty-item-icon"></div>
                                    )}
                                </div>
                            ))}
                            
                            {/* max 12 huecos*/}
                            {[...Array(Math.max(0, 12 - inventoryItems.length))].map((_, index) => (
                                <div key={`empty-${index}`} className="inventory-item-slot empty"></div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Inventory;