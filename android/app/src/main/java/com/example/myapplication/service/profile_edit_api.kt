
package com.example.myapplication.service


import com.example.myapplication.model.profile_edit_post_receive_model
import com.example.myapplication.model.profile_edit_post_send_model
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface profile_edit_api {

    //@Headers("Content-Type: application/json")
    @Multipart
    @POST("profile/")
    fun createProfile(@Part("about_me") about_me: RequestBody,@Part("image") image:MultipartBody.Part?): Call<profile_edit_post_receive_model>
}