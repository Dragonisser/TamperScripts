// ==UserScript==
// @name         Remove dumb new video
// @namespace    http://tampermonkey.net/
// @version      2024-06-23
// @description  Removes those "new video" on the right side of a youtube video
// @author       Dragonisser
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const viewCountLimit = 5000;

    function loadOwnCode() {

        setTimeout(function () {

            console.log('%c[RemoveDumbNewVideo] Checking List', 'color: #bada55')

            let newVideos = document.querySelectorAll('[aria-label="New"]');

            if (newVideos.length) {
                newVideos.forEach(element => {
                    let parentElem = element.parentNode.parentNode;
                    if (parentElem.classList.contains('secondary-metadata')) {
                        let viewCounterElem = parentElem.querySelector('.inline-metadata-item');
                        let viewCount = viewCounterElem.innerHTML.split(' ')[0];

                        let viewCountNumber = 999999999;
                        if (!viewCount.includes('No views')) {
                            if (viewCount.endsWith('K') || viewCount.endsWith('k')) {
                                viewCountNumber = parseFloat(viewCount) * 1000;
                            } else if (viewCount.endsWith('M') || viewCount.endsWith('m')) {
                                viewCountNumber = parseFloat(viewCount) * 1000000;
                            } else {
                                viewCountNumber = parseFloat(viewCount);
                            }
                        }

                        if (isNaN(viewCountNumber)) {
                            return;
                        }

                        if (viewCount.includes('No views') || viewCountNumber < viewCountLimit) {
                            let rootElem = parentElem.parentNode.parentNode.parentNode.parentNode.parentNode
                            if (rootElem.tagname = 'YTD-COMPACT-VIDEO-RENDERER') {
                                console.log('%c[RemoveDumbNewVideo] Removing video ' + parentElem.parentNode.href, 'color: #bada55');
                                console.log(rootElem);

                                rootElem.style.setProperty('opacity', '1')
                                rootElem.style.setProperty('-webkit-transition', 'opacity 1s')
                                rootElem.style.setProperty('-moz-transition', 'opacity 1s')
                                rootElem.style.setProperty('transition', 'opacity 1s')

                                rootElem.style.setProperty('opacity', '0')
                                setTimeout(function () {
                                    rootElem.remove();
                                }, 1000);
                            }
                        }
                    }
                })
            }
        }, 2000);
    }

    var body = document.getElementsByTagName('body')[0];
    body.addEventListener("yt-navigate-finish", function (event) {
        console.log('%c Page changed', 'color: #bada55');
        loadOwnCode();
    });
})();
