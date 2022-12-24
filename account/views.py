from __future__ import print_function
from functools import partial
from multiprocessing import context
from socket import MsgFlag
import io
from django.contrib.auth import authenticate
from django.http import HttpResponse
from account.renderers import UserRenderer
from account.models import User, websiteSettings, Image, ExpertImage, GalleryImage, Testimonials,UploadPdf,QrCodeImage
from rest_framework_simplejwt.tokens  import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
#**************ImageUploads************************#
from django.shortcuts import render
# from .forms import ImageForm
from rest_framework.parsers import MultiPartParser, FormParser

from account.serializers import  SendPasswordResetEmailSerializer, UpdateDataSerializer, UpdateTableDataUserTypeSerializer,UpdateUserNoteSerializer, UpdateWebsiteSettingSerializer, UserAllDataSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializers,UserLoginSerializer, UserChangePasswordSerializer, WebsiteSettingSerializer,SaveTestimonialSerializer,SavePdfSerializer,UpdatePDFSerializer, SaveImageSerializer, SaveExpertImageSerializer, SaveGalleryImageSerializer, SaveQrCodeImageSerializer 



#Add inside Views.py
def index(request):
    return render(request, 'index.html')

# generate token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)
#     access = AccessToken.for_user(user)
#     return {
#         'refresh': str(refresh),
#         'access': str(access),
#     }




# Create your views here.
class UserRegistrationView(APIView):
    # renderer class ko use karne per humko jub bhi postman ya frontend se galat request karenge to error show hoga.
    renderer_classes = [UserRenderer]
    def post(self, request, *args,  format=None):
        # serializer class ko import karke uska use karke data ko UserRegistrationSerializer class me de rahe hai. 
        print("Registration:",request.data )
        serializer = UserRegistrationSerializers(data=request.data)
        print("SerializerData", serializer)
        # serializer ke under validation function ko call karega is_valid jo data ayega wo valid hai ki nahi wo dekhenge 
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            print("User:",user )
            token = get_tokens_for_user(user)
            return Response(
                {'token':token ,'msg':'Registration successful'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#****************************************************************************#
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        # serializer class ko import karke uska use karke data ko UserLoginSerializer class me de rahe hai
        serializer = UserLoginSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email = email, password = password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token':token,'msg':'login successful'},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or password is not valid']}},status=status. HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#****************************************************************************#
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    # Anonimus User ko data access karne ka mauka nahi dega kahega kya Authenticated hai ki nahi check karega.
    # permission user ko data access ke liye token ko authenticate karega. 
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)






