import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react'
import { BrowserRouter, Link, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Auth } from "aws-amplify"
import Toast from 'react-bootstrap/Toast';

import logo from '../../assets/logo.png'
import logo1 from '../../assets/logo1.png'

const Confirmacao = () => {
    const history = useHistory()
    
    const[formData, setFormData] = useState({
        confirmationCode: '',
        username: '',
    })

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
    
        const {confirmationCode, username} = formData

        await Auth.confirmSignUp(username, confirmationCode)
        .then(response => {
            if(response === "SUCCESS"){
                showToastFunction("Sua conta foi verificada. Voce ira para a pagina de login.", 2)
                history.push('/')
            }
            console.log(response)
        })
        .catch(err =>{
            console.log(err)
            if(err.code === "ExpiredCodeException"){
                showToastFunction("O codigo expirou.", 1)
            }
        })

        showToastFunction("Cadastro feito com sucesso. Voce sera redirecionado para a pagina de Login", 2)

        history.push('/')
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
    
        setFormData({ ...formData, [name]: value })
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
        
        <div className="col-sm-4 bg-light text-center offset-sm-4 mt-3 rounded pt-3 pb-3">
            <div className="row justify-content-center mt-5 mb-5">
                        <img src={logo} style={{width:'25%', height: '25%',  minWidth: '80px', minHeight: '50px'}} alt="logo"/>
            </div>

                <form className="text-center" onSubmit={handleSubmit}>
                        <div className="form-group pr-5 pl-5">
                            <div className="camposconf">
                                <label className="text-danger" htmlFor="username">Digite o usuario cadastrado:</label>
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
                            <div className="camposconf">
                                <label className="text-danger" htmlFor="confirmationCode">Digite o codigo recebido no Email cadastrado:</label>
                                    <input className="form-control"
                                        type="text"
                                        name="confirmationCode"
                                        id="confirmationCode"
                                        onChange={handleInputChange}
                                        required
                                    />
                            </div>
                        </div>
                        
                        
                        
                                <button type="submit" className="btn btn-danger">
                                    Enviar
                                </button>
                       

                </form>
        </div>
        </>

    )
}


export default Confirmacao