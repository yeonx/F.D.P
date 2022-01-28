import object_detection_api
import os
from PIL import Image
from flask import Flask, request, Response

app = Flask(__name__)

# for CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST') # Put any other methods you need here
    return response


@app.route('/')
def index():
    return Response('Tensor Flow object detection')


@app.route('/image', methods=['POST'])
def image():
    try:
        image_file = request.files['image']  # get the image

        # Set an image confidence threshold value to limit returned data
        threshold = request.form.get('threshold')
        if threshold is None:
            threshold = 0.5
        else:
            threshold = float(threshold)

        # finally run the image through tensor flow object detection`
        image_object = Image.open(image_file)
        objects = object_detection_api.get_objects(image_object, threshold)
        return objects

    except Exception as e:
        print('POST /image error: %e' % e)
        return e


if __name__ == '__main__':
	# without SSL
    app.run(debug=True, host='0.0.0.0')

	# with SSL
    #app.run(debug=True, host='0.0.0.0', ssl_context=('ssl/server.crt', 'ssl/server.key'))
