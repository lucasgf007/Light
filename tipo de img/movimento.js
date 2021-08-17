$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
function sendToAPI(state){

        //criar um objeto capaz de enviar dados via requisição HTTP GET
        const http = new XMLHttpRequest();
        //prepara um GET passando a váriavel lux como ultimo paramentro do link
        http.open("GET", "https://api.thingspeak.com/update?api_key=1959VTH4L01SLPC4&field1="+state);
        //envia um GET
        http.send();
        //quando a requisição retornar ele chama o console e imprime o valor gerado
        http.onload = console.log(http.responseText+" "+state)
}
// ------------------------------------------------------------------------------------------------efeito da CAM

// variavei globais

var valuePredict;
var classPredict;

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    
 // the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/k26-V4daN/";
    
let model, webcam, labelContainer, maxPredictions;
    
                    // Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    
  // load the model and metadata
// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
// or files from your local hard drive
// Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    
                        // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
    
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }
    
async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}
    
// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
            valuePredict = prediction[i].probability.toFixed(2)
            classPredict = prediction[i].className
            efect(classPredict, valuePredict)
        }
}

function efect(type, value){
    if(type=="fechada" && parseFloat(value) > 0.5){
        document.querySelector(".luz").src = '../img/Loff.png'
        sendToAPI(Math.random() * (100 - 1) + 1)
    } else if(type=="aberta" && parseFloat(value) > 0.5){
        document.querySelector(".luz").src = '../img/Lon.png'
        sendToAPI(Math.random() * (100 - 1) + 1)
    } else{
        console.log("none")
    }
}

// ------------------------------------------------------------------------------------Microphone

        // more documentation available at
    // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

    // the link to your model provided by Teachable Machine export panel
    const url = "https://teachablemachine.withgoogle.com/models/XpEbf0icV/";

    async function createModel() {
        const checkpointURL = url + "model.json"; // model topology
        const metadataURL = url + "metadata.json"; // model metadata

        const recognizer = speechCommands.create(
            "BROWSER_FFT", // fourier transform type, not useful to change
            undefined, // speech commands vocabulary feature, not useful for your models
            checkpointURL,
            metadataURL);

        // check that model and metadata are loaded via HTTPS requests.
        await recognizer.ensureModelLoaded();

        return recognizer;
    }

    async function micro() {
        const recognizer = await createModel();
        const classLabels = recognizer.wordLabels(); // get class labels
        const labelContainer = document.getElementById("label-container");
        for (let i = 0; i < classLabels.length; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }

        // listen() takes two arguments:
        // 1. A callback function that is invoked anytime a word is recognized.
        // 2. A configuration object with adjustable fields
        recognizer.listen(result => {
            const scores = result.scores; // probability of prediction for each class
            // render the probability scores per class
            for (let i = 0; i < classLabels.length; i++) {
                const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
        });

        // Stop the recognition in 5 seconds.
        // setTimeout(() => recognizer.stopListening(), 5000);
    }



