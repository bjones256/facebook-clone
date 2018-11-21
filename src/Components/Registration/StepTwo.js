import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class StepTwo extends Component{

render(){
    let {first_name} = this.props
    return(

        <div>
        <h3>Step 2</h3>
        <input type="text" name="first_name"  onChange={e => this.handleChange(e)} placeholder="First name"/>
        <Link to= {'/register/step3/3'}><button>Step Three</button></Link>
        </div>
    )
}

}

export default StepTwo