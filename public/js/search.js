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

    // Query all classes from db
    $.get("/queryAllClasses", function (data, status) {
        allClassesJSON = JSON.parse(data);
    });

    // Query my classes from db
    $.get("/queryMyClasses", function (data, status) {
        myClassesJSON = JSON.parse(data);
    });
}

var allClassesJSON;
var myClassesJSON;
var input = document.getElementById('search-box');

$(".class-search").keydown(search);

function search(e) {
    var query = input.value.toUpperCase();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // Look for enter key
    // if (keycode == '13') {
    // Get json data
    if (keycode == '8' || keycode == '46') {
        input.value = '';
        $(".search-container").text("")
    }

    else if (query.length > 0) {
        var classLen = allClassesJSON["classes"].length;

        // Loop through all classes
        $(".search-container").text("");
        var found = false;
        for (var i = 0; i < classLen; i++) {
            var className = allClassesJSON["classes"][i]["name"];
            var classDescription = allClassesJSON["classes"][i]["description"];
            var classProfessor = allClassesJSON["classes"][i]["professor"];
            var classQuarter = allClassesJSON["classes"][i]["quarter"];

            // If query contained in className
            if (className.includes(query)) {
                found = true;

                // Append class button HTML to search-container
                var newClassButton = `<a href="../class/${className}?description=${classDescription}&professor=${classProfessor}&quarter=${classQuarter}">
                <button type="submit" name="class-button" class="class">

                    <div class="class-name">
                        ${className}
                    </div>

                    <div class="class-description">
                        ${classDescription}
                    </div>

                    <div class="class-professor">
						${classProfessor}
					</div>

                    <div class="class-quarter">
                        ${classQuarter} <img src="../images/arrow.png" class="arrow">
                    </div>
                </a>
                `

                $(".search-container").append(newClassButton);
            }
        }

        if (found == false) {
            $(".search-container").html("<p class=not-found-text>Not Found</p>");
        }

        if (keycode == '13') {
            input.value = '';
        }

    }
}

