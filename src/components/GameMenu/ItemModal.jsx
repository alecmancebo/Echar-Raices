import { useContext } from 'react';
import { Context } from '../../context/Context.jsx'; 

const ItemModal = ({ item, onClose }) => {
    const { saveInventoryItem } = useContext(Context);

    if (!item) return null;

    const handleSave = async () => {
        const ok = await saveInventoryItem(item);
        if (ok) {
            onClose();
        }
    };

    return (
        <div className="item-modal">
            <div className="item-modal__container">
                <button className="modal__close-btn" onClick={onClose}>
                    <img src="/x.png" alt="Close" />
                </button>
                <img className="item-modal__bg" src="/Overlay-Item.png" alt="" />
                
                <div className="item-modal__content">
                    <h2 className="item-modal__title">{item.name}</h2>
                    
                    <div className="item-modal__image-wrapper">
                        <img src={item.src} alt={item.name} className="item-modal__image" />
                    </div>
                    
                    <p className="item-modal__desc">{item.description}</p>
                    
                    <div className="item-modal__actions">
                        <button className="pixel-btn item-modal__btn" onClick={handleSave}>guardar</button>
                        <button className="pixel-btn__secondary item-modal__btn" onClick={onClose}>dejar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;