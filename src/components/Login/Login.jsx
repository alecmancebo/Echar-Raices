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
        <div className="login-view gameContainer">
            <img className="login-background" src="/login.png" alt="" />

            <div className="login-content">
                <h2 className="login-title">REGÍSTRATE</h2>

                <form className="login-form" onSubmit={handleEnter}>
                    <div className="login-field">
                        <label>Usuario</label>
                        <input className="login-input" type="text" placeholder="Nombre..." required />
                    </div>

                    <div className="login-field">
                        <label>Contraseña</label>
                        <input className="login-input" type="password" placeholder="******" required />
                    </div>

                    <div className="login-actions">
                        <button type="submit" className="pixel-btn">
                            entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;