#****************************************************************************#
class UserTeacherListData(APIView):
    renderer_classes = [UserRenderer]
    # Anonimus User ko data access karne ka mauka nahi dega kahega kya Authenticated hai ki nahi check karega.
    # permission user ko data access ke liye token ko authenticate karega. 
    def get(self, request, format=None):
        if request.method == 'GET':
            data = User.objects.filter(usertype = 'teacher')
            serializer = UserAllDataSerializer(data, context={'request': request}, many=True)
            
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#****************************************************************************#
class UserStudentListData(APIView):
    renderer_classes = [UserRenderer]
    # Anonimus User ko data access karne ka mauka nahi dega kahega kya Authenticated hai ki nahi check karega.
    # permission user ko data access ke liye token ko authenticate karega. 
    def get(self, request, format=None):
        if request.method == 'GET':
            data = User.objects.filter(usertype = 'student')
            serializer = UserAllDataSerializer(data, context={'request': request}, many=True)
            
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllUserListData(APIView):
    renderer_classes = [UserRenderer]
    # Anonimus User ko data access karne ka mauka nahi dega kahega kya Authenticated hai ki nahi check karega.
    # permission user ko data access ke liye token ko authenticate karega. 
    def get(self, request, format=None):
        if request.method == 'GET':
            data = User.objects.filter(is_admin = False)
            serializer = UserAllDataSerializer(data, context={'request': request}, many=True)
            
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#**************************User-Profile**************************************#
class UpdateProfile(APIView):
    renderer_classes = [UserRenderer]
    def put(self, request, *args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id')
        stu = User.objects.get(id=id)
        serializer = UpdateDataSerializer(stu, data=pythondata)
        
        if serializer.is_valid():
            user = serializer.save()
            # res = {'msg':'Data updated !!'}
            # json_data = JSONRenderer().render(res)    
            # print(json_data)
            token = get_tokens_for_user(user)
            return Response({'token':token ,'msg':'data Updated'}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #     return HttpResponse( json_data, content_type = 'application/json')
        # json_data = JSONRenderer().render(serializer.errors)
        # return HttpResponse(json_data, content_type ='application/json')

# class ImageUploaderView(APIView):
#     parser_classes = (MultiPartParser, FormParser)
#     renderer_classes = [UserRenderer]
#     def put(self, request, *args, **kwargs):
#         print("requestData", request.data)
#         stu = User.objects.get(id=id)
#         print('stu',stu)
#         serializer = ImageUploadSerializer(stu, request.data)
        
#         if serializer.is_valid():
#             print('serialized validated',serializer.validated_data)
#             user = serializer.save()
#             # res = {'msg':'Data updated !!'}
#             # json_data = JSONRenderer().render(res)    
#             # print(json_data)
#             # token = get_tokens_for_user(user)
#             return Response({'msg':'Image Updated'}, status=status.HTTP_201_CREATED)
#         print(serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       
#*****************************************************************************#
class UpdateTable(APIView):
    renderer_classes = [UserRenderer]
    def put(self, request, *args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        print(pythondata)
        id = pythondata.get('id')
        stu = User.objects.get(id=id)
        print(stu)
        serializer = UpdateTableDataUserTypeSerializer(stu, data=pythondata)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'data Updated'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserNote(APIView):
    renderer_classes = [UserRenderer]
    def put(self, request, *args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        print("python", pythondata)
        id = pythondata.get('id')
        stu = User.objects.get(id=id)
        print("stu",stu)
        serializer = UpdateUserNoteSerializer(stu, data=pythondata)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'data Updated'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#**************************************QRCode******************************
class DeleteQrCodeImageView(APIView):
    renderer_classes = [UserRenderer]
    def delete(self, request, *args, **kwargs):
        
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)
        if id is not None:
            try:
                stu = QrCodeImage.objects.get(id=id)
            except QrCodeImage.DoesNotExist:
                res = {'msg': "BannerImage with this is does not exists"}
                json_data = JSONRenderer().render(res)
                
                return HttpResponse(json_data,content_type= "application/json")
            stu.qrcodeimg.storage.delete(stu.qrcodeimg.name)
            stu.delete()
            res = {'msg': "QrCodeImage has been deleted successfully"}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type= "application/json")
        res = {'msg': "Please Provide some id to delete the QrCodeImage"}
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data,content_type= "application/json")          
#*********************QRImages Section********************#
class QrCodeImageView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        serializer = SaveQrCodeImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'msg':'QrCodeImage Uploaded Successfully', 'status':'success', 'image':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    def get(self, request, format=None):
        image = QrCodeImage.objects.all()
        print("ImageQrCode",image)
        serializer = SaveQrCodeImageSerializer(image, many=True)
        return Response({'status':'success', 'Image':serializer.data}, status=status.HTTP_200_OK)





#*****************************************************************************#
class DeleteTableRow(APIView):
    renderer_classes = [UserRenderer]
    def delete(self, request, *args, **kwargs):
        
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)
        if id is not None:
            try:
                stu = User.objects.get(id=id)
            except User.DoesNotExist:
                res = {'msg': "User with this is does not exists"}
                json_data = JSONRenderer().render(res)
                
                return HttpResponse(json_data,content_type= "application/json")
            stu.delete()
            res = {'msg': "User has been deleted successfully"}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type= "application/json")
        res = {'msg': "Please Provide some id to delete the student"}
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data,content_type= "application/json")
        
