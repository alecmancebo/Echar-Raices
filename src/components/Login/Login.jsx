import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context.jsx';
import { AuthContext } from '../../context/AuthContext'; 
import { API_URL } from '../../config/api';


const Login = () => {
// PANTALLA DE LOGIN
    const { setGameState, initializeNewRun, pendingAction, setPendingAction, loginNotice, setLoginNotice } = useContext(Context);
    const { login } = useContext(AuthContext);

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginBgError = (event) => {
    // FALLBACK DE RECURSOS VISUALES
        event.currentTarget.onerror = null;
        event.currentTarget.src = '/UI/fondo.png';
        setError((prev) => prev || 'No se pudo cargar una imagen de la pantalla de login.');
    };

    useEffect(() => {
        if (loginNotice) {
            setError(loginNotice);
            setLoginNotice('');
        }
    }, [loginNotice, setLoginNotice]);

    // ENVIO DE CREDENCIALES Y ERRORES DE LOGIN
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
            const respuesta = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario: usuarioLimpio, password: passwordLimpia })
            });

            if (!respuesta.ok) {
                if (respuesta.status === 401 || respuesta.status === 403) {
                    setError('Usuario o contraseña incorrectos.');
                    return;
                }

                if (respuesta.status >= 500) {
                    setError('Servidor no disponible. Intenta de nuevo en unos minutos.');
                    return;
                }

                setError('No se pudo iniciar sesión. Inténtalo de nuevo.');
                return;
            }

            const data = await respuesta.json();
            if (!data?.token) {
                setError('Respuesta inválida del servidor.');
                return;
            }

            login(data.token);

            if (pendingAction === 'new') {
                const result = await initializeNewRun(data.token);
                if (!result?.ok) {
                    setError(result?.message || 'No se pudo crear una nueva partida.');
                    return;
                }
                setPendingAction(null);
                setGameState('STORYBOARD');
                return;
            }

            setPendingAction(null);
            setGameState('LOADING_GAME');
        } catch (err) {

            console.error("Error en login:", err);

            if (err instanceof TypeError) {
                setError('No se pudo conectar con el servidor. Revisa la conexión e inténtalo de nuevo.');
                return;
            }

            setError('Error inesperado al iniciar sesión.');
        }
    };

    return (
        <div className="login game-container">
            <img className="login__bg" src="/UI/login.png" alt="" onError={handleLoginBgError} />

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