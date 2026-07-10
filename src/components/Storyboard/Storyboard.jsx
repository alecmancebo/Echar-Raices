import { useContext, useEffect } from 'react';
import { Context } from '../../context/Context.jsx'; 

const introStoryData = {
    1: { gif: "/story1.gif", text: "Narrativa de la pantalla 1" },
    2: { gif: "/story2.gif", text: "Narrativa de la pantalla 2" },
    3: { gif: "/story3.gif", text: "Narrativa de la pantalla 3" },
    4: { gif: "/story4.gif", text: "Narrativa de la pantalla 4" }
};

const endingStoryData = {
    a: {
        1: { gif: "/ending-a-1.gif", text: "Me rendi al ritmo del jardin y encontre calma en lo que brota." },
        2: { gif: "/ending-a-2.gif", text: "Cada hoja se volvio refugio y la tierra dejo de ser amenaza." },
        3: { gif: "/ending-a-3.gif", text: "Ahora escucho al mundo crecer conmigo, no contra mi." },
        4: { gif: "/ending-a-4.gif", text: "Final A: me converti en raiz, pero tambien en hogar." }
    },
    b: {
        1: { gif: "/ending-b-1.gif", text: "Quise cortar, quemar, arrancar aquello que no entendia." },
        2: { gif: "/ending-b-2.gif", text: "La lucha me sostuvo un tiempo, pero me dejo cicatrices." },
        3: { gif: "/ending-b-3.gif", text: "Entre humo y espinas, encontre una forma dura de seguir." },
        4: { gif: "/ending-b-4.gif", text: "Final B: sobrevivi resistiendo, aun con el cuerpo temblando." }
    },
    c: {
        1: { gif: "/ending-c-1.gif", text: "Busque control en remedios y rituales para frenar el cambio." },
        2: { gif: "/ending-c-2.gif", text: "Cada intento de cura me alejo un poco mas de quien era." },
        3: { gif: "/ending-c-3.gif", text: "Entendi tarde que no todo proceso se puede domesticar." },
        4: { gif: "/ending-c-4.gif", text: "Final C: quede suspendide entre sanar y desaparecer." }
    }
};

const Storyboard = () => {
    const { currentStoryScreen, advanceStory, storyMode, winningItinerary } = useContext(Context);
    const route = winningItinerary && endingStoryData[winningItinerary] ? winningItinerary : 'a';
    const currentData = storyMode === 'ending'
        ? endingStoryData[route]?.[currentStoryScreen]
        : introStoryData[currentStoryScreen];

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