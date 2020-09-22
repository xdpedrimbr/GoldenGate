import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from './Pages/Home/index'
import Login from './Pages/Login/index'
import Cadastro from './Pages/Cadastro/index'
import Confirmacao from './Pages/Confirmacao'

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Login} path='/' exact />
            <Route component={Home} path='/Home' exact />
            <Route component={Cadastro} path='/cadastro' exact />
            <Route component={Confirmacao} path='/confirmacao' exact />
        </BrowserRouter>
    )
}

export default Routes;