
from django.contrib import admin
from django.urls import path
from backend.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/api/register/', UserRegistrationView.as_view(), name='register'),
    path('user/api/login/', UserLoginView.as_view(), name='login'),
    path('user/api/profile/', UserProfileView.as_view(), name='profile'),
    path('user/api/changepassword/',
         UserChangePasswordView.as_view(), name='changepassword'),
    path('user/api/send-reset-password-email/', SendPasswordResetEmailView.as_view(),
         name='send-reset-password-email'),
    path('user/api/reset-password/<uid>/<token>/',
         UserPasswordResetView.as_view(), name='reset-password'),
    path('customers/<str:mobile>/', CustomerDetail.as_view()),
    path('customers/', CustomerList.as_view(), name='customers'),
    path('bills/', BillList.as_view(), name='bill-list'),
    path('bills/bybillNo/<int:billno>/', BillDetailbyBillNo.as_view(), name='bill-detail-by-billno'),
    path('bills/byMobile/<int:mobile>/', BillDetailbyMobile.as_view(), name='bill-detail-by-mobile'),
    path('billitems/', BillItemList.as_view(), name='billitem-list'),
    path('billitems/<str:billNum>/', BillItemDetail.as_view(), name='billitem-detail'),
]
