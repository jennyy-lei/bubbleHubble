#!/usr/bin/env python
import cv2
import numpy as np
import json
from time import time

def draw(frame,x,y,w,h,c,t=2,tt="",fill=False):

    cv2.line(frame, (x+w//2,y), (x+w//2, int(y+h*0.8)),c, 2)
    cv2.line(frame, (int(x+w*0.1),y+h//3), (int(x+w*0.9), y+h//3),c, 2)
    cv2.ellipse(frame,(x+w//2,int(y+h*0.9)),(int(h*0.65),int(w*0.4)),0,0,360,c,t)
    text(frame,x+w//2-20,y,c,tt)

def text(frame,x,y,c,text,t=1,s=0.5,b=True):
    if b:
        cv2.rectangle(frame, (x-3, y-15), (x+38, y+7), (0, 0, 0), -1)
    cv2.putText(frame, text, (x,y), cv2.FONT_HERSHEY_SIMPLEX, s, c, t, cv2.LINE_AA)

def empty_info(frame, starttime):
    red = (0, 0, 255)
    green = (0, 255, 0)
    yellow = (0, 255, 255)
    overlay = frame.copy()
    x, y, w, h = 30, 20, 290, 140  # Rectangle parameters
    cv2.rectangle(overlay, (x, y), (x+w, y+h), (0, 0, 0), -1)  # A filled rectangle
    alpha = 0.6
    frame = cv2.addWeighted(overlay, alpha, frame, 1 - alpha, 0)

    text(frame,50,60,red,"HIGH RISK : 0",3,1,False)
    text(frame,50,100,yellow,"LOW RISK  : 0",2,1,False)
    text(frame,50,140,green,"NO RISK   : 0",2,1,False)

    d = {
        "timestamp": int(time()-starttime),
        "high": 0,
        "low": 0,
        "safe": 0,
    }
    with open('static/bhlive.json','w') as f:
        json.dump(d, f)

    return frame

def social_distancing_view(frame, distances_mat, boxes, risk_count, starttime):
    
    red = (0, 0, 255)
    green = (0, 255, 0)
    yellow = (0, 255, 255)
    
    for i in range(len(boxes)):

        x,y,w,h = boxes[i][:]
        draw(frame,x,y,w,h,green,tt="Safe")

    for i in range(len(distances_mat)):

        per1 = distances_mat[i][0]
        per2 = distances_mat[i][1]
        closeness = distances_mat[i][2]
        
        if closeness == 1:
            x,y,w,h = per1[:]
            draw(frame,x,y,w,h,yellow,tt="Low")
                
            x1,y1,w1,h1 = per2[:]
            draw(frame,x1,y1,w1,h1,yellow,tt="Low")
                
            cv2.line(frame, (int(x+w/2), int(y+h/2)), (int(x1+w1/2), int(y1+h1/2)),yellow, 2) 
            
    for i in range(len(distances_mat)):

        per1 = distances_mat[i][0]
        per2 = distances_mat[i][1]
        closeness = distances_mat[i][2]
        
        if closeness == 0:
            x,y,w,h = per1[:]
            draw(frame,x,y,w,h,red,t=3,tt="High")
            x1,y1,w1,h1 = per2[:]
            draw(frame,x1,y1,w1,h1,red,t=3,tt="High")
            cv2.line(frame, (int(x+w/2), int(y+h/2)), (int(x1+w1/2), int(y1+h1/2)),red, 2)


    overlay = frame.copy()
    x, y, w, h = 30, 20, 290, 140  # Rectangle parameters
    cv2.rectangle(overlay, (x, y), (x+w, y+h), (0, 0, 0), -1)  # A filled rectangle
    alpha = 0.6
    frame = cv2.addWeighted(overlay, alpha, frame, 1 - alpha, 0)

    text(frame,50,60,red,"HIGH RISK : " + str(risk_count[0]),3,1,False)
    text(frame,50,100,yellow,"LOW RISK  : " + str(risk_count[1]),2,1,False)
    text(frame,50,140,green,"NO RISK   : " + str(max(1,risk_count[2])),2,1,False)

    d = {
        "timestamp": int(time()-starttime),
        "high": risk_count[0],
        "low": risk_count[1],
        "safe": risk_count[2],
    }
    with open('static/bhlive.json','w') as f:
        json.dump(d, f)

    return frame
