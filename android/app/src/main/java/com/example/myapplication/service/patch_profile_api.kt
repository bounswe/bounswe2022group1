package com.example.myapplication.service

import com.example.myapplication.model.patch_profile_about_me_send_model
import com.example.myapplication.model.patch_profile_send_model
import com.example.myapplication.model.profile_see_get_receive_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.PATCH

interface patch_profile_api {
    @PATCH("profile/")
    fun editProfile(@Header("Authorization") Token: String, @Body data: patch_profile_send_model): Call<profile_see_get_receive_model>
}