from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


def welcome(request):
    return JsonResponse({
        'message': 'Hey there! Looks like you have successfully set up the api'
        })


@api_view(['POST'])
def signup(request):
    request_dict = request.data
    username = request_dict.get('username')
    password = request_dict.get('password')
    User.objects.create(username=username, password=password)
    return Response({
        'message': 'signup post request successful',
        'username': username,
        'password': password
        })
