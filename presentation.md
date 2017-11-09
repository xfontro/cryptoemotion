# Motivation (Intro)
I bet many of you already heard about cryptocurrencies given the huge increase in interest over the past few years. We, at Badi, started playing around investing in some coins just this year and rapidly got hooked.

Since this is a very volatile market with high fluctuating prices, investing means taking some risks. And this is why we often see ourselves checking out growth charts and internet forums such as reddit among others. Knowing how other people actually perceive the coin helps you a lot when it comes to investing.

# What
We made a system that analyzes people's opinion and feels about a certain cryptocoin.
[needs more content]

# How
The project was developed following three main lines of work:

## Backend
*The core of the project where all the magic happens.*

Periodically reads new messages from subreddits for every cryptocoin. After that, we use a powerful natural language processing tool called **Watson** that analyzes every message and calculates the frequency of a series of emotions: *joy*, *anger*, *disgust*, *sadness* and *fear*, as well as an additional value called *sentiment score* that indicates the overall level of emotion.

Once all this data is processed and gathered, it is exposed to the clients through a REST API.

## Frontend
A website that offers in-depth details for every cryptocoin. Not only emotion-related, but also actual information about the coin like the real value in dollars, growth chart, bitcoin equivalent value among others.

## Telegram bot
A simple Telegram bot that provides you the very basic information about a certain cryptocoin: emotions and sentiment value.

# Further improvements
[needs more content]