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
        <div className="storyboard">
           
            <img className="storyboard__bg" src="/animaciones.png" alt="Marco" />

            <div className="storyboard__content">
                
                <div className="storyboard__animation">
                    <img 
                        className="storyboard__gif" 
                        src={currentData.gif} 
                        alt={`Historia Pantalla ${currentStoryScreen}`} 
                    />
                </div>

                <div className="storyboard__text-box">
                    <p>{currentData.text}</p>
                </div>

            </div>
        </div>
    );
};

export default Storyboard;