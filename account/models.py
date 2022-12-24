import email
from turtle import update
from unittest.util import _MAX_LENGTH
from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from django.utils.translation import gettext_lazy as _



# Create custome user Manager
class UserManager(BaseUserManager):
    def create_user(self,email, firstname, lastname, contact,gender,usertype, userclass, usernote , paystatus, tc, password=None, password2 = None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            
            firstname = firstname,
            lastname = lastname,
            contact = contact,
            gender = gender,
            usertype = usertype,
            userclass =userclass,
            paystatus = paystatus,
            usernote = usernote,
            tc = tc,
        )
        # hash password set below
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, firstname, tc, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            firstname= firstname,
          
            tc = tc,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

# Create custom user models here.
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    # userimage = models.ImageField(_("Image"), upload_to = upload_to , default= 'userimage/follower.png')
    
    firstname = models.CharField(max_length = 200, default="")
    lastname = models.CharField(max_length = 200, default="")
    contact = models.IntegerField(default=0)
    gender = models.CharField(max_length = 200, default="")
    usertype = models.CharField(max_length = 200, default="")
    paystatus = models.CharField(max_length = 200, default="")
    userclass = models.CharField(max_length = 200, default="")
    usernote = models.CharField(max_length = 500, default="")
    tc = models.BooleanField()
    # date_of_birth = models.DateField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(auto_now_add = True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'tc']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class websiteSettings(models.Model):
    top_note = models.CharField(max_length=200)
    about_us = models.CharField(max_length=1000)
    footer_email = models.EmailField()
    user_contact = models.IntegerField(default=0)
    session_conduct = models.IntegerField(blank=True)
    our_teachers = models.IntegerField( blank=True)
    our_students = models.IntegerField( blank=True)
    service_docs = models.FileField(upload_to='servicedocs', blank=True)

# Testimonial Section 
class Testimonials(models.Model):
    gardian_pic = models.ImageField(upload_to="gardianpic", blank=True, null=True)
    date = models.DateTimeField(auto_now_add = True)
    gardian_comment = models.CharField(max_length=1000)
    gardian_name = models.CharField(max_length = 200, default="")

class UploadPdf(models.Model):
    service_pdf = models.FileField(upload_to="uploadPdf", blank = True, null=True)
    date = models.DateTimeField(auto_now_add= True)  


class QrCodeImage(models.Model):
   qrcodeimg = models.ImageField(upload_to="qrcodeimage", blank=True, null=True)
   date = models.DateTimeField(auto_now_add = True)

class Image(models.Model):
   bannerimg = models.ImageField(upload_to="bannerimage", blank=True, null=True)
   date = models.DateTimeField(auto_now_add = True)
    

class ExpertImage(models.Model):
   expertimg = models.ImageField(upload_to="expertimage", blank=True, null=True)
   date = models.DateTimeField(auto_now_add = True)
    
class GalleryImage(models.Model):
   galleryimg = models.ImageField(upload_to="galleryimage", blank=True, null=True)
   date = models.DateTimeField(auto_now_add = True)    