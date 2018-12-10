import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './SearchSuggestions'


class Search extends Component {
  constructor(){
    super()
  this.state = {
    query: '',
    results: []
  }
}

  getInfo = () => {
    axios.get(`api/search/${this.state.query}`)
      .then( response  => {
          console.log(111,response)
        this.setState({
          results: response.data               
        })
      })
  }
  // clearResults = (e) =>{
  //   this.setState({
  //     results:[]
  //   })
  // }
  clearResults = () => {

    this.setState({
      results:[],
      query: ''
    })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length >= 1) {

          this.getInfo()
        
      }else if(this.state.query.length === 0){
      this.clearResults()
      }
    })
    
  }

  render() {
    return (
        <div>
        <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" value={this.state.query}
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
            </div>
            {/* <p>{this.state.query}</p> */}
      </form>
      <Suggestions
      results={this.state.results} 
      onClick={this.clearResults}/>
      </div>
    )
  }
}

export default Search

