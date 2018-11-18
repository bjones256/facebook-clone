import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class StepTwo extends Component{

render(){
    return(

        <div>
        <h3>Step 2</h3>
        <Link to= {'/register/step3/3'}><button>Step Three</button></Link>
        </div>
    )
}

}

export default StepTwo