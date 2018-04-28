$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDJUQLkh0SIhIvZexnTLZy2oYSC3mW2jm0",
        authDomain: "train-scheduler-c306a.firebaseapp.com",
        databaseURL: "https://train-scheduler-c306a.firebaseio.com",
        projectId: "train-scheduler-c306a",
        storageBucket: "train-scheduler-c306a.appspot.com",
        messagingSenderId: "538021850453"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //Global Variables
    var name = "";
    var destination = "";
    var start = 0;
    var frequency = 0;

    // Button for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // User Input
        var name = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var start = $("#start-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        // Push data to database
        database.ref().push({
            name: name,
            destination: destination,
            start: start,
            frequency: frequency,
        });

        // Alert
        alert("Train Successfully Added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#start-input").val("");
        $("#frequency-input").val("");
    });
    database.ref().on("child_added", function (childSnapshot) {

        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var start = childSnapshot.val().start;
        var frequency = childSnapshot.val().frequency;

        //Convert start time
        var startConverted = moment(start, "HH:mm:").subtract(1, "years");

        //Determine Current Time
        var currentTime = moment().format("HH:mm");
        console.log(currentTime);

        //Determine difference between current time and trainStart
        var timeDifference = moment().diff(moment(startConverted), "minutes");
        console.log(timeDifference);

        //Determine Remaining time
        var remainder = timeDifference % frequency;
        var nextTrainMin = frequency - remainder;

        // format next arrival time
        var nextTrainArrival = moment().add(nextTrainMin, "m").format("HH:mm");

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" +
            name + "</td><td>" +
            destination + "</td><td>" +
            frequency + "</td><td>" +
            nextTrainArrival + "</td><td>" +
            nextTrainMin + "</td></tr>"
        );

    });
});

