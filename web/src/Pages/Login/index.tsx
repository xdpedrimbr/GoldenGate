import { Auth, signInButton } from 'aws-amplify'
import React, {useState, ChangeEvent, FormEvent} from 'react'
import { BrowserRouter, Link, useHistory } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast';

import logo from '../../assets/logo.png'
import logo1 from '../../assets/logo1.png'



const Login = () => {
    const history = useHistory()

    const[formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState<string>('')
    const [toastTitle, setToastTitle] = useState<string>('')
    const [toastClassName, setToastClassName] = useState<string>('')
    const toggleShowToast = () => setShowToast(!showToast)

    function showToastFunction(message: string, code: number){
        setShowToast(true);
        setToastMessage(message);
        if(code === 2){
            setToastTitle('Sucesso!');
            setToastClassName('bg-success text-light')
        }else{
            setToastTitle('Erro!');
            setToastClassName('bg-danger text-light');
        }
    }
    
    function handleSubmit(event: FormEvent){
        event.preventDefault()

        const {username, password} = formData

        Auth.signIn({username, password})
        .then(responseCognitoUser => {
            setShowToast(true);
            console.log("Conectado");
            console.log("CognitoUser");
            console.log(responseCognitoUser);
            Auth.currentSession()
            .then(responseUserSession => {
                showToastFunction("Login feito com sucesso!", 2)
                console.log("O usuario que esta conectado: ")
                console.log(responseUserSession);
                history.push('/Home')
            })
            .catch(err => {
                showToastFunction("Nao foi possivel se conectar" + err.code, 1)
            })
        })
        .catch(err => {
            if(err.code === "NotAuthorizedException"){
                showToastFunction("Usuario ou Email incorretos!", 1)
            }
        })

        
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }
    
    
    return( 
            <>
                <Toast show={showToast} onClose={toggleShowToast} delay={5000} autohide style={{position: 'fixed', bottom: 0, right: 0, zIndex: 999, maxWidth: '200px'}}>
                <Toast.Header className={toastClassName} >
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>

            <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded pt-3 pb-3">  
                {/* coloca a logo em cima dos campos de login */}
                <div className="row justify-content-center mt-5 mb-5">
                        <img src={logo} style={{width:'25%', height: '25%',  minWidth: '80px', minHeight: '50px'}} alt="logo"/>
                </div>
            
                <div className="row justify-content-center mt-2 mb-5">
                    <form className="text-center" onSubmit={handleSubmit}>
                        
                        <div className="form-group pr-5 pl-5">
                            <div className="camposlog">
                                <label className="text-danger" htmlFor="username">Digite seu nome de Usuario: </label>
                                    <input className="form-control"
                                        type="text"
                                        name="username"
                                        id="username"
                                        onChange={handleInputChange}
                                        required
                                    />
                            </div>
                        </div>
                    
                        
                    <div className="form-group pr-5 pl-5">
                        <div className="camposlog">
                            <label className="text-danger" htmlFor="password">Digite sua senha: </label>
                                <input className="form-control"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleInputChange}
                                    required
                                />
                        </div>
                    </div>
                    

                    <button type="submit" className="btn btn-danger">
                        Enviar
                    </button>

                    <div className="form-group form-check mt-4">
                    
                    <main>
                        Ainda nao é cadastrado? 
                        <Link to="/cadastro">
                            <span className="mr-2">
                                Registre-se.
                            </span>
                        </Link>
                        <br></br>

                        <Link to="/confirmacao">
                            <span>
                                Verifique sua conta aqui!
                            </span>
                        </Link>
                    </main>

                </div>


                </form>

                

            </div>
    </div>
    </>


    )
}

export default Login
