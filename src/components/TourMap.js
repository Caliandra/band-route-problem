import React from 'react';

import './TourMap.css';

class TourMap extends React.Component {
  
  componentDidMount() {
  	const {canvas} = this.refs
		var context = canvas.getContext('2d')
		canvas.width = 900
		canvas.height = 900
		canvas.style.width = canvas.width / 2 + 'px'
		canvas.style.height = canvas.height / 2 + 'px'
  }

  componentDidUpdate(nextProps) {
  	if(this.props.nodes !== nextProps.nodes) {
			this.drawWithLines()
  	}
  }

  drawWithLines() {
  	const {canvas} = this.refs
  	const {nodes} = this.props
  	var context = canvas.getContext('2d')
		context.clearRect(0, 0, canvas.width, canvas.height)
		context.beginPath()
  	for (var i = 0; i < this.props.nodes.length; i++) {
  		context.lineTo(nodes[i].x,nodes[i].y)
  		context.stroke()
  	}
  	context.lineTo(nodes[0].x,nodes[0].y)
  	context.stroke()
  	for (var i = 0; i < this.props.nodes.length; i++) {
			context.beginPath()
			var radius = i === 0 ? 10 : 5
			context.arc(nodes[i].x, nodes[i].y, radius, 0, 2 * Math.PI, false)
			context.fillStyle = i === 0 ? '#efaeed' : '#47BBD1'
			context.fill()
			context.stroke()
		}
  }

  render() {
    return (
			<div className="tour-map">
				<canvas ref='canvas' />
			</div>
    )
  }
}

export default TourMap