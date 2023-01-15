// ==UserScript==
// @name         Twitch Theatre Button
// @version      1.0
// @description  Adds a button to quickly get to Twitch Theater
// @author       Dragonisser
// @include      https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('.theather-button { color: var(--yt-spec-text-primary); background-color: var(--yt-spec-badge-chip-background); cursor: pointer; padding: 0 16px; height: 36px; font-size: 14px; line-height: 36px; border-radius: 18px; border: none; margin-right: 8px;}');

(function() {
    'use strict';

    function prependButton() {
        let videoUrl = window.location.href.split("=")[1];
        let theaterUrl = "https://twitchtheater.tv/v=" + videoUrl;
        let nav = document.querySelector('ytd-watch-metadata').querySelector('#menu').querySelector('div#top-level-buttons-computed');

        let button = document.createElement('button');
        button.setAttribute('id', 'button-twitch-theatre');
        button.append('Twitch Theatre');
        button.classList.add('theather-button');
        button.addEventListener('click', function() {
            window.open(theaterUrl);
        });

        if (nav) {
            let btn = document.querySelector('#button-twitch-theatre');
            if (!btn) {
                nav.prepend(button);
            }
        }
    };

    document.addEventListener('yt-navigate-finish', function(event) {
        setTimeout(prependButton, 500);
    });
})();
