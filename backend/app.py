#imports
from flask import Flask,request
from flask_cors import CORS
from keras.utils import pad_sequences
from keras.preprocessing.text import Tokenizer

import pytesseract
import cv2
import tensorflow as tf
import numpy as np
import pickle
import os

#pytesseract PATH
pytesseract.pytesseract.tesseract_cmd = "C:\Program Files\Tesseract-OCR\qtesseract.exe"

#import DL model
global model
model = tf.keras.models.load_model('model1.h5')

#import tokenizer model
with open('tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

app = Flask(__name__)

#Cross origin resource sharing
CORS(app)

#config for image upload folder
UPLOAD_FOLDER = 'images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/",methods=['POST'])
def predict():   
    #if image is uploaded
    if 'picture' in request.files:
        image = request.files['picture']
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
        img = cv2.imread('images/'+image.filename)
        text1=pytesseract.image_to_string(img)
    
    #if non empty string data is submitted
    if 'text' in request.form and len(request.form['text']) != 0:
        text1 = request.form['text']

    #multiclassification labels
    labels=['SEVERELY', 'MILD', 'NEUTRAL', 'POSITIVE']
    
    # Tokenize text
    x_test = pad_sequences(tokenizer.texts_to_sequences([text1]), maxlen=300)

    # Predict
    score =labels[np.argmax(model.predict([x_test])[0])]
    print(f" label: {score}")
    print(f" sentence: {text1}")

    return score

if __name__ == "__main__":
   app.run(debug=True)