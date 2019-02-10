import React from "react";
import Particles from "react-particles-js";
const particleOptions = {
	particles: {
		number: {
			value: 160,
			density: {
				enable: true,
				value_area: 1000
			}
		},
		color: {
			value: "#ffffff"
		},
		shape: {
			type: "circle"
		},
		size: {
			value: 3,
			random: true
		}
	},
	// polygon: {
	// 	enable: true,
	// 	scale: 0.5,
	// 	type: "inline",
	// 	move: {
	// 		radius: 10
	// 	},
	// 	url: svg,
	// 	inline: {
	// 		arrangement: "equidistant"
	// 	},
	// 	draw: {
	// 		enable: true,
	// 		stroke: {
	// 			color: "rgba(255, 255, 255, .2)"
	// 		}
	// 	}
	// },
	interactivity: {
		events: {
			onhover: {
				enable: true,
				mode: "grab"
			}
		},
		detect_on: "window",
		modes: {
			repulse: {
				distance: 50,
				duration: 0.1
			}
		}
	}
};

export default () => (
	<div
		className="background"
		style={{
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			zIndex: -2
		}}
	>
		<Particles params={particleOptions} />
	</div>
);
