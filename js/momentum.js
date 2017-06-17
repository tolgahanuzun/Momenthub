"use strict";

window.momentum = window.momentum || {};

// Core - time, image
var salutation = "morning";
momentum.Core = function() {
  this.timeStr = "";
  this.quoteStr = "";
  this.weatherStr = "";
  this.ampm = "AM";
  this.salutation = "morning";
  this.location = "";
  
  this.timeEl = $("#time");
  this.quoteEl = $("#quote-text");
  this.weatherEl = $("#weather");
  this.greetingEl = $("#greetings");
  this.ampmEl = $("#ampm");
  this.city = $("#location");
  this.lat;
  this.lon;
  
  // weather controller
  this.weatherCtrl = new momentum.WeatherCtrl();
  
  
};

momentum.Core.prototype = {
	// `setTime` method
	// This method should calculate the current time and save it to timeStr in the form HH:MM, like: 12:01 or 21:34.
	// 
	// hint. check out the `Date` object! Use `getHours` and `getMinutes`.
  setTime: function() {
		// YOUR CODE HERE
		var date = new Date();
		var hours = date.getHours();
		if(hours>12){
			salutation = "afternoon";
		}
		if(hours>18){
			salutation = "evening";
		}
		if(hours<6 && hours>0){
			salutation = "night";
		}
		if(hours > 11 && hours < 24){
			this.ampm = "PM";
		}
		if(hours > 12){
			hours -= 12;
		}
		var mins = date.getMinutes();
		if(mins < 10){
			var txt = '0' + mins;
			mins = txt; 
		}
		var ret = '';
		ret = ret + hours + ':' + mins;
		this.timeStr = ret;
  },
	// `setWeather` method
	// This method should set the `weatherStr` property of the momentum core. This method will be used as the callback for weatherCtrl's `fetchWeather` function.
	// 
	// hint. figure out what kind of response the weatherData is going to be, and see how you might be able to access the quote of the day from that.
  setWeather: function(weatherData) {
		// YOUR CODE HERE
		this.weatherStr = Math.floor(weatherData.main.temp - 273.15);
		this.location = weatherData.name;
		this.render();
  },
	// `updateTime` method
	// This function should call setTime() so that this.timeStr is updated.
  updateTime: function() {
		// YOUR CODE HERE
		this.setTime();
  },
	// `updateWeather` method
	// This function should call weatherCtrl.fetchWeather and pass in this.setWeather as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
  updateWeather: function() {
	// YOUR CODE HERE
	this.weatherCtrl.fetchWeather(this.lat, this.lon, this.setWeather.bind(this));
  },

	// `start` method
	// This method will call some of the `update...` methods. This function will be called when the page has finished loading, so that Momentum can start off with the more up-to-date data.
	start: function() {
		// get location
		if (!navigator.geolocation){
		  throw "Geolocation not supported!";
		}

		function error() {
		  throw "Error occured!";
		};

		navigator.geolocation.getCurrentPosition(function(position) {
		  console.log("EXECUTING");
		  this.lat = position.coords.latitude;
		  this.lon = position.coords.longitude;
		  console.log(this.lat, this.lon);
		  this.updateWeather();
		}.bind(this), error);
		this.setTime();
		
		this.render();
	},

	 render: function() {
		var name = "Tolgahan Üzün"
		chrome.storage.sync.get('surname',function(val){
		name = val['surname'].split(';').reverse()[1];

		$("#greetings").text("Good " + salutation +"\n" +name);
	})

		this.timeEl.text(this.timeStr);
		this.ampmEl.text(this.ampm);
		this.weatherEl.text(this.weatherStr);
		this.quoteEl.text(this.quoteStr);
		this.city.text(this.location);
  
	}
};
