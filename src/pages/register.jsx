import { GoogleLogin } from '@react-oauth/google';

function Register() {

    const handleGoogleRegister = async (credentialResponse) => {
        try {
            const res = await fetch('/api/v1/register/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token_id: credentialResponse.credential })
                })

            if (res.ok) {
                const data = await res.json()
                console.log("Registro exitoso:", data);
                localStorage.setItem("token", data.access_token);
                window.location.href = "/dashboard";
            } else {
                const errorData = await res.json();
                throw new Error(errorData.detail || "Error desconocido");
            }

        } catch (error) {
            console.error("Error al registrarse con Google:", error);
            alert(error.message);
        }
    }


    return (
        <main id="main-content" className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 wow fadeIn" data-wow-delay="0.1s">
                            <div className="form-wrapper mx-auto">
                                <div className="form-header text-center mb-4">
                                    <p className="d-inline-block bg-dark text-primary py-1 px-4 mb-3"
                                        style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Nuevo Usuario</p>
                                    <h2 className="text-center" style={{ fontSize: '2.2rem' }}>Crea tu cuenta</h2>
                                    <p className="text-center mt-2">Regístrate rápidamente usando tu cuenta de Google.</p>
                                </div>
                                <div className="d-flex flex-column align-items-center mt-3">
                                    <div className="form-animated-element stagger-1 w-100 d-flex justify-content-center">
                                        <GoogleLogin
                                            onSuccess={handleGoogleRegister}
                                            onError={() => {
                                                console.log('Register Failed');
                                            }}
                                        />
                                    </div>
                                    <div className="form-animated-element stagger-2 mt-4 text-center">
                                        ¿Ya tienes una cuenta? <br/>
                                        <a href="/" className="btn btn-outline-primary mt-2">
                                            Inicia sesión aquí
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
