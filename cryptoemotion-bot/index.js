var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios');

const CRYPTOCOINS = ['btc', 'eth', 'ltc', 'neo'];
const EMOJI_GRAPH = '📊';
const EMOJI_JOY = '😁';
const EMOJI_ANGER = '😡';
const EMOJI_DISGUST = '🤢';
const EMOJI_SADNESS = '😭';
const EMOJI_FEAR = '😱';
const EMOJI_POSITIVE = '👍';
const EMOJI_NEGATIVE = '👎';

const RESPONSE_BITCOIN = EMOJI_GRAPH + " Bitcoin (BTC)\n\n" + EMOJI_JOY + " Joy: 27%\n" + EMOJI_ANGER + " Anger: 41%\n" + EMOJI_DISGUST + " Disgust: 11%\n" + EMOJI_SADNESS + " Sadness: 38%\n" + EMOJI_FEAR + " Fear: 27%\n\n" + EMOJI_POSITIVE + " Sentiment score: +0.24";

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

	if (CRYPTOCOINS.includes(telegramMessage)) {
		//getCryptoData(telegramMessage, res);
		sendTelegramResponse(telegramInput, RESPONSE_BITCOIN, res);
	} else {
		return res.end();
	}
});

app.listen(3000, function() {
	console.log('Telegram app listening on port 3000!');
});