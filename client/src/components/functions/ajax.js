import Axios from "axios";

const api = (method, url, data, token = true) => {
	if (data & token) {
		return new Promise((resolve, reject) => {
			Axios({
				method: method,
				url: url,
				data: data,
				headers: { Authorization: `${localStorage.getItem("token")}` }
			}).then(val => {
				resolve(val);
			}).catch(err=>{
				resolve(err);
			});
		});
	} else if (token) {
		return new Promise((resolve, reject) => {
			Axios({
				method: method,
				url: url,
				headers: { Authorization: `${localStorage.getItem("token")}` }
			}).then(val => {
				resolve(val);
			}).catch(err=>{
				resolve(err);
			});
		});
	} else {
		return new Promise((resolve, reject) => {
			Axios({
				method: method,
				url: url,
				data: data,
				headers: { Authorization: `${localStorage.getItem("token")}` }
			}).then(val => {
				resolve(val);
			}).catch(err=>{
				resolve(err);
			});
		});
    }
};

export { api };
