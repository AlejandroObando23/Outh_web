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
                            <div className="form-wrapper mx-auto p-5" style={{ backgroundColor: '#1c1924', borderRadius: '15px', maxWidth: '500px', boxShadow: '0px 10px 30px rgba(0,0,0,0.8)' }}>
                                <div className="form-header text-center mb-4">
                                    <h2 className="text-center text-uppercase fw-bold text-white mb-2" style={{ fontSize: '1.8rem', letterSpacing: '2px' }}>Registro de Usuario</h2>
                                    <p className="text-center" style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>Crea tu cuenta para acceder a nuestros servicios.</p>
                                </div>
                                <div className="d-flex flex-column align-items-center mt-5">
                                    <div className="form-animated-element stagger-1 w-100 d-flex justify-content-center mb-4">
                                        <GoogleLogin
                                            onSuccess={handleGoogleRegister}
                                            onError={() => {
                                                console.log('Register Failed');
                                            }}
                                            theme="filled_black"
                                            shape="rectangular"
                                            text="signup_with"
                                            width="300"
                                        />
                                    </div>
                                    <div className="form-animated-element stagger-2 mt-4 text-center">
                                        <span style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>¿Ya tienes una cuenta?</span> <br/>
                                        <a href="/" className="text-white mt-1 d-inline-block text-decoration-none" style={{ fontSize: '0.95rem', borderBottom: '1px solid #fff' }}>
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
