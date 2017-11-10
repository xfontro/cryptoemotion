![CryptoEmotion](/screenshots/cryptoemotion-header.png)

# Motivation (Intro)
[Team presentation]

I bet many of you already heard about cryptocurrencies given the huge increase in interest over the past few years. We, at Badi, started playing around investing in some coins just this year and rapidly got hooked.

Since this is a very volatile market with high fluctuating prices, investing means taking some risks. And this is why we often see ourselves checking out growth charts and internet forums such as reddit among others. Knowing how other people actually perceive the coin helps you a lot when it comes to investing.

# What
We made a system that analyzes people's opinions and feels about a certain cryptocoin.
[needs more content]

# How
The project was developed following three main lines of work:

## Backend
*The core of the project where all the magic happens.*

Periodically reads new messages from subreddits for every cryptocoin. In order to process that information, we used a powerful natural language processing tool called  **Watson** that analyzes every message and calculates the frequency of a series of emotions: *joy*, *anger*, *disgust*, *sadness* and *fear*, as well as an additional value called *sentiment score* that indicates the overall level of emotion. We also used a python library called **nltk**, which give us a general *sentiment score*.

We started just using **nltk** library to have an initial approach, but then we also added **Watson** to improve our algorithm with the emotions. Finally we used a mix of the two approached to calculate a general sentiment score.

Once all this data is processed and gathered, it is exposed to the clients through a REST API.

## Frontend
A website that offers in-depth details for every cryptocoin. Not only emotion-related, but also actual information about the coin like the real value in dollars, growth chart, bitcoin equivalent value among others.

![Website](/screenshots/website.png)

## Telegram bot
A simple Telegram bot that provides you the very basic information about a certain cryptocoin: emotions and sentiment value.

It was made using NodeJS and hosted on [Now](https://zeit.co/now) ([https://zeit.co/now](https://zeit.co/now))

![Telegram Bot](/screenshots/telegram-bot.png)

# Further improvements
Sockets
Keyword rankings
Improve the algorithm
...
[needs more content]
