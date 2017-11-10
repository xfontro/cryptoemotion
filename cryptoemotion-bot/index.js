var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios');

const CRYPTOCOINS = ['Bitcoin', 'BTC', 'Ethereum', 'ETH', 'Litecoin', 'LTC', 'Neo', 'NEO', 'Elixir', 'ELIX', 'Walton', 'WTC', 'Request Network', 'REQ', 'Ark', 'ARK', 'OmiseGO', 'OMG', 'Ripple', 'XRP', 'Dash', 'DASH', 'NEM', 'XEM', 'Monero', 'XMR', 'Iota', 'MIOTA', 'Golem', 'GNT' ];

const EMOJI_GRAPH = '📊';
const EMOJI_JOY = '😁';
const EMOJI_ANGER = '😡';
const EMOJI_DISGUST = '🤢';
const EMOJI_SADNESS = '😭';
const EMOJI_FEAR = '😱';
const EMOJI_POSITIVE = '👍';
const EMOJI_NEUTRAL = '✋';
const EMOJI_NEGATIVE = '👎';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

function getCryptoData(telegramInput, crypto, res) {
	return axios.get('http://35.176.189.136:3000/api/list/')
		.then(response => {
			var cryptoList = response.data.list_cryptos;
			var responseFormatted;
			for (var i = 0; i < cryptoList.length; i++) {
				if (cryptoList[i].symbol == crypto || cryptoList[i].name == crypto) {
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
	responseFormatted += EMOJI_JOY + " Joy: " + cryptoDetail.joy.toFixed(2) + "\n";
	responseFormatted += EMOJI_ANGER + " Anger: " + cryptoDetail.anger.toFixed(2) + "\n";
	responseFormatted += EMOJI_DISGUST + " Disgust: " + cryptoDetail.disgust.toFixed(2) + "\n";
	responseFormatted += EMOJI_SADNESS + " Sadness: " + cryptoDetail.sadness.toFixed(2) + "\n";
	responseFormatted += EMOJI_FEAR + " Fear: " + cryptoDetail.fear.toFixed(2) + "\n\n";

	if (cryptoDetail.sentiment_score < -0.05) {
		responseFormatted += EMOJI_NEGATIVE;
	} else if (cryptoDetail.sentiment_score >= -0.05 && cryptoDetail.sentiment_score <= 0.05) {
		responseFormatted += EMOJI_NEUTRAL;
	} else {
		responseFormatted += EMOJI_POSITIVE;
	}

	responseFormatted += " Sentiment score: " + cryptoDetail.sentiment_score.toFixed(2);

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

function getCryptoList() {
	var cryptoList = "This is the list of all supported cryptocurrencies: \n\n";
	for (var i=0; i<CRYPTOCOINS.length; i+=2) {
		cryptoList += CRYPTOCOINS[i] + " (" + CRYPTOCOINS[i+1] + ")\n";
	}

	return cryptoList;
}

app.post('/new-message', function(req, res) {
	const telegramInput = req.body.message

	if (!telegramInput) {
		return res.end();
	}

	var telegramMessage = telegramInput.text.toLowerCase();
	if (CRYPTOCOINS.map(function(x) {return x.toLowerCase()}).includes(telegramMessage)) {
		getCryptoData(telegramInput, telegramMessage, res);
	} else if (telegramMessage == 'list') {
		var cryptoList = getCryptoList();
		sendTelegramResponse(telegramInput, cryptoList, res);
	} else {
		var defaultMessage = "Hi! I'm here to feed you with all the emotion-related data for your favorite cryptocurrency. Type the name (or symbol) of the desired coin, or 'list' to get a comprehensive list of all the supported ones.\n\nLearn more on http://cryptoemotion.herokuapp.com";
		sendTelegramResponse(telegramInput, defaultMessage, res);
	}
});

app.listen(3000, function() {
	console.log('Telegram app listening on port 3000!');
});