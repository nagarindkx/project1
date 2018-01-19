const functions = require('firebase-functions');
const allowOrigin = "https://" + functions.config().firebase.projectId + ".firebaseapp.com";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.setHeader('Access-Control-Allow-Origin', allowOrigin );
 response.send("Hello from Firebase!");
});

exports.myVision = functions.https.onRequest((request, response) => {
    // Imports the Google Cloud client library
     const vision = require('@google-cloud/vision');
     const client = new vision.ImageAnnotatorClient();
     const imageUri = request.body.url;
     client.labelDetection({image:{source:{ imageUri : imageUri} }}).then(function(results){
        
        const labels = results[0].labelAnnotations;
        var txt = "";
        labels.forEach(function(label){
            txt = txt + "</br>" + label.description;
            });
        response.setHeader('Access-Control-Allow-Origin', allowOrigin);
        response.send(txt);                
        }).catch((error)=>{txt=error});
}) ;
