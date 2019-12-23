from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse




@csrf_exempt
def index(request):
    if request.method == 'POST':
        data = {"status":"success"}
        res = json.dumps(data)
        return HttpResponse( '<h1>Page was found</h1>')
        # return JsonResponse({'city': 'beijing', 'subject': 'python'})
    else:
        # return JsonResponse({'city': 'beijing', 'subject': 'python'})
        return HttpResponse('<h1>Page was found</h1>')