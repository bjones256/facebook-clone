import React, {Component} from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { userLoggedIn } from '../../Ducks/reducer'
import ReactS3Uploader , {onFinish, getDefaultProps} from 'react-s3-uploader'
 

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            phone:'',
            profile_img:''
        }
        this.handleChange=this.handleChange.bind(this)
    }


//Use this for everything but image
  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  onFinish = (res) => {
    let profile_img = `https://facebook-clone-profile-images.s3.amazonaws.com/${res.fileKey}`
    this.setState({
      profile_img
    },()=>{

      axios.post('/auth/register', this.state).then(response => {
        let user = response.data
        this.props.userLoggedIn(user)
      console.log(user)
      }).catch(err => {
        console.log(err.response)
        this.setState({
          // error: err.response.data
        })
      })

    })

  }

  handleClick = () => {
    // upload the file to s3
    this.uploader.uploadFile();

  }

render(){
    let {first_name, last_name, email, password, phone, profile_img, handleChange} = this.state
    
    return (this.props.isAuthenticated ? 
    <Redirect to="/"/> :
    
    <div class="col-md-4 register-box card col-md-offset-4">

        <div class="row">
          <div class="col col-md-6">
            <input type="text" class="form-control" name="first_name" value={first_name} onChange={this.handleChange} placeholder="first name"/>
          </div>
          <div class="col col-md-6">
            <input type="text" class="form-control" name="last_name" value={last_name} onChange={this.handleChange} placeholder="last name"/>
          </div>
        </div>

        <input type="text" class="form-control" name="email" value={email} onChange={this.handleChange} placeholder="email"/>
        <input type="text" class="form-control" name="password" value={password} onChange={this.handleChange} placeholder="password"/>
        <input type="text" class="form-control" name="phone" value={phone} onChange={this.handleChange} placeholder="phone"/>
       
       {/* Switch this to get file */}

        <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path="pictures/"
                preprocess={this.onUploadStart}
                onSignedUrl={this.onSignedUrl}
                onProgress={this.onProgress}
                onError={this.onUploadError}
                onFinish={this.onFinish}
                signingUrlWithCredentials={ false }      // in case when need to pass authentication credentials via CORS
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                contentDisposition="auto"
                scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                // inputRef={cmp => this.uploadInput = cmp}
                ref={uploader => { this.uploader = uploader; }}
                autoUpload={false}
                
            />
                {/* <input type="button" value="Upload" onClick={this.handleUpload} /> */}
        
        
        
        
        
        
        
        <button class="btn btn-primary" onClick={this.handleClick}>submit</button>
        <br/>







        <Link to ="/login"><small id="emailHelp" class="form-text text-muted">Login</small></Link> 
    </div>
    )
}

}

function mapStateToProps(state) {
    let { isAuthenticated } = state
    return {
      isAuthenticated
    }
  }
  
export default connect(mapStateToProps, { userLoggedIn })(Register)