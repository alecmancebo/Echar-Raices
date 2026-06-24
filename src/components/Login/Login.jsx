import { useContext } from 'react';
import { Context } from '../../context/Context.jsx';

const Login = () => {
    const { setGameState } = useContext(Context);

    const handleEnter = (e) => {
        e.preventDefault();
        setGameState('STORYBOARD');
    };

    const handleCancel = () => {
        setGameState('START_MENU');
    };

    return (
        <div className="login game-container">
            <img className="login__bg" src="/login.png" alt="" />

            <div className="login__content">
                <h2 className="login__title">REGÍSTRATE</h2>

                <form className="login__form" onSubmit={handleEnter}>
                    <div className="login__field">
                        <label>Usuario</label>
                        <input className="login__input" type="text" placeholder="Nombre..." required />
                    </div>

                    <div className="login__field">
                        <label>Contraseña</label>
                        <input className="login__input" type="password" placeholder="******" required />
                    </div>

                    <div className="login__actions">
                        <button type="submit" className="pixel-btn login__btn">
                            entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;