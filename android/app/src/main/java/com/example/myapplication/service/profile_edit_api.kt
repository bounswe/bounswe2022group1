
package com.example.myapplication.service


import com.example.myapplication.model.profile_edit_post_receive_model
import com.example.myapplication.model.profile_edit_post_send_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface profile_edit_api {

    //@Headers("Content-Type: application/json")
    @POST("profile/")
    //adduser will change
    fun createProfile(@Header("Authorization") Token:String, @Body userData: profile_edit_post_send_model): Call<profile_edit_post_receive_model>
}