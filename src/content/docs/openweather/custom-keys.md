---
title: OpenWeather Refined
description: Using custom keys in OpenWeather Refined
---

[GitHub Repository](https://github.com/penguin-teal/gnome-openweather/)

[GNOME Extensions Page](https://extensions.gnome.org/extension/6655/)

## Why Use Custom Keys

Weather data is gained by each individual computer pinging a server
(referred to as a "provider") and asking for the weather in a specific
location. These services often have a free tier, and that is what OpenWeather
Refined uses. Free tiers only allow for so many requests in a period of time,
meaning that if too many users use a single provider in a period of time
it may temporarily block requests for all users.

There are two solutions for this, the first is an "Adaptive" provider setting,
which is the default, that tries a random provider on start-up. If that
provider returns an error, the client will cycle through until one works.

However, if all providers get used up, which happened shortly after the
addition of a second provider ([which also happened to accompany a bug
](https://github.com/penguin-teal/gnome-openweather/issues/32)), then no
data can be fetched. The solution for this is to just add more providers.

To guarantee you can always use the provider you want, you can sign up for
your own API key for free with the directions below. This makes you subject
to your own rates, and you're never going to exceed 1 million requests per
month or 60 requests per second alone. Note that you can still choose which
provider you want without your own key, it'sw just possible it will hit the
rate limit and temporarily cease to work.

You could also do this if you
theoretically wanted to pay to get more data like longer forecasts (however
I would not recommend this, and the "Visual Crossing" provider gives 14
day forecasts for free).

## Signing Up For Custom Keys

Choose your favorite provider, they all give slightly different current
weather and forecasts:

### OpenWeatherMap (5 Day Forecasts)

1. [Create an account at OpenWeatherMap.org](https://home.openweathermap.org/users/sign_up)
2. Go to [My API Keys](https://home.openweathermap.org/api_keys)
3. Copy the "Key" (looks like 32 random letters and numbers)
4. Follow the directions under Setting Your API Key to use it

### WeatherAPI.com (3 Day Forecasts)

1. [Create an account at WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
2. Go to your [Dashboard](https://www.weatherapi.com/my/)
3. You should see "API Key" and a button that says "Copy"; copy it
4. Follow the directions under Setting Your API Key to use it

### Visual Crossing (15 Day Forecasts)

1. [Create an account at VisualCrossing.com](https://www.visualcrossing.com/sign-up)
2. Go to [Account](https://www.visualcrossing.com/account)
3. You should see "Key" and "Copy"; copy it
4. Follow the directions under Setting Your API Key to use it

## Setting Your API Key in OpenWeather Refined

1. Click the panel button (how you view your weather) to view the pop-up
2. Click the settings button on the very bottom right
3. Stay in "General"; scroll down to "Provider"
4. Set "Weather Provider" to the service you chose above
5. Enable "Use Custom API Key"
6. Paste your key into the text box labeled "Personal API Key"

