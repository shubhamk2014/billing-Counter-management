from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
# from backend.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
# Generate Token Manually


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    #   renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    #   renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)


class UserProfileView(APIView):
    #   renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    #   renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)


class SendPasswordResetEmailView(APIView):
    #   renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)


class UserPasswordResetView(APIView):
    #   renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={'uid': uid, 'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password Reset Successfully'}, status=status.HTTP_200_OK)

from rest_framework import generics
from rest_framework.decorators import api_view


class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    # def get_queryset(self):
    #     mobile = self.kwargs['mobile']
    #     return Customer.objects.filter(mobile=mobile)

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'mobile'


@api_view(['PUT'])
def edit_customer(request, mobile):
    try:
        customer = Customer.objects.get(mobile=mobile)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CustomerSerializer(customer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BillList(generics.ListCreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class BillDetailbyBillNo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    lookup_field = 'billno'

class BillDetailbyMobile(generics.ListAPIView):
    serializer_class = BillSerializer
    # lookup_field = 'mobile'
    def get_queryset(self):
        mobile = self.kwargs['mobile']
        return Bill.objects.filter(mobile=mobile)

class BillItemList(generics.ListCreateAPIView):
    queryset = BillItem.objects.all()
    serializer_class = BillItemSerializer

class BillItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BillItem.objects.all()
    serializer_class = BillItemSerializer
    lookup_field = 'billNum'
