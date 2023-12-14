document.addEventListener('DOMContentLoaded', function() {
    var chatDisplay = document.getElementById('chat-display');
    var userInput = document.getElementById('user-input');
    var sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        var userMessage = userInput.value;
        displayMessage(userMessage, 'user');
        respondToMessage(userMessage);
        userInput.value = '';
    }

    function displayMessage(message, sender) {
        var messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender);
        messageElement.innerHTML = message;
        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
// Access the video element
const video = document.getElementById('video');

// Access the canvas element
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Access the capture button
const captureBtn = document.getElementById('captureBtn');

// Load the face detection model
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

// Function to start the video stream
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    error => console.error(error)
  );
}

// Event listener for the capture button
captureBtn.addEventListener('click', async () => {
  // Capture an image from the video stream
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Detect faces in the captured image
  const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceExpressions();

  // Log the face detection results
  console.log(detections);
});
    function respondToMessage(message) {
        // Customize the responses based on the user's message
        var response;
        if (message.includes('drone')) {
            response = "Drones are unmanned aerial vehicles used for various purposes such as aerial photography, surveillance, and delivery.";
        } else if (message.includes('application')) {
            response = "Drone technology is being used in agriculture, disaster management, filmmaking, and more.";
        } else if (message.includes('demonstration')) {
            response = "Unfortunately, I can't provide a real-time demonstration here. But you can find videos and tutorials online.";
        }
        else if(message.includes('KG ')){
            response ="less than 250g.";
        }
         else {
            response = "I'm sorry, I don't understand. Can you please rephrase your question?";
        }

        displayMessage(response, 'bot');
    }
});