import React from 'react';

import './CustomSlider.css';

const CustomSlider = ( props ) => {
    return (
			<div>
				<p>{props.label}</p>
				<input className='custom-slider' type='range' min='1' max='500' onChange={props.changed} value={props.value} />
			</div>
    )
}

export default CustomSlider