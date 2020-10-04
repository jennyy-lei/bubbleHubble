import cv2
import numpy as np
import time
import argparse

import utills, plot

confid = 0.5
thresh = 0.5
mouse_pts = []

f = None
rf = None

def get_mouse_points(event, x, y, flags, param):

    global mouse_pts
    if event == cv2.EVENT_LBUTTONDOWN:
        if len(mouse_pts) < 4:
            cv2.circle(image, (x, y), 5, (0, 0, 255), 10)
        else:
            cv2.circle(image, (x, y), 5, (255, 0, 0), 10)
            
        if len(mouse_pts) >= 1 and len(mouse_pts) <= 3:
            cv2.line(image, (x, y), (mouse_pts[len(mouse_pts)-1][0], mouse_pts[len(mouse_pts)-1][1]), (70, 70, 70), 2)
            if len(mouse_pts) == 3:
                cv2.line(image, (x, y), (mouse_pts[0][0], mouse_pts[0][1]), (70, 70, 70), 2)
        
        if "mouse_pts" not in globals():
            mouse_pts = []
        mouse_pts.append((x, y))
        #print("Point detected")
        #print(mouse_pts)
        

from time import time as ttt

def calculate_social_distancing(vid_path, net, output_dir, output_vid, ln1):
    global f
    global rf
    count = 0
    starttime = ttt()

    vs = cv2.VideoCapture("http://208.139.200.133:80/mjpg/video.mjpg")
    vs.set(cv2.CAP_PROP_BUFFERSIZE, 0)

    height = int(vs.get(cv2.CAP_PROP_FRAME_HEIGHT))
    width = int(vs.get(cv2.CAP_PROP_FRAME_WIDTH))
    fps = int(vs.get(cv2.CAP_PROP_FPS))
    
    scale_w, scale_h = utills.get_scale(width, height)
    points = []
    global image
    
    while True:

        _,frame = vs.read()
        _, jpeg = cv2.imencode('.jpg', frame)
        rf = jpeg.tobytes()
        (H, W) = frame.shape[:2]
        src = np.float32(np.array(mouse_pts[:4]))
        dst = np.float32([[0, H], [W, H], [W, 0], [0, 0]])
        prespective_transform = cv2.getPerspectiveTransform(src, dst)
        # using next 3 points for horizontal and vertical unit length(in this case 180 cm)
        pts = np.float32(np.array([mouse_pts[4:7]]))
        warped_pt = cv2.perspectiveTransform(pts, prespective_transform)[0]
        distance_w = np.sqrt((warped_pt[0][0] - warped_pt[1][0]) ** 2 + (warped_pt[0][1] - warped_pt[1][1]) ** 2)
        distance_h = np.sqrt((warped_pt[0][0] - warped_pt[2][0]) ** 2 + (warped_pt[0][1] - warped_pt[2][1]) ** 2)
        
        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (416, 416), swapRB=True, crop=False)
        net.setInput(blob)
        start = time.time()
        layerOutputs = net.forward(ln1)
        end = time.time()
        boxes = []
        confidences = []
        classIDs = []   
    
        for output in layerOutputs:
            for detection in output:
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                # detecting humans in frame
                if classID == 0:

                    if confidence > confid:

                        box = detection[0:4] * np.array([W, H, W, H])
                        (centerX, centerY, width, height) = box.astype("int")

                        x = int(centerX - (width / 2))
                        y = int(centerY - (height / 2))

                        boxes.append([x, y, int(width), int(height)])
                        confidences.append(float(confidence))
                        classIDs.append(classID)
                    
        idxs = cv2.dnn.NMSBoxes(boxes, confidences, confid, thresh)
        font = cv2.FONT_HERSHEY_PLAIN
        boxes1 = []
        for i in range(len(boxes)):
            if i in idxs:
                boxes1.append(boxes[i])
                x,y,w,h = boxes[i]
                
        if len(boxes1) == 0:
            frame = plot.empty_info(frame, starttime)
            ret, jpeg = cv2.imencode('.jpg', frame)
            f = jpeg.tobytes()
            count = count + 1
            continue
            
        person_points = utills.get_transformed_points(boxes1, prespective_transform)
        distances_mat, bxs_mat = utills.get_distances(boxes1, person_points, distance_w, distance_h)
        risk_count = utills.get_count(distances_mat)
        frame = plot.social_distancing_view(frame, bxs_mat, boxes1, risk_count, starttime)
        
        if count != 0:
            ret, jpeg = cv2.imencode('.jpg', frame)
            f = jpeg.tobytes()
    
        count = count + 1
 
    vs.release()
    # output_movie.release()    
    cv2.destroyAllWindows() 
        

from flask import Flask, render_template, request, Response, redirect
from queue import LifoQueue
import threading
import json
import time

from flask_cors import CORS

import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'

@app.route('/')
def landing():
    return redirect("http://52.139.37.93:7777/static/landing.html", code=302)

@app.route('/dashboard')
def dashboard():
    return redirect("http://52.139.37.93:7777/static/index/index.html", code=302)


def gen():
    while True:
        ff = rf if f is None else f
        if ff is not None:
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + ff + b'\r\n\r\n')


@app.route("/api")
def api():
    return app.send_static_file('bhlive.json')


@app.route('/video_feed')
def video_feed():
    return Response(gen(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__== "__main__":
    
    weightsPath = model_path + "yolov3.weights"
    configPath = model_path + "yolov3.cfg"

    net_yl = cv2.dnn.readNetFromDarknet("./models/yolov3.cfg", weightsPath)
    ln = net_yl.getLayerNames()
    ln1 = [ln[i[0] - 1] for i in net_yl.getUnconnectedOutLayers()]
    np.random.seed(42)
    
    mouse_pts = [(878, 1027), (1826, 586), (1001, 507), (23, 654), (1306, 825), (1476, 750), (1118, 761), (1158, 683)]

    http = threading.Thread(target=app.run, kwargs={'host': '0.0.0.0', 'port': 7777})
    http.start()
    http.join(0.1)

    t = threading.Thread(target=calculate_social_distancing, args=("", net_yl, "", output_vid, ln1))
    t.start()
    t.join()
