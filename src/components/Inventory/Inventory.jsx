import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context.jsx';

const Inventory = () => {
    const { 
        isInventoryOpen, closeInventory, 
        inventoryItems, selectedItemId, setSelectedItemId 
    } = useContext(Context);

    if (!isInventoryOpen) return null;

    const selectedItem = inventoryItems.find(item => item.id === selectedItemId);

    // Sub-componente interno para gestionar el estado individual de cada slot
    const Slot = ({ item, isSelected, onClick }) => {
        const [isHovered, setIsHovered] = useState(false);
        
        // Determina la imagen de fondo según el hover
        const baseImage = isHovered ? '/slot-base-hover.png' : '/slot-base.png';

        return (
            <div 
                className={`inventory__slot ${isSelected ? 'inventory__slot--active' : ''} ${!item ? 'inventory__slot--empty' : ''}`}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Capa 1: Imagen de fondo del slot */}
                <img src={baseImage} alt="slot" className="inventory__slot-bg" />
                
                {/* Capa 2: Ícono del objeto (si existe) */}
                {item && item.icon && (
                    <img src={item.icon} alt={item.name} className="inventory__item-icon" />
                )}
            </div>
        );
    };

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
                    <div className="inventory__panel--right">
                        <h3 className="inventory__title">Inventario</h3>
                        
                        <div className="inventory__grid">
                            {/* Renderizar los objetos reales del inventario */}
                            {inventoryItems.map((item) => (
                                <Slot 
                                    key={item.id} 
                                    item={item} 
                                    isSelected={selectedItemId === item.id}
                                    onClick={() => setSelectedItemId(item.id)}
                                />
                            ))}
                            
                            {/* Renderizar los slots vacíos necesarios para llegar a 12 */}
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
        </div>
    );
};

export default Inventory;