// ==UserScript==
// @name         NooneWatchesInThisYear
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Get rid of annoying comments "Who wathces in x"
// @author       Dragonisser
// @include      https://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        const interval = setInterval(function() {
            loadOwnCode();
        }, 1000);
    }, false);

    function loadOwnCode() {

        let regex = new RegExp('[0-9]{4}(?![0-9])', 'i');
        let comments = document.querySelectorAll('yt-formatted-string[id="content-text"]');

        comments.forEach(function(el, i) {
           let match = regex.exec(el.innerHTML);
           if(match != null) {
               let parentEl = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
               parentEl.style.display = 'none';
           }
        });
    }
})();