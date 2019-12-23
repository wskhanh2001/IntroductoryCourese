from django.http import HttpResponse
import json
import requests
from login.models import User
from django.views.decorators.csrf import csrf_exempt


appid = 'wx3d74065ebee6bb33'
appsecret = '4a27023dd8a533020b8959c577654c55'


# 修饰器，防止csrf报错
@csrf_exempt
def login(request):
    # 前端发送code到后端,后端发送网络请求到微信服务器换取openid
    code = request.POST.get('code')
    if not code:
        return HttpResponse({'message': '缺少code'}, status=400)

    url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code" \
        .format(appid, appsecret, code)
    r = requests.get(url)
    res = json.loads(r.text)
    openid = res['openid'] if 'openid' in res else None
    # session_key = res['session_key'] if 'session_key' in res else None
    if not openid:
        return HttpResponse({'message': '微信调用失败'}, status=503)

    try:
        user = User.objects.get(openid=openid)
    except Exception:
        # 微信用户第一次登陆,新建用户
        nickname = request.POST.get('nickname')
        # sex = request.data.get('sex')
        # avatar = request.data.get('avatar')
        user = User.objects.create(nickname=nickname,  openid=openid)
    res = {
        'status': 'success',
        'nickname': user.nickname
    }
    data = json.dumps(res)
    return HttpResponse(data)
