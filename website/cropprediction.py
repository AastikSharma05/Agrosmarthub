from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import tensorflow as tf
from PIL import Image
import numpy as np


df = pd.read_csv('Crop_recommendation.csv') 
X = df.drop('label', axis=1)  
y = df['label'] 

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

logistic = LogisticRegression()
svm = SVC(probability=True)
random_forest = RandomForestClassifier()
knn = KNeighborsClassifier()

ensemble_model = VotingClassifier(estimators=[
    ('logistic', logistic),
    ('svm', svm),
    ('random_forest', random_forest),
    ('knn', knn)
], voting='soft')  
ensemble_model.fit(X_train, y_train)

app = Flask(__name__)

@app.route('/templates/CropPrediction.html')
def crop_prediction():
    return render_template('CropPrediction.html')

@app.route('/templates/PestDetection.html')
def pest_detection():
    return render_template('PestDetection.html')

@app.route('/templates/DashBoard.html')
def dashboard():
    return render_template('Dashboard.html')

@app.route('/templates/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/templates/transaction.html')
def transaction():
    return render_template('transaction.html')

@app.route('/templates/airquality.html')
def airquality():
    return render_template('airquality.html')

@app.route('/templates/forecast.html')
def forecast():
    return render_template('forecast.html')

@app.route('/css/<path:path>')
def serve_css(path):
    return send_from_directory('css', path)
@app.route('/style.css')
def serve_style_css():
    return send_from_directory('.', 'style.css')

@app.route('/js/<path:path>')
def serve_js(path):
    return send_from_directory('js', path)

@app.route('/images/<path:path>')
def serve_images(path):
    return send_from_directory('images', path)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/templates/index.html')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    features = request.json
    prediction = ensemble_model.predict([list(features.values())])  # Change to list(features.values())
    return jsonify({"prediction": prediction[0]})


if __name__ == '__main__':
    app.run(debug=True,port = 5500)
