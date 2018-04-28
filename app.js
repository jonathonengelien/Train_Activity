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
    var trainName = "";
    var trainDestination = "";
    var trainStart = 0;
    var trainFrequency = 0;

    // Button for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // User Input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainStart = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
        var trainFrequency = $("#frequency-input").val().trim();

        // Local Object
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            start: trainStart,
            frequency: trainFrequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        };

        // Push data to database
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.frequency);
    });

    // Function to Capture Next Train Time
    function nextTrain() {
        database.ref().child('train-scheduler').once('value', function (snapshot) {
            snapshot.forEach(function (child_Snapshot) {
                newTime = moment().format('X');
                database.ref('train-scheduler' + child_Snapshot.key).update({
                    trainTime: newTime,
                })
            })
        });
    };

    //Set the countdown for next train to run every minute
    setInterval(nextTrain, 60000);

    //Add train data to firebase
    database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {



        // // Add each train's data into the table
        // $("#train-table > tbody").append("<tr><td>" +
        //     trainName + "</td><td>" +
        //     trainDestination + "</td><td>" +
        //     trainFrequency + "</td><td>" +
        //     nextArrival + "</td><td>" +
        //     minutesAway + "</td></tr>"
        //);

    });

});