class DeleteGalleryImageView(APIView):
    renderer_classes = [UserRenderer]
    def delete(self, request, *args, **kwargs):
        
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)
        if id is not None:
            try:
                stu = GalleryImage.objects.get(id=id)
            except GalleryImage.DoesNotExist:
                res = {'msg': "GalleryImage with this is does not exists"}
                json_data = JSONRenderer().render(res)
                
                return HttpResponse(json_data,content_type= "application/json")
            stu.galleryimg.storage.delete(stu.galleryimg.name)
            stu.delete()
            
            res = {'msg': "User has been deleted successfully"}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type= "application/json")
        res = {'msg': "Please Provide some id to delete the student"}
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data,content_type= "application/json") 



class DeleteExpertImageView(APIView):
    renderer_classes = [UserRenderer]
    def delete(self, request, *args, **kwargs):
        
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)
        if id is not None:
            try:
                stu = ExpertImage.objects.get(id=id)
            except ExpertImage.DoesNotExist:
                res = {'msg': "ExpertImage with this is does not exists"}
                json_data = JSONRenderer().render(res)
                
                return HttpResponse(json_data,content_type= "application/json")
            stu.expertimg.storage.delete(stu.expertimg.name)
            stu.delete()
            res = {'msg': "Expert Image has been deleted successfully"}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type= "application/json")
        res = {'msg': "Please Provide some id to delete the Expert Images"}
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data,content_type= "application/json")


class DeleteBannerImageView(APIView):
    renderer_classes = [UserRenderer]
    def delete(self, request, *args, **kwargs):
        
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)
        if id is not None:
            try:
                stu = Image.objects.get(id=id)
            except Image.DoesNotExist:
                res = {'msg': "BannerImage with this is does not exists"}
                json_data = JSONRenderer().render(res)
                
                return HttpResponse(json_data,content_type= "application/json")
            stu.bannerimg.storage.delete(stu.bannerimg.name)
            stu.delete()
            res = {'msg': "BannerImage has been deleted successfully"}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type= "application/json")
        res = {'msg': "Please Provide some id to delete the student"}
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data,content_type= "application/json")          
#*********************Images Section********************#
class BannerImageView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        serializer = SaveImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'msg':'Image Uploaded Successfully', 'status':'success', 'image':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    def get(self, request, format=None):
        image = Image.objects.all()
        print("ImageBanner",image)
        serializer = SaveImageSerializer(image, many=True)
        return Response({'status':'success', 'Image':serializer.data}, status=status.HTTP_200_OK)


class ExpertImageView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        serializer = SaveExpertImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'msg':'Expert Image Uploaded Successfully', 'status':'success', 'image':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    def get(self, request, format=None):
        expertimage = ExpertImage.objects.all()
        print("ImageExpert",expertimage)
        serializer = SaveExpertImageSerializer(expertimage, many=True)
        return Response({'status':'success', 'ExpertImage':serializer.data}, status=status.HTTP_200_OK)

class GalleryImageView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        serializer = SaveGalleryImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'msg':'gallery Image Uploaded Successfully', 'status':'success', 'Galleryimage':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    def get(self, request, format=None):
        galleryimage = GalleryImage.objects.all()
        print("ImageGallery",galleryimage)
        serializer = SaveGalleryImageSerializer(galleryimage, many=True)
        return Response({'status':'success', 'GalleryImage':serializer.data}, status=status.HTTP_200_OK)

