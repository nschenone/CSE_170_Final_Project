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

    updateButton();
}

$.ajaxSetup({
    async: false
});

var allClassesJSON;
var myClassesJSON;
var currClass;
var currProf;
$(".class-add-button").click(addClass);
$(".class-remove-button").click(removeClass);

function updateButton() {
    // Query all classes from db
    $.get("/queryAllClasses", function (data, status) {
        allClassesJSON = JSON.parse(data);
    });

    // Query my classes from db
    $.get("/queryMyClasses", function (data, status) {
        myClassesJSON = JSON.parse(data);
    });

    var infoText = $(".info-text").text().toString().trim().split("\n");
    currClass = infoText[0].trim();
    currProf = infoText[1].trim();

    var allClassData = allClassesJSON.classes;
    var allClassLen = allClassData.length;

    // Loop through all classes
    if (allClassLen > 0) {
        for (var i = 0; i < allClassLen; i++) {
            var className = allClassData[i]["name"];
            var classDescription = allClassData[i]["description"];
            var classProfessor = allClassData[i]["professor"];
            var classQuarter = allClassData[i]["quarter"];
            var newClass = allClassData[i];

            // Match - push new class
            if (className == currClass & classProfessor == currProf) {
                if (inMyClass() == false) {
                    // Update button
                    $(".header-text").html(`
                    <a href="/myClasses">
						<i class="fa fa-arrow-left back-button"></i>
					</a>
					<div class="centered-inner info-text">
						<h3>${className}</h3>
						<h5>${classProfessor}</h5>
					</div>
					<a href="#">
						<i class="fa fa-plus class-add-button"></i>
					</a>`)
                }

                else if (inMyClass() == true) {
                    $(".header-text").html(`
                    <a href="/myClasses">
						<i class="fa fa-arrow-left back-button"></i>
					</a>
					<div class="centered-inner info-text">
						<h3>${className}</h3>
						<h5>${classProfessor}</h5>
					</div>
					<a href="#">
						<i class="fa fa-minus class-remove-button"></i>
					</a>`)
                }
            }
        }
    }

    // Update click handlers
    $(".class-add-button").click(addClass);
    $(".class-remove-button").click(removeClass);
}

function inMyClass() {
    var out = false;
    var myClassLen = myClassesJSON.classes.length;

    // Loop through all classes
    if (myClassLen > 0) {
        for (var i = 0; i < myClassLen; i++) {
            var className = myClassesJSON.classes[i]["name"];
            var classDescription = myClassesJSON.classes[i]["description"];
            var classProfessor = myClassesJSON.classes[i]["professor"];
            var classQuarter = myClassesJSON.classes[i]["quarter"];

            // Class match
            if (className == currClass) {
                out = true;
                break;
            }
        }
    }

    return out;
}

function addClass(e) {
    e.preventDefault();

    // Update db
    $.post("/addClassDB", { "name": currClass, "professor": currProf }, function (data, status) { });

    // Update button
    updateButton();
}

function removeClass(e) {
    e.preventDefault();

    // Update db
    $.post("/removeClassDB", { "name": currClass, "professor": currProf }, function (data, status) { });

    // Update button
    updateButton();
}