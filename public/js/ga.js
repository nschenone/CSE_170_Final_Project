'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Javascript connected!");
}

$(".textbook-a").click(textbookAClickHandler);
$(".textbook-b").click(textbookBClickHandler);

function textbookAClickHandler(e) {
    // e.preventDefault();
    ga("send", "event", "textbook-a", "click");
}

function textbookBClickHandler(e) {
    // e.preventDefault();
    ga("send", "event", "textbook-b", "click");
}