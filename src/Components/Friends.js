import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Friends extends Component{
    constructor(){
        super()
        this.state={
            friends:[]
        }

    }
    componentDidMount(){
this.setState({
    friends: this.props.friends
})
    }

render(){
    return (
        <div class="col-xs-12 card profile-friends">
            { this.state.friends.map( friend => {
                return (                
                <div class="col-xs-4 friend-img-container" >
                    <Link to={{ pathname: `/profile/${friend.id}`}} onClick={()=>(this.changeProfile(friend.id))}>                
                        <img class="friend-img" src={friend.profile_img}/>
                        <p>{friend.first_name} {friend.last_name}</p>
                    </Link>
                </div>
                )
            })}
        </div>
    )
}
}
export default Friends