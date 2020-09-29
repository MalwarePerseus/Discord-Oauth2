const http = require('http');
const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');
const {id, secret} = require('./config.json')

const port = 3000;

http.createServer((req, res) => {
	let responseCode = 404;
	let content = 'Page Not Found';

	const urlobject = url.parse(req.url, true);

	if (urlObj.query.code) {
		const accessCode = urlobject.query.code;
		const data = {
			client_id: id,
			client_secret: secret,
			grant_type: 'authorization_code',
			redirect_uri: 'http://localhost:3000',
			code: accessCode,
			scope: 'identity',
		};

		fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body: new URLSearchParams(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then(dRes => dRes.json()).then(info => {
				console.log(info);
				return info;
			})
			.then(info => fetch('https://discordapp.com/api/users/@me', {
				headers: {
					authorization: `${info.token_type} ${info.access_token}`,
				},
			}))
			.then(userRes => userRes.json())
			.then(userinfo => {
				console.log(userinfo);
				res.bo
			});
	}

	if (urlObj.pathname === '/') {
		responseCode = 200;
		content = fs.readFileSync('./index.html');
	}

	res.write(content);
	res.end();
})
	.listen(port);