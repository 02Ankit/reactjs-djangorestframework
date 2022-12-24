
from dataclasses import fields
from unittest.util import _MAX_LENGTH
from wsgiref import validate
from rest_framework import serializers
from account.models import User, websiteSettings, Image, ExpertImage, GalleryImage, Testimonials, UploadPdf, QrCodeImage
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util


class UserRegistrationSerializers(serializers.ModelSerializer):
    # we are writing this becoz we need confirm password field in our Registration Request.
   # view se data UserRegistrationSerializer me aega or  validation hoga or return karega view me serializer variable ko.
    password2 = serializers.CharField(style = {'input_type':'password'}, write_only=True)
 
    class Meta:
        model = User
        # model se koun koun se field ka data lena hai 
        fields = [ 'email', 'firstname', 'lastname', 'contact', 'gender', 'usertype','userclass','paystatus','usernote', 'password', 'password2', 'tc', ]
        extra_kwargs = {
            'password':{'write_only':True}
        }

    # valiadate password and confirm password while registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and confirm Password doesn't match")
        return attrs
    
    # ek user create ho raha hai or humara model custome type isliye ek create method lagana padega 
    # pe generaly model custome type na ho to createmethod ki need nahi hoti
     
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    # model serializer kam karta hai model form ki tarha.
    # view se data UserLoginSerializer me aega or default validation hoga or return karega view class me seializer variable ko.
    email =  serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']
        # serializer se data ko view me le ke authentication ka kam 
        # view me karenge.


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'firstname','lastname', 'contact', 'gender','usertype','userclass','paystatus','usernote', 'is_admin']


# ###########################Images#######################

class SaveQrCodeImageSerializer(serializers.ModelSerializer):
  class Meta:
    model= QrCodeImage
    fields = ['id', 'qrcodeimg']

class SaveImageSerializer(serializers.ModelSerializer):
  class Meta:
    model= Image
    fields = ['id', 'bannerimg']

class SaveExpertImageSerializer(serializers.ModelSerializer):
  class Meta:
    model= ExpertImage
    fields = ['id', 'expertimg']   

class SaveGalleryImageSerializer(serializers.ModelSerializer):
  class Meta:
    model= GalleryImage
    fields = ['id', 'galleryimg']   
          
class SaveTestimonialSerializer(serializers.ModelSerializer):
  class Meta:
    model= Testimonials
    fields = ['id','gardian_pic','gardian_comment','gardian_name']      

class SavePdfSerializer(serializers.ModelSerializer):
  class Meta:
    model= UploadPdf
    fields = ['id','service_pdf']      

# #########################################################################

class UserAllDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'firstname','lastname', 'contact', 'gender','usertype','userclass','paystatus','usernote']




        
#*****************************************************************************#
class UpdateDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'email', 'firstname','lastname', 'contact', 'userclass','paystatus']
    
    def update(self, instance, validated_data):
        instance.id = validated_data.get('id',instance.id)
        instance.email = validated_data.get('email',instance.email)
        instance.firstname = validated_data.get('firstname',instance.firstname)
        instance.lastname = validated_data.get('lastname',instance.lastname)
        instance.userclass = validated_data.get('userclass',instance.userclass)
        instance.paystatus = validated_data.get('paystatus',instance.paystatus)
        instance.contact = validated_data.get('contact',instance.contact)
        print('instance of id',instance.id)
        print('instance of email',instance.email)
        print('instance of firstname',instance.firstname)
        print('instance of lastname',instance.lastname)
        print('instance of contact',instance.contact)
        print('instance of userclass',instance.userclass)
        print('instance of paystatus',instance.paystatus)
        instance.save()
        return instance 
   


#*****************************Pdf************************************************#
class UpdatePDFSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UploadPdf
        fields = ['id', 'service_pdf']
    
    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.service_pdf= validated_data.get('service_pdf', instance.service_pdf)
        
        print('instance of id', instance.id)
        print('instance of usernote', instance.service_pdf)
        
        instance.save()
        return instance 

