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


		<Particles params={particleOptions} />

);
