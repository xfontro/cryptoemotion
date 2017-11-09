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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

function getCryptoData(telegramInput, cryptoSymbol, res) {
	return axios.get('http://35.177.69.211:3000/api/list/')
		.then(response => {
			var cryptoList = response.data.list_cryptos;
			var responseFormatted;
			for (var i = 0; i < cryptoList.length; i++) {
				if (cryptoList[i].symbol == cryptoSymbol) {
					responseFormatted = formatResponse(cryptoList[i]);
					break;
				}
			}
			sendTelegramResponse(telegramInput, responseFormatted, res);
		})
		.catch(err => {
			console.log('Error :', err)
			res.end('Error :' + err)
		});
}

function formatResponse(responseUnformatted) {
	var responseFormatted;
	var cryptoDetail = responseUnformatted;

	responseFormatted = EMOJI_GRAPH + " " + capitalizeFirstLetter(cryptoDetail.name) + " (" + cryptoDetail.symbol.toUpperCase() + ")\n\n";
	responseFormatted += EMOJI_JOY + " Joy: " + cryptoDetail.joy + "\n";
	responseFormatted += EMOJI_ANGER + " Anger: " + cryptoDetail.anger + "\n";
	responseFormatted += EMOJI_DISGUST + " Disgust: " + cryptoDetail.disgust + "\n";
	responseFormatted += EMOJI_SADNESS + " Sadness: " + cryptoDetail.sadness + "\n";
	responseFormatted += EMOJI_FEAR + " Fear: " + cryptoDetail.fear + "\n\n";

	if (cryptoDetail.sentiment_score >= 0) {
		responseFormatted += EMOJI_POSITIVE;
	} else {
		responseFormatted += EMOJI_NEGATIVE;
	}

	responseFormatted += " Sentiment score: " + cryptoDetail.sentiment_score;

	return responseFormatted;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
		getCryptoData(telegramInput, telegramMessage, res);
	} else {
		return res.end();
	}
});

app.listen(3000, function() {
	console.log('Telegram app listening on port 3000!');
});