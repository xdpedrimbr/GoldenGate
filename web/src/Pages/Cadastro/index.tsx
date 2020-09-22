import { Auth } from 'aws-amplify'
import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react'
import { BrowserRouter, Link, useHistory } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast';

import logo from '../../assets/logo.png'
import logo1 from '../../assets/logo1.png'

const Cadastro = () => {
    const history = useHistory()
    
    const [formData, setFormData] = useState({
        email:'',
        password:'',
        username:'',
        name:'',
    })

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value })
    }

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastTitle, setToastTitle] = useState<string>('');
    const [toastClassName, setToastClassName] = useState<string>('');
    const toggleShowToast = () => setShowToast(!showToast); 

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
    
    async function handleSubmit(event: FormEvent){
        event.preventDefault()

        const {email, password, username, name} = formData

        await Auth.signUp({username, password, attributes:{email, name}})
            .then(response=>{
                setShowToast(true);
                showToastFunction("Verifique o codigo enviado ao seu email.", 2)
            })
            .catch(err =>{
                if(err.code === "UsernameExistsException"){
                    showToastFunction("Usuario ja existe!", 1)
                }else if(err.code === "InvalidPasswordException"){
                    showToastFunction("A senha nao cumpre os requisitos!", 1)
                }
                console.log(err)
            })

        history.push('/confirmacao')
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

        <div className="row justify-content-center mt-2 mb-5">
            <div className="col-sm-4 bg-light text-center mt-5 rounded pt-3 pb-3">
                <form className="text-center" onSubmit={handleSubmit}>
                    <h1 className="text-danger">Cadastre-se</h1>

                        
                            <div className="form-group pr-5 pl-5">
                                <div className="campos">
                                    <label className="text-danger" htmlFor="name">Nome:</label>
                                    <input className="form-control"
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        


                            <div className="form-group pr-5 pl-5">
                                <div className="campos">
                                    <label className="text-danger" htmlFor="username">Usuario:</label>
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
                                <div className="campos">
                                    <label className="text-danger" htmlFor="email">Email:</label>
                                    <input className="form-control"
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group pr-5 pl-5">
                                <div className="campos">
                                    <label className="text-danger" htmlFor="password">Senha:</label>
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
                                    Cadastrar
                                </button>
                            

                    
                </form>
            </div>   
        </div>
        </>
    )
}

export default Cadastro