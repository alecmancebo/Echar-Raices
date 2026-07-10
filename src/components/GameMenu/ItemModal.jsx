import { useContext, useState } from 'react';
import { Context } from '../../context/Context.jsx'; 

// MODAL DE ACCIONES DE OBJETO
const ItemModal = ({ item, onClose, onUse, onDrop, onSave }) => {
    const { saveInventoryItem } = useContext(Context);
    const [assetWarning, setAssetWarning] = useState('');

    if (!item) return null;

    const handleSave = async () => {
        const ok = await (onSave ? onSave(item) : saveInventoryItem(item));
        if (ok) {
            onClose();
        }
    };

    const handleUse = async () => {
        if (!onUse) return;
        const ok = await onUse(item);
        if (ok) {
            onClose();
        }
    };

    const handleDrop = async () => {
        if (!onDrop) return;
        const ok = await onDrop(item);
        if (ok) {
            onClose();
        }
    };

    const handleModalBgError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = '/UI/menu.png';
        setAssetWarning('No se pudo cargar el fondo del objeto.');
    };

    const handleItemImageError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = '/UI/shadow.png';
        setAssetWarning('No se pudo cargar la imagen del objeto.');
    };

    return (
        <div className="item-modal">
            <div className="item-modal__container">
                <button className="modal__close-btn" onClick={onClose}>
                    <img src="/UI/x.png" alt="Close" />
                </button>
                <img className="item-modal__bg" src="/UI/Overlay-Item.png" alt="" onError={handleModalBgError} />
                
                <div className="item-modal__content">
                    <h2 className="item-modal__title">{item.name}</h2>
                    
                    <div className="item-modal__image-wrapper">
                        <img src={item.src} alt={item.name} className="item-modal__image" onError={handleItemImageError} />
                    </div>
                    
                    <p className="item-modal__desc">{item.description}</p>
                    
                    <div className="item-modal__actions">
                        {onUse ? (
                            <button className="pixel-btn item-modal__btn" onClick={handleUse}>usar</button>
                        ) : (
                            <button className="pixel-btn item-modal__btn" onClick={handleSave}>guardar</button>
                        )}
                        {onDrop ? (
                            <button className="pixel-btn__secondary item-modal__btn" onClick={handleDrop}>dejar</button>
                        ) : (
                            <button className="pixel-btn__secondary item-modal__btn" onClick={onClose}>dejar</button>
                        )}
                    </div>
                    {assetWarning && <p className="asset-warning">{assetWarning}</p>}
                </div>
            </div>
        </div>
    );
};

export default ItemModal;