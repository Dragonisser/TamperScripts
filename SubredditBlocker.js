// ==UserScript==
// @name           SubredditBlocker
// @description    Hide selected subreddits
// @author         dragonisser
// @include        http*://*.reddit.com/*
// @version        1.0
// @require http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

// ------------------EDIT HERE-----------------------
// Names of subreddits to be blocked.
// Add/remove any number of values.

//var $ = window.jQuery;

var subredditsToHide = [
  "/r/TwoXChromosomes/",
  "/r/politics/",
  "/r/VALORANT/",
  "/r/de/",
  "/r/ich_iel/",
  "/r/MakeMeSuffer/",
  "/r/de_IAmA/",
  "/r/600euro/",
  "/r/formula1/",
  "/r/wasletztepreis/",
  "/r/Finanzen/",
  "/r/berlin/",
  "/r/GeschichtsMaimais/",
  "/r/GermanRap/",
  "/r/germany/",
  "/r/FragReddit/",
  "/r/OkBrudiMongo/",
];

// --------------------------------------------------

window.addEventListener('load', function() {
	const interval = setInterval(function() {
		for (let j = 0; j < subredditsToHide.length; j++) {
			let elements = document.querySelectorAll("a[href='" + subredditsToHide[j] +"']");
			for (let i = 0; i < elements.length; i++) {
				let el = elements[i];
                let parentEl = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                if (parentEl.tagName === 'DIV' && parentEl.classList.contains("Post")) {
                    parentEl.style.display = 'none';
                }
			}
		}
	}, 1000);
}, false);


