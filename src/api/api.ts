import axios from "axios";

let base_url = "https://rent-it-api.onrender.com/api/v1";

interface Ilogin {
	email: string;
	password: string;
}
const login = async (e: Ilogin) => {
	let con_url = base_url + "/users/login";
	let json_data = JSON.stringify(e);
	try {
		let resp = await fetch(con_url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: json_data,
		});
		return resp.json();
	} catch (err) {
		console.log(err);
		return err;
	}
};

export { login };
