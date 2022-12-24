from django.contrib import admin
from account.models import User
from account.models import websiteSettings
from account.models import Image
from account.models import ExpertImage
from account.models import GalleryImage
from account.models import Testimonials
from account.models import UploadPdf
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'bannerimg', 'date']

@admin.register(ExpertImage)
class ExpertImageAdmin(admin.ModelAdmin):
    list_display = ['id','expertimg','date']

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['id','galleryimg','date']    

@admin.register(Testimonials)
class TestimonialsAdmin(admin.ModelAdmin):
    list_display = ['id','gardian_pic','gardian_comment','gardian_name','date']       

@admin.register(UploadPdf)
class UploadPdfAdmin(admin.ModelAdmin):
    list_display = ['id','service_pdf','date']       

@admin.register(websiteSettings)
class websiteSettingsModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'top_note', 'about_us', 'footer_email', 'user_contact','session_conduct', 'our_teachers', 'our_students', 'service_docs']

    fieldsets = (('website info', {'fields': ('top_note','about_us', 'footer_email','user_contact', 'session_conduct','our_teachers', 'our_students', 'service_docs')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    # userAdd+ karne ke liye koun koun se field requiered hai wo decide kar sakte hai.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ( 'top_note','about_us', 'footer_email','user_contact', 'session_conduct','our_teachers', 'our_students', 'service_docs'),
        }),
    )



# Now register the new UserModelAdmin...

# Register your models here.
class UserModelAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    # form = UserChangeForm
    # add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    # field list me kya show karna hai wo decide kar sakte hai. 
    list_display = ('id','email', 'firstname','lastname','contact','gender','usertype','userclass','paystatus','usernote', 'tc', 'is_admin')
    list_filter = ('is_admin',)
    # koi bhi user ko click karke uske under jane pe user ke information show hoga or use change bhi kar sakte hai fieldset me. 
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('firstname','lastname', 'contact', 'gender','usertype','userclass','paystatus', 'usernote', 'tc',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    # userAdd+ karne ke liye koun koun se field requiered hai wo decide kar sakte hai.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ( 'email', 'firstname','lastname', 'contact', 'gender','usertype','userclass','paystatus', 'usernote', 'tc', 'password1', 'password2'),
        }),
    )
    # search kar sakte hai by email 
    search_fields = ('email',)
    # assending and dessending order kounkoun se field pe lagana hai wo laga sakte hai. 
    ordering = ('email','id')
    # kiss tarha se filter karna hai horizontal or vertical
    filter_horizontal = ()
# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)

