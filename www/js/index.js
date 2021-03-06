/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //app.loadBooks();
		
		var btn = document.getElementById("pressMe");
		btn.addEventListener("click", getLoc, false);
    },
    loadBooks: function() {
        var request = new  XMLHttpRequest();
        request.open("GET", "https://dl.dropboxusercontent.com/u/887989/MAD9135/2014-09-11/index.html", true);
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200 || request.state === 0) {
                    console.log("response: " + request.responseText);
                    var books = JSON.parse(request.responseText);
                    for (var i = 0; i < books.length; i++) {
                        console.log(books[i].Title);
                    }    
                }    
            }    
        };
        request.send();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getLoc() {
	navigator.geolocation.getCurrentPosition(success, error, options)
}

var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

function success(position) {
	var crd = position.coords;

	console.log('Latitude : ' + crd.latitude);
	console.log('Longitude: ' + crd.longitude);
  
	document.getElementById("displayLoc").innerHTML += ('Latitude : ' + crd.latitude);
	document.getElementById("displayLoc").innerHTML += ('Longitude: ' + crd.longitude);
  
	var myRequest = new  XMLHttpRequest();
	myRequest.open("GET", "http://open.mapquestapi.com/geocoding/v1/reverse?key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
position.coords.latitude + "," + position.coords.longitude, true);
	myRequest.onreadystatechage = function() {
		if (myRequest.readyState === 4) {
                if (myRequest.status === 200 || myRequest.state === 0) {
                    console.log("response: " + myRequest.responseText);
                }    
            }
	};
	myRequest.send();
};

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
};

app.initialize();