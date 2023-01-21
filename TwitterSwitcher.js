// ==UserScript==
// @name         Twitter Switcher
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically switches to the "Following" Tab.Thank you twitter for yet another pointless change.
// @author       Dragonisser
// @match        https://twitter.com/home
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function switchTab() {
        let tabs = document.querySelectorAll('a[role="tab"]');

        if (tabs.length) {
            tabs.forEach(tab => {
                let tabInfo = tab.querySelector('span');
                if (tabInfo && tabInfo.innerHTML.includes('Following')) {
                    tab.click();
                    return;
                }
            })
        } else {
            setTimeout(switchTab, 500);
        }
    }

    switchTab();
})();
