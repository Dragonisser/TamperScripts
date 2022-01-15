// ==UserScript==
// @name         Twitch Theather Button
// @version      1.0
// @description  Adds a button to quickly get to Twitch Theater
// @author       Dragonisser
// @include      https://www.youtube.com/*
// @grant        GM_addStyle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

GM_addStyle('.theather-button { background-color: transparent; color: white;  cursor: pointer; border: none;}');

(function() {
    'use strict';

    function prependButton() {
        let videoUrl = window.location.href.split("=")[1];
        let theaterUrl = "'https://twitchtheater.tv/v=" + videoUrl + "'";
        let nav = jQuery('#top-level-buttons-computed');
        let button = '<button class="theather-button" onclick="window.open(' + theaterUrl +')">Twitch Theather</button>';

        if (nav) {
            nav.prepend(button);
        }
    };

    document.addEventListener('yt-navigate-finish', function(event) {
        setTimeout(prependButton, 500);
    });
})();