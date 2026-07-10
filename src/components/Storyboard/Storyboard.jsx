import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context.jsx'; 

const introStoryData = {
    1: { gif: "/Narrativa/inicio_01.png", text: "Hmmm…\nQué raro." },
    2: { gif: "/Narrativa/inicio_02.png", text: "Hmmm…\nQué raro." },
    3: { gif: "/Narrativa/inicio_03.png", text: "Hmmm…\nQué raro." },
    4: { gif: "/Narrativa/inicio_04.png", text: "Hmmm…\nQué raro." },
    5: { gif: "/Narrativa/inicio_05.png", text: "Hmmm…\nQué raro." },
    6: { gif: "/Narrativa/inicio_06.png", text: "Hmmm…\nQué raro." },
    7: { gif: "/Narrativa/inicio_07.png", text: "Hmmm…\nQué raro." },
    8: { gif: "/Narrativa/inicio_08.png", text: "Hmmm…\nQué raro." },
    9: { gif: "/Narrativa/inicio_09.png", text: "Hmmm…\nQué raro." },
    10: { gif: "/Narrativa/texto_inicio_01.png", text: "Algo se mueve dentro de mí." },
    11: { gif: "/Narrativa/texto_inicio_02.png", text: "Esto no debería estar ahí." },
    12: { gif: "/Narrativa/texto_inicio_03.png", text: "Sigue creciendo.\nQuizá debería hacer algo al respecto." }
};

const endingStoryData = {
    a: {
        1: { gif: "/Narrativa/final_A_01.png", text: "Una sensación de paz te inunda cuando abrazas la transformación." },
        2: { gif: "/Narrativa/final_A_01.png", text: "En el fondo, nunca le has tenido miedo al cambio. Lo deseabas." },
        3: { gif: "/Narrativa/final_A_01.png", text: "El sol te calienta, el viento mece tus hojas, los pájaros se apoyan en tus ramas y estás en paz." },
        4: { gif: "/Narrativa/final_A_01.png", text: "Tu existencia por siempre conectada con todo aquello que amas. No necesitas nada más." }
    },
    b: {
        1: { gif: "/Narrativa/final_B_01.png", text: "Nada funciona." },
        2: { gif: "/Narrativa/final_B_01.png", text: "No puedes evitar cómo esta retorcida metamorfosis poco a poco consume cada centímetro de tu cuerpo y mente hasta que ya no puedes moverte ni gritar." },
        3: { gif: "/Narrativa/final_B_01.png", text: "Las hormigas trepan por tu corteza y la lluvia cae sobre tus hojas, pero tú ya no piensas ni sientes nada." }
    },
    c: {
        1: { gif: "/Narrativa/final_C_01.png", text: "Lo has conseguido." },
        2: { gif: "/Narrativa/final_C_01.png", text: "Notas la sangre fluir por tus venas y tu piel es más suave ahora que han dejado de crecer hojas en ella." },
        3: { gif: "/Narrativa/final_C_01.png", text: "Todo ha vuelto a la normalidad." },
        4: { gif: "/Narrativa/final_C_01.png", text: "El alivio por seguir conservando tu cuerpo es mayor que la curiosidad de saber qué habría pasado si hubieras dejado que la metamorfosis siguiera su curso." }
    }
};

const Storyboard = () => {
    const { currentStoryScreen, advanceStory, storyMode, winningItinerary } = useContext(Context);
    const [assetWarning, setAssetWarning] = useState('');
    const route = winningItinerary && endingStoryData[winningItinerary] ? winningItinerary : 'a';
    const activeStoryData = storyMode === 'ending' ? endingStoryData[route] : introStoryData;
    const maxStoryScreens = Object.keys(activeStoryData || {}).length || 4;
    const currentData = storyMode === 'ending'
        ? endingStoryData[route]?.[currentStoryScreen]
        : introStoryData[currentStoryScreen];

    useEffect(() => {
        setAssetWarning('');
        const handleKeyPress = (event) => {
            advanceStory(maxStoryScreens);
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [advanceStory, maxStoryScreens]); 

    const handleFrameError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = '/UI/fondo.png';
        setAssetWarning('No se pudo cargar el marco visual.');
    };

    const handleStoryImageError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = "/Narrativa/inicio_09.png";
        setAssetWarning('No se pudo cargar una imagen de la narrativa.');
    };

    return (
        <div className="storyboard">
           
            <img className="storyboard__bg" src="/UI/animaciones.png" alt="Marco" onError={handleFrameError} />

            <div className="storyboard__content">
                
                <div className="storyboard__animation">
                    <img 
                        className="storyboard__gif" 
                        src={currentData?.gif || "/Narrativa/inicio_01.png"} 
                        alt={`Historia Pantalla ${currentStoryScreen}`}
                        onError={handleStoryImageError}
                    />
                </div>

                <div className="storyboard__text-box">
                    <p>{currentData?.text ?? "Continuara..."}</p>
                </div>
                {assetWarning && <p className="asset-warning storyboard__asset-warning">{assetWarning}</p>}

            </div>
        </div>
    );
};

export default Storyboard;