import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './SearchSuggestions'


class Search extends Component {
  state = {
    query: '',
    results: []
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

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length >= 1) {

          this.getInfo()
        
      }else if(this.state.query.length === 0){
        this.setState({
          results:[]
        })
      }
    })
    
  }

  render() {
    return (
        <div>
        <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" 
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
            </div>
            {/* <p>{this.state.query}</p> */}
      </form>
      <Suggestions results={this.state.results} />
      </div>
    )
  }
}

export default Search

