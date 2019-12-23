import numpy as np
import cv2 as cv

face_cascade = cv.CascadeClassifier('haarcascade_frontalface_default.xml')
eye_cascade = cv.CascadeClassifier('haarcascade_eye.xml')


# 0,1可以切换摄像头
cap = cv.VideoCapture(0)
if not cap.isOpened():
    print("Cannot open camera")
    exit()
while True:
    # ret 是否读到照片（True or False），frame 视频流
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame")
        break

    frame = cv.flip(frame, 180)
    # 颜色空间转换函数，根据后面的关键字转换
    gray = cv.cvtColor(frame,cv.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray)
    for (x, y, w, h) in faces:
        frame = cv.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        roi_gray = gray[y:y + h, x:x + w]
        roi_color = frame[y:y + h, x:x + w]
        print((x,y),(x+w,y+w))
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex, ey, ew, eh) in eyes:
            if ey < h/3:
                cv.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)
    cv.imshow('frame', frame)
    if cv.waitKey(1) == ord('q'):
        break
# 一定要释放该类
cap.release()
cv.destroyAllWindows()


