import { useContext, useEffect } from 'react';
import { Context } from '../../context/Context.jsx'; 

const introStoryData = {
    1: { gif: "/story1.gif", text: "Hmmm…\nQué raro.\nAlgo se mueve dentro de mí." },
    2: { gif: "/story2.gif", text: "Esto no debería estar ahí." },
    3: { gif: "/story3.gif", text: "Sigue creciendo.\nQuizá debería hacer algo al respecto." },
    4: { gif: "/story4.gif", text: "Narrativa de la pantalla 4" }
};

const endingStoryData = {
    a: {
        1: { gif: "/final_A_01.png", text: "Una sensación de paz te inunda cuando abrazas la transformación." },
        2: { gif: "/final_A_01.png", text: "En el fondo, nunca le has tenido miedo al cambio. Lo deseabas." },
        3: { gif: "/final_A_01.png", text: "El sol te calienta, el viento mece tus hojas, los pájaros se apoyan en tus ramas y estás en paz." },
        4: { gif: "/final_A_01.png", text: "Tu existencia por siempre conectada con todo aquello que amas. No necesitas nada más." }
    },
    b: {
        1: { gif: "/final_B_01.png", text: "Nada funciona." },
        2: { gif: "/final_B_01.png", text: "No puedes evitar cómo esta retorcida metamorfosis poco a poco consume cada centímetro de tu cuerpo y mente hasta que ya no puedes moverte ni gritar." },
        3: { gif: "/final_B_01.png", text: "Final B: Las hormigas trepan por tu corteza y la lluvia cae sobre tus hojas, pero tú ya no piensas ni sientes nada." }
    },
    c: {
        1: { gif: "/final_C_01.png", text: "Lo has conseguido." },
        2: { gif: "/final_C_01.png", text: "Notas la sangre fluir por tus venas y tu piel es más suave ahora que han dejado de crecer hojas en ella." },
        3: { gif: "/final_C_01.png", text: "Todo ha vuelto a la normalidad." },
        4: { gif: "/final_C_01.png", text: "El alivio por seguir conservando tu cuerpo es mayor que la curiosidad de saber qué habría pasado si hubieras dejado que la metamorfosis siguiera su curso." }
    }
};

const Storyboard = () => {
    const { currentStoryScreen, advanceStory, storyMode, winningItinerary } = useContext(Context);
    const route = winningItinerary && endingStoryData[winningItinerary] ? winningItinerary : 'a';
    const activeStoryData = storyMode === 'ending' ? endingStoryData[route] : introStoryData;
    const maxStoryScreens = Object.keys(activeStoryData || {}).length || 4;
    const currentData = storyMode === 'ending'
        ? endingStoryData[route]?.[currentStoryScreen]
        : introStoryData[currentStoryScreen];

    useEffect(() => {
        const handleKeyPress = (event) => {
            advanceStory(maxStoryScreens);
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [advanceStory, maxStoryScreens]); 

    return (
        <div className="storyboard">
           
            <img className="storyboard__bg" src="/UI/animaciones.png" alt="Marco" />

            <div className="storyboard__content">
                
                <div className="storyboard__animation">
                    <img 
                        className="storyboard__gif" 
                        src={currentData?.gif || "/story1.gif"} 
                        alt={`Historia Pantalla ${currentStoryScreen}`} 
                    />
                </div>

                <div className="storyboard__text-box">
                    <p>{currentData?.text || "Continuara..."}</p>
                </div>

            </div>
        </div>
    );
};

export default Storyboard;