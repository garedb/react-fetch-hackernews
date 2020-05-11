// Stuff from modules
import React from 'react';
import axios from 'axios';

// Resources
import './App.css';

// Constants
const API_URL = 'http://hn.algolia.com/api/v1/search?query='
const DEFAULT_QUERY = 'react'

class AppClass extends React.Component {
	state = {
		name: this.props.name,
		query: DEFAULT_QUERY,
		tempQuery: '',
		data: {
			hits: []
		}
	}

	componentDidMount() {
		// Takes place after component has loaded
		// (rendered once)
		// CALL API
		this.callApi()
	}

	callApi = () => {
    	fetch(API_URL + this.state.query)
    	.then(response => response.json())
    	.then(results => {
      		console.log(results.hits)
      		this.setState({ data: { hits: results.hits }})
    })
	}

	search = (e) => {
		e.preventDefault()
		this.setState({ query: this.state.tempQuery }, () => {
			// This code runs when the seState operation has completed
			console.log('Inside callback', this.state.query)
			this.callApi()
		})
		console.log('Outside callback', this.state.query)
	}

	render() {
		let results = this.state.data.hits.map((d, i) => {
    		return (
      		<div key={i} className="result">
       		 <h3>
          		<a href={d.url}>
            		{d.title} 
          		</a> by {d.author}
        		</h3>
        		<p>
          		👍 {d.points} 
        		</p>
        		<p>Tagged: {d._tags.join(', ')}</p>
        		<hr />
      		</div>
    		)
  		})

		return (
			<div className="App">
      			<header className="App-header">
        			<h1>{this.state.name}'s News Feed</h1>
        			<input 
        				type="text"
        				value={this.state.name}
        				onChange={(e) => this.setState({ name: e.target.value})}
        		 	/>
      			</header>
      			<main>
        			<div className="search">
          			<h2>Search:</h2>
          			<form onSubmit={this.search}>
            			<input type="text" 
              			value={this.state.tempQuery}
              			onChange={e => this.setState({ tempQuery: e.target.value })}
              			placeholder="new query" 
            			/>
            			<button type="submit">
              			<span role="img" aria-label="img">Search 🔍</span>
            			</button>
          			</form>
        			</div>
        			<hr />
        			<div className="results">
          			<h2>Results for {this.state.query}:</h2>
          			{results}
        			</div>
				</main>
			</div>
		)
	}
}

export default AppClass