class TestimonialView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        print("Testimonial", request.data)
        serializer = SaveTestimonialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'msg':'Testimonial Uploaded Successfully', 'status':'success', 'Testimonial':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    def get(self, request, format=None):
        testimonial = Testimonials.objects.all()
        print("Testimonial",testimonial)
        serializer = SaveTestimonialSerializer(testimonial, many=True)
        return Response({'status':'success', 'Testimonial':serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)
        if id is not None:
            try:
                stu = Testimonials.objects.get(id=id)
            except Testimonials.DoesNotExist:
                res = {'msg': "Guardian with this is does not exists"}
                json_data = JSONRenderer().render(res)
                
                return HttpResponse(json_data,content_type= "application/json")
            stu.gardian_pic.storage.delete(stu.gardian_pic.name)
            stu.delete()
            res = {'msg': "Guardian id has been deleted successfully"}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type= "application/json")
        res = {'msg': "Please Provide some id to delete the Guardian"}
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data,content_type= "application/json")

class UploadPdfView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        print("UploadPdf", request.data)
        serializer = SavePdfSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Pdf Uploaded Successfully', 'status':'success', 'Upload_Pdf':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
    
    def put(self, request, *args, **kwargs):
        print("UpdatePdf", request.data.File)
        
        serializer = UpdatePDFSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'msg':'Pdf Updated Successfully', 'status':'success', 'Upload_Pdf':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)    
    
    def get(self, request, format=None):
        uploadPdf = UploadPdf.objects.all()
        print("uploadPdf",uploadPdf)
        serializer = SavePdfSerializer(uploadPdf, many=True)
        return Response({'status':'success', 'UploadPdf':serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        id = pythondata.get('id', None)
        if id is not None:
            try:
                stu = UploadPdf.objects.get(id=id)
            except UploadPdf.DoesNotExist:
                res = {'msg': "Pdf with this is does not exists"}
                json_data = JSONRenderer().render(res)
                
                return HttpResponse(json_data,content_type= "application/json")
            stu.service_pdf.storage.delete(stu.service_pdf.name)    
            stu.delete()
            
            res = {'msg': "Pdf id has been deleted successfully"}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type= "application/json")
        res = {'msg': "Please Provide some id to delete the PDF"}
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data,content_type= "application/json")      
            
     

#*****************************************************************************#
class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    # jub bhi request send karenge LogedIn user se password ke liye to yaha LoggedIn user ke token ko IsAuthenticated karega agar user ke pass token nahi hoga to postman me show hoga  "detail": "Authentication credentials were not provided."? 
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data = request.data, context={'user':request.user})
        # request.data ke alawa koi or data (request.user jub koi user logedIn) ho to use send karna ho serializer me to context ka use karte hai or data ko object ke form me key value pair me send karete hai.
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Changed Succesfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status= status.HTTP_400_Ok)
#****************************************************************************#
class SendPasswordResetEmailView(APIView):
    rendered_classes = [UserRenderer]
    # jub bhi form pe user jo bhi emailId dalega wo emailId request pe ayega or us EmailId pe hume emil bhejna hai.
    def post(self, request, format=None):
        print(request.data)
        serializer = SendPasswordResetEmailSerializer(data = request.data)
       # waise yaha raise_exception=True karne pe if condition or return me serializer.errors ki jaruwat nahi hai kyunki jub bhi koi unvalid serializer hoga to wahi se exception call ho jayega or koi bhi code aage exicute nahi hoga.
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'password Reset link send. please check your Email'}, status=status.HTTP_200_OK)
#****************************************************************************#
    # after user clicked link in mail 
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)


#****************************WebsiteSettings**********************************#

class websiteSettingsView(APIView):
     
    def put(self, request, *args, **kwargs):
        # file = request.FILES['service']
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        print('pythonData:-',pythondata)
        id = pythondata.get('id')
        print('id:-',id)
        
        stu = websiteSettings.objects.get(id=id)
        print('stu:-', stu)
        serializer = UpdateWebsiteSettingSerializer(stu, data = pythondata)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Website data Update Successfully'},
            status = status.HTTP_201_CREATED)
        return Response(serializer.errors)

    def get(self, request, formate=None):
        if request.method == 'GET':
            data = websiteSettings.objects.all()
            serializer = WebsiteSettingSerializer(data, context={'request': request}, many=True)
            print(serializer.data)
            
            return Response({'status':'success', 'webview': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)