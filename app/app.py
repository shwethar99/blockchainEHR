from PIL import Image
import base64
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
import numpy
import cv2
app = Flask(__name__)
@app.route("/")
def home():
	return "hi"
@app.route("/index")

@app.route('/convert', methods=['GET', 'POST'])
def convert():
	message = None
	if request.method == 'POST':
		filestr = request.files['img'].read()
		npimg = numpy.fromstring(filestr, numpy.uint8)
		img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
		img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
		he=img.shape[0]
		wid=img.shape[1]
		foo = Image.fromarray(img)
		foo = foo.resize((30,30),Image.ANTIALIAS)
		foo.save("./image_scaled_opt.jpg",optimize=True,quality=95)
		with open("./image_scaled_opt.jpg","rb") as img_file:
			imgstring=base64.b64encode(img_file.read())
		imageb64=imgstring.decode('utf-8')
		textfile=open("./converted.js","w")
		content="module.exports='"+imageb64+"';"
		n=textfile.write(content)
		restoredimg=base64.b64decode(imgstring)
		reImg=bytearray(restoredimg)
		image_result = open('./img_decode.jpg', 'wb')
		image_result.write(restoredimg)
		image_result.close()
		reImg=Image.open("./img_decode.jpg")
		reImg=reImg.resize((he,wid),Image.ANTIALIAS)
		reImg.save("./img_recreation.jpg",optimize=True,quality=95)
		#return render_template('image.html', user_image = image)
		resp = make_response('{response:success}')
		resp.headers['Content-Type'] = "application/json"
		return resp


		
if __name__ == "__main__":
	app.run(debug = True)
