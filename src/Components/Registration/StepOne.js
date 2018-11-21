import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class StepOne extends Component{
render(){
    let {first_name, handleChange} = this.props
    return(

        <div>
        <h3>Step 1</h3>{first_name}
        <input type="text" name="first_name"  value={first_name} onChange={handleChange} placeholder="First name"/>
        <Link to= {'/register/step2/3'}><button>Step two</button></Link>
        </div>
    )
}

}

export default StepOne