#*****************************************************************************#
class UpdateTableDataUserTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'usertype', 'paystatus']
    
    def update(self, instance, validated_data):
        instance.id = validated_data.get('id',instance.id)
        instance.usertype = validated_data.get('usertype',instance.usertype)
        instance.paystatus = validated_data.get('paystatus',instance.paystatus)
        
        
        print('instance of id',instance.id)
        print('instance of usertype',instance.usertype)
        print('instance of paystatus',instance.paystatus)
       
        
        instance.save()
        return instance 


class UpdateUserNoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'usernote']
    
    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.usernote= validated_data.get('usernote', instance.usernote)
        
        print('instance of id', instance.id)
        print('instance of usernote', instance.usernote)
        
        instance.save()
        return instance 


#*****************************************************************************#
class UserChangePasswordSerializer(serializers.Serializer):
    #  yaha hum model Serializer ka use nahi karte hai to humko fields ko define karna padega uska model ko manually 
    password = serializers.CharField(max_length = 255, style = {'input_type':'password'}, write_only = True)

    password2 = serializers.CharField(max_length = 255, style = {'input_type':'password'}, write_only = True)

    class Meta:
        fields = ['passsword', 'password2']
    
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        # view me se jo context ke sath request.user send kar rahe hai to use yaha use karne ke liye self.context.get('user) ka use karte hai
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("password and confirm password doesn't match ")
        user.set_password(password)
        user.save()
        return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        print(attrs)
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email = email)
            print(user)
            # encode karenge user id ko or 
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print('Encoded UID', uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token', token)
            link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('Password Reset Link', link)
        #  Send EMail
            body = 'Click Following Link to Reset Your Password '+link
            data = {
            'subject':'Reset Your Password',
            'body':body,
            'to_email':user.email
                }
            # Util.send_email(data) 
           
                       
            return attrs
        else:
            raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
    # decode encoded id and convert into string
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is Expired try again ')
      user.set_password(password)
      user.save()
      return attrs
    #   catch ke jagha except hota 
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')

#**********************UPLOAD_IMAGE**********************************#
# class ImageUploadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id','userimage']
#         def update(self, instance, validated_data):
#             instance.id = validated_data.get('id',instance.id)
#             instance.userimage = validated_data.get('userimage',instance.userimage)
#             print('instance of Image',instance.userimage)
#             instance.save()
#             return instance 

# *************************WebSite Settings**********************************#

class WebsiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model= websiteSettings
        fields = ['id', 'top_note', 'about_us', 'footer_email', 'user_contact', 'session_conduct','our_teachers', 'our_students', 'service_docs' ]

class UpdateWebsiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model= websiteSettings
        fields = ['id', 'top_note', 'about_us', 'footer_email','user_contact', 'session_conduct','our_teachers', 'our_students', 'service_docs']

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.top_note = validated_data.get('top_note', instance.top_note)
        instance.about_us = validated_data.get('about_us', instance.about_us)
        instance.footer_email = validated_data.get('footer_email', instance.footer_email)
        instance.user_contact = validated_data.get('user_contact', instance.user_contact)
        instance.session_conduct = validated_data.get('session_conduct', instance.session_conduct)
        instance.our_teachers = validated_data.get('our_teachers', instance.our_teachers)
        instance.our_students = validated_data.get('our_students', instance.our_students)
        instance.service_docs = validated_data.get('service_docs', instance.service_docs)
        print('instance of id',instance.id)
        print('instance of top_note',instance.top_note)
        print('instance of about_us',instance.about_us)
        print('instance of footer_email',instance.footer_email)
        print('instance of session_conduct',instance.session_conduct)
        print('instance of our_teachers',instance.our_teachers)
        print('instance of our_students',instance.our_students)
        print('instance of user_contact',instance.user_contact)
        print('instance of service_docs',instance.service_docs)
        instance.save()
        return instance 