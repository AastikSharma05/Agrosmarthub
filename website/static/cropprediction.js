function predictCrop() {
    // Get input values
    var feature1 = parseFloat(document.getElementById("N").value);
    var feature2 = parseFloat(document.getElementById("P").value);
    var feature3 = parseFloat(document.getElementById("K").value);
    var feature4 = parseFloat(document.getElementById("temperature").value);
    var feature5 = parseFloat(document.getElementById("humidity").value);
    var feature6 = parseFloat(document.getElementById("ph").value);
    var feature7 = parseFloat(document.getElementById("rainfall").value);

    // Make a POST request to Flask backend
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            N: feature1,
            P: feature2,
            K: feature3,
            temperature: feature4,
            humidity: feature5,
            ph: feature6,
            rainfall: feature7,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the prediction result
        document.getElementById("predictionResult").innerHTML = "Predicted Crop: " + data.prediction;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.getElementById('next').addEventListener('click', function() {
    // Get the result element
    var resultElement = document.querySelector('.result');
    // Show the result element by changing its display property
    resultElement.style.display = 'block'; // Change to 'flex' if needed
  });