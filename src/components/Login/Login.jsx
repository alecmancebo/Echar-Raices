import { useContext, useState } from 'react';
import { Context } from '../../context/Context.jsx';
import { AuthContext } from '../../context/AuthContext'; 


const Login = () => {
    const { setGameState, initializeNewRun, pendingAction, setPendingAction } = useContext(Context);
    const { login } = useContext(AuthContext);

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEnter = async (e) => {
        e.preventDefault();

        const usuarioLimpio = usuario.trim();
        const passwordLimpia = password.trim();

        if (!usuarioLimpio || !passwordLimpia) {
            setError('Debes completar usuario y contraseña.');
            return;
        }

        setError('');

        try {
            const respuesta = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario: usuarioLimpio, password: passwordLimpia })
            });

            if (!respuesta.ok) {
                throw new Error("Credenciales inválidas");
            }

            const data = await respuesta.json();
            login(data.token);

            if (pendingAction === 'new') {
                await initializeNewRun();
            }

            setPendingAction(null);
            setGameState('LOADING_GAME');
        } catch (err) {

            console.error("Error en login:", err);
            setError('Usuario o contraseña incorrectos.');
        }
    };

    const handleCancel = () => {
        setGameState('START_MENU');
    };

    return (
        <div className="login game-container">
            <img className="login__bg" src="/UI/login.png" alt="" />

            <div className="login__content">
                <h2 className="login__title">INICIA SESIÓN</h2>

                <form className="login__form" onSubmit={handleEnter}>
                    <div className="login__field">
                        <label>Usuario</label>
                        <input className="login__input" type="text" placeholder="Nombre..." value={usuario}
                        onChange={(e) => {
                            setUsuario(e.target.value);
                            if (error) setError('');
                        }}/>
                    </div>

                    <div className="login__field">
                        <label>Contraseña</label>
                        <input className="login__input" type="password" placeholder="******" value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError('');
                        }}/>
                    </div>

                    <div className="login__actions">
                        <button type="submit" className="pixel-btn login__btn">
                            entrar
                        </button>
                    </div>
                    {error && <p className="login__error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;