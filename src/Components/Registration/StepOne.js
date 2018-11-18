import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class StepOne extends Component{

render(){
    return(

        <div>
        <h3>Step 1</h3>
        <Link to= {'/register/step2/3'}><button>Step two</button></Link>
        </div>
    )
}

}

export default StepOne