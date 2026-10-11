from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import tensorflow as tf
from PIL import Image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = tf.keras.models.load_model('model.h5')

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return redirect(request.url)

    file = request.files['image']

    if file.filename == '':
        return redirect(request.url)

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join('static/uploads', filename)
        file.save(filepath)

        img = Image.open(filepath)
        img = img.resize((224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.keras.applications.efficientnet_v2.preprocess_input(img_array)
        img_array = tf.expand_dims(img_array, 0)


        predictions = model.predict(img_array)
        print(predictions)

        predicted_class = np.argmax(predictions[0])
        classes = ['ants', 'bees', 'beetle', 'catterpillar', 'earthworms', 'earwig', 'grasshopper', 'moth', 'slug', 'snail', 'wasp', 'weevil']
        result = classes[predicted_class]

        return render_template('result.html', result=result, result_image=filename)

    return redirect(request.url)

if __name__ == '__main__':
    app.run(debug=True)
