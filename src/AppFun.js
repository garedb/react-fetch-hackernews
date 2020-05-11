// Stuff from modules
import React, { useEffect, useState } from 'react';
import axios from 'axios'

// Resources
import './App.css';

// Constants
const API_URL = 'http://hn.algolia.com/api/v1/search?query='
const DEFAULT_QUERY = 'react'
const DEFAULT_NAME = 'Gared'

function AppFun() {
  // State variables
  let [data, setData] = useState({ hits: [] })
  let [name, setName] = useState(DEFAULT_NAME)
  let [query, setQuery] = useState(DEFAULT_QUERY)
  let [tempQuery, setTempQuery] = useState('')

  // Effects
  useEffect(() => {
    console.log('PAGE HAS LOADED!')
  }, []) // Only runs on page load!

  useEffect(() => {
    console.log('QUERY HAS CHANGED', query)
    // // Fetch
    // fetch(API_URL + query)
    // .then(response => response.json())
    // .then(results => {
    //   console.log(results.hits)
    //   setData({ hits: results.hits})
    // })

    // Async/Await Axios Version
    const getData = async () => {
      let results = await axios(API_URL + query)
      console.log(results)
      setData({ hits: results.data.hits })
    }
    getData()

    // // Axios Version (Regular)
    // axios(API_URL + query)
    // .then(results => {
    //   console.log(results.data)
    //   setData({ hits: results.data.hits })
    // })
  }, [query]) // Run onload AND whenever query changes

  // Functions
  const search = (e) => {
    e.preventDefault()
    setQuery(tempQuery)
  }

  // Format results
  let results = data.hits.map((d, i) => {
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
        <h1>{name}'s News Feed</h1>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
      </header>
      <main>
        <div className="search">
          <h2>Search:</h2>
          <form onSubmit={search}>
            <input type="text" 
              value={tempQuery}
              onChange={e => setTempQuery(e.target.value)}
              placeholder="new query" 
            />
            <button type="submit">
              <span role="img" aria-label="img">Search 🔍</span>
            </button>
          </form>
        </div>
        <hr />
        <div className="results">
          <h2>Results for {query}:</h2>
          {results}
        </div>
      </main>
    </div>
  );
}

export default AppFun;
