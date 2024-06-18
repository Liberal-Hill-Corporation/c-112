Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach('#camera');

let classifier;
async function setup() {
    classifier = await ml5.imageClassifier('https://storage.googleapis.com/tm-model/1VKz6g3fS/model.json', modelLoaded);
}

function modelLoaded() {
    console.log('Model Loaded');
}

setup();

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("snapshot").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

function check(){
    var img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        var prediction = results[0].label;
        speak(prediction);
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Very Good"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Clap"){
            document.getElementById("update_emoji").innerHTML = "&#128079;";
        }
        if(results[0].label == "Greetings"){
            document.getElementById("update_emoji").innerHTML = "&#128591;";
        }
        
    }
}

function speak(prediction) {
    var synth = window.speechSynthesis;
    var speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


