// ==UserScript==
// @name         Twitter Switcher
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically switches to the "Following" Tab. Thank you twitter for yet another pointless change.
// @author       Dragonisser
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Dragonisser/TamperScripts/master/TwitterSwitcher.js
// @downloadURL  https://raw.githubusercontent.com/Dragonisser/TamperScripts/master/TwitterSwitcher.js
// ==/UserScript==

(function () {
    'use strict';

    function switchTab() {
        let tabs = document.querySelectorAll('a[role="tab"]');

        

        if (!tabs.length) {
            setTimeout(switchTab, 500);
            return;
        }

        tabs.forEach(tab => {
            let tabInfo = tab.querySelector('span');
            if (tabInfo && tabInfo.innerHTML.includes('Following')) {
                tab.click();

            }
        })
    }


    function appendObserver() {

        const targetNode = document.querySelector('main[role="main"]')

        if (!targetNode) {
            setTimeout(appendObserver, 500);
            return;
        }

        const config = { attributes: true, childList: true, subtree: true };

        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    if (mutation.target.parentElement && mutation.target.parentElement === targetNode) {
                        if (window.location.href === 'https://twitter.com/home') {
                            switchTab();
                        }
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(targetNode, config);
    }

    switchTab();
    appendObserver();

})();
