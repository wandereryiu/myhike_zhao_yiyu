// Function to read the quote of the day from the Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function readQuote(day) {
    db.collection("quotes").doc(day)                                                         //name of the collection and documents should matach excatly with what you have in Firestore
        .onSnapshot(dayDoc => {                                                              //arrow notation
            console.log("current document data: " + dayDoc.data());                          //.data() returns data object
            document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

            //Here are other ways to access key-value data fields
            //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
            //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
            //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;

        }, (error) => {
            console.log("Error calling onSnapshot", error);
        });
}
readQuote("tuesday");        //calling the function

function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertNameFromFirestore();