var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

function getCryptoData(telegramInput, cryptoName, res) {
	return axios.post('nuestra api', { 
			cryptoName
		})
		.then(response => {
			sendTelegramResponse(telegramInput, response, res)
		})
		.catch(err => {
			console.log('Error :', err)
			res.end('Error :' + err)
		});
}

function sendTelegramResponse(telegramInput, responseToSend, res) {
	axios.post('https://api.telegram.org/bot458630248:AAEHN90c6xmABVy_xeucjJqegakTd-O5izc/sendMessage', {
		chat_id: telegramInput.chat.id,
		text: responseToSend
	})
	.then(response => {
		console.log('Message posted')
		res.end('ok')
	})
	.catch(err => {
		console.log('Error :', err)
		res.end('Error :' + err)
	});
}

app.post('/new-message', function(req, res) {
	const telegramInput = req.body.message

	if (!telegramInput) {
		return res.end();
	}

	var telegramMessage = telegramInput.text.toLowerCase();

	if (['btc', 'eth', 'ltc', 'neo'].includes(telegramMessage)) {
		//getCryptoData(telegramMessage, res);
		sendTelegramResponse(telegramInput, telegramMessage + ' response', res);
	} else {
		return res.end();
	}
});

app.listen(3000, function() {
	console.log('Telegram app listening on port 3000!');
});