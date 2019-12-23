from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
import cv2 as cv
import numpy as np
# import tensorflow as tf
import base64
# from keras.models import load_model
# import keras
# keras.backend.clear_session()


face_cascade = cv.CascadeClassifier('haarcascade_frontalface_default.xml')

# model = load_model('keras_cifar10_trained_model_1_2.h5')

#classes_emotion = ['angry','disgust', 'fear','happy','sad', 'surprised', 'normal']

# 修饰器，防止csrf报错
@csrf_exempt
def response(request):
    if request.method == 'POST':  # 当提交表单时
        # 判断是否传参
        if request.POST:
            z = []
            emotion = 0
            img_str = request.POST.get('recognize_img', 0)
            img_decode_ = img_str.encode('ascii')  # ascii编码
            img_decode = base64.b64decode(img_str)#img_decode_)  # base64解码
            img_np = np.frombuffer(img_decode, np.uint8)  # 从byte数据读取为np.array形式
            img = cv.imdecode(img_np, cv.COLOR_RGB2BGR)  # 转为OpenCV形式
            gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
            img = cv.resize(gray, (48, 48))
            img = np.array(img).reshape((1,48, 48,1))
            # classes = model.predict(img,batch_size = 128)
            # emotion = np.argmax(classes)
            faces = face_cascade.detectMultiScale(gray)
            for (x, y, w, h) in faces:
                    z = [x, y, w, h]
            print(z)

            if img_str:
                data={'x':float(z[0]),'y':float(z[1]),'w':float(z[2]),'h':float(z[3])}
                son_mod = json.dumps(data)
                print(data)
                return HttpResponse(son_mod)
            else:
                return HttpResponse('输入错误')
        else:
            return HttpResponse('输入为空')

    else:
        return HttpResponse('方法错误')

"""
img_decode_ = img_str.encode('ascii')  # ascii编码
img_decode = base64.b64decode(img_decode_)  # base64解码
img_np = np.frombuffer(img_decode, np.uint8)  # 从byte数据读取为np.array形式
img = cv.imdecode(img_np, cv.COLOR_RGB2BGR)  # 转为OpenCV形式

cv.imshow('img', img)
cv.waitKey()
cv.destroyAllWindows()
"""