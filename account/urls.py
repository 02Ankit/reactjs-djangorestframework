from django.urls import path, include
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

from account.views import AllUserListData, DeleteTableRow, SendPasswordResetEmailView, UpdateProfile, UpdateTable, UpdateUserNote, UserChangePasswordView, UserPasswordResetView, UserProfileView, UserRegistrationView, UserLoginView, UserStudentListData, UserTeacherListData, websiteSettingsView,  TestimonialView, UploadPdfView, BannerImageView, ExpertImageView, GalleryImageView, DeleteBannerImageView, DeleteGalleryImageView, DeleteExpertImageView, QrCodeImageView, DeleteQrCodeImageView

urlpatterns = [
   path('', views.index, name='index'),
    path('register/', UserRegistrationView.as_view(), name= 'register'),
    path('login/', UserLoginView.as_view(), name= 'login'),

    path('profile/', UserProfileView.as_view(), name= 'profile'),

    path('update-profile/<int:uid>/', UpdateProfile.as_view(), name= 'update-profile'),

    path('webupdate/', websiteSettingsView.as_view(), name= 'webupdate'),

    path('update-table/<int:uid>/', UpdateTable.as_view(), name= 'update-table'),

 path('update-note/<int:uid>/', UpdateUserNote.as_view(), name= 'update-table'),

    path('delete-row/', DeleteTableRow.as_view(), name= 'delete'),
    
    path('teacherslist/', UserTeacherListData.as_view(), name= 'teacherslist'),
    
    path('studentslist/', UserStudentListData.as_view(), name= 'studentlist'),

    path('alluserlist/', AllUserListData.as_view(), name= 'alluserlist'),
   
    path('changepassword/', UserChangePasswordView.as_view(), name= 'changepassword'),
   
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name= 'send-reset-password-email'),
    # after resetpassword form submited then run this link Uod with token
   
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name= 'reset-password'),
    
    path('weblist/', websiteSettingsView.as_view(), name= 'weblist'),

    path('testimonial/', TestimonialView.as_view(), name= 'testimonial' ),
   path('uploadpdf/', UploadPdfView.as_view(),  name='uploadpdf'),
   

   path('qrcodeimgdata/', QrCodeImageView.as_view(), name= 'qrcodeimgdata'),

   path('qrcode-delete-img/', DeleteQrCodeImageView.as_view(), name= 'qrcode-delete-img'),

   path('bannerimgdata/', BannerImageView.as_view(), name= 'bannerimgdata'),

   path('banner-delete-img/', DeleteBannerImageView.as_view(), name= 'banner-delete-img'),

   path('expertimgdata/', ExpertImageView.as_view(), name= 'expertimgdata'),

   path('expert-delete-img/', DeleteExpertImageView.as_view(), name= 'gallery-delete-img'),

   path('galleryimgdata/', GalleryImageView.as_view(), name= 'galleryimgdata'),
   
   path('gallery-delete-img/', DeleteGalleryImageView.as_view(), name= 'gallery-delete-img'),


]