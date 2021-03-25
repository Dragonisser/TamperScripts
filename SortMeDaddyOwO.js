// ==UserScript==
// @name         SortMeDaddyOwO
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bring back sort button on yt
// @author       Dragonisser
// @include        https://www.youtube.com/c/*
// @include        https://www.youtube.com/channel/*
// @include        https://www.youtube.com/user/*
// @grant        GM_addStyle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

GM_addStyle('.button-sort-popular { background-color: #181818; border: unset; font-weight: 500; font-family: Roboto; font-size 14px; padding: 10px}');
GM_addStyle('.button-sort-popular > a:visited { color: grey }');
GM_addStyle('.button-sort-popular > a { color: grey }');
GM_addStyle('.button-sort-popular > a:hover { color: white }');
GM_addStyle('.button-sort-oldest { background-color: #181818; border: unset; font-weight: 500; font-family: Roboto; font-size 14px; padding: 10px}');
GM_addStyle('.button-sort-oldest > a:visited { color: grey }');
GM_addStyle('.button-sort-oldest > a { color: grey }');
GM_addStyle('.button-sort-oldest > a:hover { color: white }');
GM_addStyle('.button-sort-newest { background-color: #181818; border: unset; font-weight: 500; font-family: Roboto; font-size 14px; padding: 10px}');
GM_addStyle('.button-sort-newest > a:visited { color: grey }');
GM_addStyle('.button-sort-newest > a { color: grey }');
GM_addStyle('.button-sort-newest > a:hover { color: white }');

(function() {

    window.addEventListener('load', function () {
        var nTimer = setInterval(function() {
            if (window.jQuery) {
                loadOwnCode();
                clearInterval(nTimer);
            }
        }, 100);
    });

	function loadOwnCode() {

		function addSortButton() {

			let channelUrl = "";

			if(location.href.includes("?")) {
				channelUrl = location.href.split("?")[0];
			} else {
				channelUrl = location.href;
			}

			let sortByPopularity = '<button class="button-sort-popular"><a style="text-decoration: none;" href="' + channelUrl + '?view=0&sort=p&flow=grid">Most Popular</a></button>';
			let sortByOldest = '<button class="button-sort-oldest"><a style="text-decoration: none;" href="' + channelUrl + '?view=0&sort=da&flow=grid">Oldest</a></button>';
			let sortByNewest = '<button class="button-sort-newest"><a style="text-decoration: none;" href="' + channelUrl + '?view=0&sort=dd&flow=grid">Newest</a></button>';

            let buttonPopular;
            let buttonOldest;
            let buttonNewest;

            let currentPage = location.href;
            let oldPage = currentPage;

            let sortMenu = jQuery('#sort-menu');
            if(sortMenu != null && sortMenu.find("yt-sort-filter-sub-menu-renderer").length == 0 && location.href.includes("videos")) {
                    console.log("adding one time")
                    sortMenu.append(sortByPopularity);
                    sortMenu.append(sortByOldest);
                    sortMenu.append(sortByNewest);
            }

            var nTimer2 = setInterval(function() {
                sortMenu = jQuery('#sort-menu');

                if(sortMenu != null && sortMenu.find("yt-sort-filter-sub-menu-renderer").length == 0 && sortMenu.find("button").length == 0 && location.href.includes("videos")) {
                    console.log("adding over and over");
                    sortMenu.append(sortByPopularity);
                    sortMenu.append(sortByOldest);
                    sortMenu.append(sortByNewest);
                }
            }, 1000);

            var nTimer3 = setInterval(function() {

                buttonPopular = jQuery('.button-sort-popular');
                buttonOldest = jQuery('.button-sort-oldest');
                buttonNewest = jQuery('.button-sort-newest');

                if (buttonPopular != undefined && buttonOldest != undefined && buttonNewest != undefined) {
                    if(sortMenu.find("yt-sort-filter-sub-menu-renderer").length > 0 || !location.href.includes("videos")) {
                        buttonPopular.hide();
                        buttonOldest.hide();
                        buttonNewest.hide();
                    } else {
                        buttonPopular.show();
                        buttonOldest.show();
                        buttonNewest.show();
                    }
                }
            }, 50);
        }

		addSortButton();
	}
})();