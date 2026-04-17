import { useContext, useEffect } from 'react';
import { Context } from '../../context/Context.jsx'; 

const storyData = {
    1: { gif: "/story1.gif", text: "Narrativa de la pantalla 1" },
    2: { gif: "/story2.gif", text: "Narrativa de la pantalla 2" },
    3: { gif: "/story3.gif", text: "Narrativa de la pantalla 3" },
    4: { gif: "/story4.gif", text: "Narrativa de la pantalla 4" }
};

const Storyboard = () => {
    const { currentStoryScreen, advanceStory } = useContext(Context);
    const currentData = storyData[currentStoryScreen];

    useEffect(() => {
        const handleKeyPress = (event) => {
            advanceStory();
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [advanceStory]); 

    return (
        <div className="storyboard-container">
            {/* 1. NUEVO: El PNG de tu marco dibujado */}
            <img className="storyboard-frame-bg" src="/animaciones.png" alt="Marco" />

            {/* 2. NUEVO: Contenedor flotante que agrupa el contenido por encima del marco */}
            <div className="storyboard-content">
                
                <div className="storyboard-animation-box">
                    <img 
                        className="storyboard-gif" 
                        src={currentData.gif} 
                        alt={`Historia Pantalla ${currentStoryScreen}`} 
                    />
                </div>

                <div className="storyboard-text-box">
                    <p>{currentData.text}</p>
                </div>

            </div>
        </div>
    );
};

export default Storyboard;