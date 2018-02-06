import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import CustomSlider from './components/CustomSlider'
import TourMap from './components/TourMap'
import {points40, points200, points500} from './data.js'

class App extends Component {
  state = {
  	nodes: []
  }
  componentDidMount() {
  	this.size = 900
  	this.padding = 20
  }
  
  generateNodes = (evt) => {
		this.nodes = []
		const {size, padding} = this
		for (var i = 0; i < evt.target.value; i++) {
			var xPos = padding + Math.floor(Math.random() * (size - 2 * padding))
			var yPos = padding + Math.floor(Math.random() * (size - 2 * padding))
			this.nodes.push({x: xPos, y: yPos})
		}
		this.setState({nodes: this.nodes})

  }
  
  setNodes = (nodes) => {
  	this.setState({nodes: nodes})
  }

  calcNNPath = () => {
  	const {nodes} = this.state
  	var path = [nodes[0]]
  	var availableNodes = nodes.slice(1)
  	var totalDistance = 0
  	for (var i = 0; i < nodes.length; i++) {
  		var smallestDistance = Math.sqrt((this.size * this.size) + (this.size * this.size))
  		var nearest = {}
  		var nearestIndex = null
  		
  		for (var j = 0; j < availableNodes.length; j++) {
  			var newDistance = this.getDistance(path[i], availableNodes[j])
  			if (newDistance < smallestDistance) {
  				smallestDistance = newDistance
  				nearest = availableNodes[j]
  				nearestIndex = j
  			}
  		}
  		
  		if (availableNodes.length > 0) {
  			path.push(availableNodes[nearestIndex])
  			totalDistance += smallestDistance
  			availableNodes.splice(nearestIndex, 1)
  		} else {
  			totalDistance += this.getDistance(path[path.length-1], path[0])
  		}
  	}
  	this.setState({nodes: path, distance: Math.floor(totalDistance) })
  }

  getDistance = (a,b) => {
  	return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
  }

  render() {
  	const {nodes} = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Cool Band Tour</h1>
        </header>

        <div className='config'>
					<CustomSlider value={nodes.length} 
					changed={this.generateNodes} label={`Number of shows: ${nodes.length}`}/>
        	<p>Test Data</p>
        	<button onClick={() => this.setNodes(points40)}>40</button>
        	<button onClick={() => this.setNodes(points200)}>200</button>
        	<button onClick={() => this.setNodes(points500)}>500</button>
        	<p>Pick your method</p>
        	<button onClick={this.calcNNPath}>Nearest Neighbor</button>
        	<button>Brute Force</button>
        </div>
        
        <div className='map-view'>
        	<TourMap ref={(ref)=>this.map = ref} nodes={nodes}/>
        	<p>Distance: {this.state.distance}</p>
        </div>
      
      </div>
    )
  }
}

export default App
