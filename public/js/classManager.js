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


var currClass;
$(".class-add-button").click(addClass);
$(".class-remove-button").click(removeClass);



function updateButton() {
    currClass = $(".header-text").text().trim();
    console.log("UPDATE");
    // console.log(currClass, inMyClass(currClass));

    $.getJSON('../data/all_classes.json', function (allData) {
        var allClassData = allData.classes;
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
                if (className == currClass) {
                    if (inMyClass(currClass) == true) {
                        // Update button

                        $(".header-text").html(`${className}
                        <a
                        href="#">
                        <button type="submit" name="class-button" class="class-remove-button">
                            <img src="../images/minus.png" style="padding-right:30px">
                        </button>
                        </a>`)

                        // Update click handler
                        $(".class-remove-button").click(removeClass);
                    }

                    else if (inMyClass(currClass) == false) {
                        $(".header-text").html(`${className}
                        <a
                        href="#">
                        <button type="submit" name="class-button" class="class-add-button">
                            <img src="../images/plus.png" style="padding-right:30px">
                        </button>
                        </a>`)

                        // $(".header-text").html(`${className}
                        // <a
                        // href="../../addClass?name=${className}&description=${classDescription}&professor=${classProfessor}&quarter=${classQuarter}">
                        // <button type="submit" name="class-button" class="class-add-button">
                        //     <img src="../images/plus.png" style="padding-right:30px">
                        // </button>
                        // </a>`)

                        $(".class-add-button").click(addClass);
                    }
                }
            }
        }
    });
}

function addClass(e) {
    e.preventDefault();

    console.log("ADD CLASS");

    // Update data
    $.getJSON('../data/all_classes.json', function (allData) {
        var allClassData = allData;
        var allClassLen = allClassData.classes.length;

        // Loop through all classes
        if (allClassLen > 0) {
            for (var i = 0; i < allClassLen; i++) {
                // Get class info
                var className = allClassData.classes[i]["name"];
                var classDescription = allClassData.classes[i]["description"];
                var classProfessor = allClassData.classes[i]["professor"];
                var classQuarter = allClassData.classes[i]["quarter"];
                var newClass = allClassData.classes[i];

                // Match - push new class
                if (className == currClass) {
                    var myClassData;
                    var localJSON = JSON.parse(localStorage.getItem('myClasses'));
                    $.getJSON('../data/my_classes.json', function (myData) {
                        if (localJSON == null) {
                            // Load from JSON if no cache
                            myClassData = myData;
                        } else {
                            // Load from cache
                            myClassData = localJSON;
                        }

                        // Add new class
                        myClassData.classes.push(newClass);
                        var newJSON = JSON.stringify(myClassData);
                        console.log(newJSON);
                        // Update cache
                        localStorage.setItem('myClasses', newJSON);
                    });
                }
            }
        }
    });

    // Update button
    updateButton();
}

// function removeClass(e) {
//     // e.preventDefault();

//     console.log("REMOVE CLASS");

//     // Update data
//     $.getJSON('../data/all_classes.json', function (allData) {
//         var allClassData = allData.classes;
//         var allClassLen = allClassData.length;

//         // Loop through all classes
//         if (allClassLen > 0) {
//             // Get class info
//             for (var i = 0; i < allClassLen; i++) {
//                 var className = allClassData[i]["name"];
//                 var classDescription = allClassData[i]["description"];
//                 var classProfessor = allClassData[i]["professor"];
//                 var classQuarter = allClassData[i]["quarter"];
//                 var newClass = allClassData[i];

//                 // Match - remove class
//                 if (className == currClass) {
//                     var myClassData;
//                     var localJSON = JSON.parse(localStorage.getItem('myClasses'));
//                     $.getJSON('../data/my_classes.json', function (myData) {
//                         if (localJSON == null) {
//                             // Load from JSON if no cache
//                             myClassData = myData;
//                         } else {
//                             // Load from cache
//                             myClassData = localJSON;
//                         }

//                         console.log("BEFORE DELETE", myClassData.classes);
//                         console.log("AFTER DELETE", myClassData.classes);

//                         var newJSON = JSON.stringify(myClassData);
//                         localStorage.setItem('myClasses', newJSON);

//                     });
//                 }
//             }
//         }
//     });

//     // Update button
//     updateButton();
// }

function removeClass(e) {
    // e.preventDefault();

    console.log("REMOVE CLASS");

    // Update data
    var myClassData;
    var localJSON = JSON.parse(localStorage.getItem('myClasses'));
    $.getJSON('../data/my_classes.json', function (myData) {
        if (localJSON == null) {
            // Load from JSON if no cache
            myClassData = myData;
            console.log("LOAD FILE");
        } else {
            // Load from cache
            myClassData = localJSON;
            console.log("LOAD CACHE");
        }

        console.log(JSON.stringify(myClassData));

        var myClassLen = myClassData.classes.length;

        // Loop through all classes
        if (myClassLen > 0) {
            // Get class info
            for (var i = 0; i < myClassLen; i++) {
                var className = myClassData.classes[i]["name"];
                var classDescription = myClassData.classes[i]["description"];
                var classProfessor = myClassData.classes[i]["professor"];
                var classQuarter = myClassData.classes[i]["quarter"];
                var newClass = myClassData.classes[i];

                // Match - remove class
                if (className == currClass) {
                    console.log("BEFORE DELETE", myClassData);

                    // delete myClassData.classes[i];
                    myClassData.classes.splice(i, 1);
                    console.log("AFTER DELETE", myClassData);

                    var newJSON = JSON.stringify(myClassData);
                    console.log(newJSON);
                    localStorage.setItem('myClasses', newJSON);
                }
            }

            // If empty, remove myClasses cache
            if (myClassData.classes <= 0) {
                console.log("CLEARED CACHE");
                localStorage.removeItem('myClasses');
            }

        }
    });

    // Update button
    updateButton();
}

function inMyClass(currClass) {
    var classData;
    var localJSON = JSON.parse(localStorage.getItem('myClasses'));
    var out = false;

    $.getJSON('../data/my_classes.json', function (data) {
        if (localJSON == null || localJSON.classes == null) {
            classData = data;
        } else {
            classData = localJSON;
        }

        var classLen = classData.classes.length;

        // Loop through all classes
        if (classLen > 0) {
            for (var i = 0; i < classLen; i++) {
                var className = classData.classes[i]["name"];
                var classDescription = classData.classes[i]["description"];
                var classProfessor = classData.classes[i]["professor"];
                var classQuarter = classData.classes[i]["quarter"];

                if (className == currClass) {
                    out = true;
                    break;
                }
            }
        }
    });

    return out;
}