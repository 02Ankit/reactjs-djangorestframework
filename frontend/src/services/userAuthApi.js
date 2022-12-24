import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi(
  { reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }), endpoints: (builder) => ({
    registerUser: builder.mutation({ //mutation means modify state or create update its writeable 
      query: (users) => {
        console.log(users)
        return {
          url: 'register/',
          method: 'POST',
          body: users,
          headers: {
            'Content-type': 'application/json'
          }
        }
      }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    
    //data lena hai is liye query ka use.
    getLoggedUser: builder.query({  
      query: (access_token) => {
        return {
          url: 'profile/',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),

        //data lena hai is liye query ka use.
        // getAllUserData: builder.query({  
        //   query: (access_token) => {
        //     return {
        //       url: 'profile/',
        //       method: 'GET',
        //       headers: {
        //         'authorization': `Bearer ${access_token}`,
        //       }
        //     }
        //   }
        // }),

        //data lena hai is liye query ka use.
        updateProfileData: builder.mutation({  
          query: ({updateData, id}) => {
            return {
              url: `/update-profile/${id}/`,
              method: 'PUT',
              body: updateData,
              headers:{'Content-type':'application/json'}
            }
          }
        }),

        

        updateWebSettings: builder.mutation({  
          query: (updateData) => {
            console.log(updateData)
            return {
              url: 'webupdate/',
              method: 'PUT',
              body: updateData,
              headers:{'Content-type':'application/json'}
            }
          }
        }),


        updateImageData: builder.mutation({  
          query: ({updateData, id}) => {
            return {
              url: `/imageupload/${id}/`,
              method: 'POST',
              body: updateData,
              headers:{'Content-type':'application/json'}
            }
          }
        }),

        // ////////////////////Testimonials////////
        saveTestimonialData: builder.mutation({ //mutation means modify state or create update its writeable 
          query: (saveGardianData) => {
            console.log(saveGardianData)
            return {
              url: 'testimonial/',
              method: 'POST',
              body: saveGardianData,
             
            }
          }
        }),

        testimonialDeleteId: builder.mutation({  
          query: (id) => {
            return {
              url: '/testimonial/',
              method: 'DELETE',
              body: id,
              headers:{'Content-type':'application/json'}
            }
          }
        }),
// //////////////////////////Upload Pdf////////////////////////
        saveUploadPdf: builder.mutation({ //mutation means modify state or create update its writeable 
          query: (saveUploadPdfData) => {
            console.log(saveUploadPdfData)
            return {
              url: 'uploadpdf/',
              method: 'POST',
              body: saveUploadPdfData,
            }
          }
        }),

        updatePdfData: builder.mutation({  
          query: (getpdf) => {
            console.log(getpdf)
            return {
              url: '/uploadpdf/',
              method: 'PUT',
              body: getpdf,
            }
          }
        }),

        deletePdfData: builder.mutation({  
          query: (id) => {
           
            return {
              url: '/uploadpdf/',
              method: 'DELETE',
              body: id,
              headers:{'Content-type':'application/json'}
            }
          }
        }),


      /////////////////////QrCode Image///////////////////////////////// 
      saveQrCodeImageData: builder.mutation({  
        query: (imgdata) => {
          return {
            url: 'qrcodeimgdata/',
            method: 'POST',
            body: imgdata
          }
        }
      }),

      qrCodeDeleteImg: builder.mutation({  
        query: (id) => {
          return {
            url: '/qrcode-delete-img/',
            method: 'DELETE',
            body: id,
            headers:{'Content-type':'application/json'}
          }
        }
      }),

        /////////////////////Banner Image///////////////////////////////// 
        saveImageData: builder.mutation({  
          query: (imgdata) => {
            return {
              url: 'bannerimgdata/',
              method: 'POST',
              body: imgdata
            }
          }
        }),

        bannerDeleteImg: builder.mutation({  
          query: (id) => {
            return {
              url: '/banner-delete-img/',
              method: 'DELETE',
              body: id,
              headers:{'Content-type':'application/json'}
            }
          }
        }),
        
        /////////////////////Expert Reviews///////////////////////////////// 
        saveExpertImageData: builder.mutation({  
          query: (imgdata) => {
            return {
              url: 'expertimgdata/',
              method: 'POST',
              body: imgdata
            }
          }
        }),

        expertDeleteImg: builder.mutation({  
          query: (id) => {
            return {
              url: '/expert-delete-img/',
              method: 'DELETE',
              body: id,
              headers:{'Content-type':'application/json'}
            }
          }
        }),

        /////////////////////Gallery///////////////////////////////// 
        saveGalleryImageData: builder.mutation({  
          query: (imgdata) => {
            return {
              url: 'galleryimgdata/',
              method: 'POST',
              body: imgdata
            }
          }
        }),
        
        galleryDeleteImg: builder.mutation({  
          query: (id) => {
            return {
              url: '/gallery-delete-img/',
              method: 'DELETE',
              body: id,
              headers:{'Content-type':'application/json'}
            }
          }
        }),
       

    
        updateTableData: builder.mutation({  
          query: ({selectedData, id}) => {
            console.log({selectedData, id})
            return {
              url: `/update-table/${id}/`,
              method: 'PUT',
              body: selectedData,
              headers:{'Content-type':'application/json'}
            }
          }
        }),
        
        updateNoteData: builder.mutation({  
          query: ({selectedData, id}) => {
            console.log({selectedData, id})
            return {
              url: `/update-note/${id}/`,
              method: 'PUT',
              body: selectedData,
              headers:{'Content-type':'application/json'}
            }
          }
        }),

        userDeleteRow: builder.mutation({  
          query: (id) => {
            return {
              url: '/delete-row/',
              method: 'DELETE',
              body: id,
              headers:{'Content-type':'application/json'}
            }
          }
        }),

        



    changeUserPassword: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'changepassword/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),

    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
  }),
})
//, useChangeUserPasswordMutation, useSendPasswordResetEmailMutation,useResetPasswordMutation
export const { useRegisterUserMutation, useLoginUserMutation, 
  useGetLoggedUserQuery, useChangeUserPasswordMutation, useResetPasswordMutation, useSendPasswordResetEmailMutation, useUpdateProfileDataMutation, useUpdateTableDataMutation, useUserDeleteRowMutation,useUpdateNoteDataMutation, useUpdateImageDataMutation, useUpdateWebsiteMutation, useUpdateWebSettingsMutation, useSaveTestimonialDataMutation, useTestimonialDeleteIdMutation, useSaveUploadPdfMutation, useUpdatePdfDataMutation,useDeletePdfDataMutation, useSaveImageDataMutation, useSaveExpertImageDataMutation, useSaveGalleryImageDataMutation, useGalleryDeleteImgMutation, useBannerDeleteImgMutation, useSaveQrCodeImageDataMutation,useQrCodeDeleteImgMutation , useExpertDeleteImgMutation} = userAuthApi
//this Hooks are created automaticaly 