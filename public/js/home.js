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

$(".footer-image-search").click(clickedSearch);

function clickedSearch(e) {
    // e.preventDefault();
    console.log("SEARCH CLASSES");
}

$(".footer-image-classes").click(clickedClasses);

function clickedClasses(e) {
    // e.preventDefault();
    console.log("MY CLASSES");
}

$(".footer-image-profile").click(clickedProfile);

function clickedProfile(e) {
    // e.preventDefault();
    console.log("MY PROFILE");
}

$(".class").click(clickedClass);

function clickedClass(e) {
    // e.preventDefault();
    console.log("CLICKED CLASS");
}