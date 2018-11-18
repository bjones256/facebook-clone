import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

class Register extends Component{

render(){
    return(
    <div>
        <h3>"This is the <strong>Register</strong> component"</h3>
        <Switch>
        <Route path="/register/step2/3" component={StepTwo}/>
        <Route path="/register/step3/3" component={StepThree}/>
        <Route path="/register" component={StepOne}/>
        </Switch>

    </div>
    )
}

}

export default Register