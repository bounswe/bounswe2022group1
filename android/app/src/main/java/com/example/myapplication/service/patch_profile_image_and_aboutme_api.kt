package com.example.myapplication.service

import com.example.myapplication.model.patch_profile_image_and_aboutme_send_model
import com.example.myapplication.model.patch_profile_image_send_model
import com.example.myapplication.model.profile_see_get_receive_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.PATCH

interface patch_profile_image_and_aboutme_api {
    @PATCH("profile/")
    fun editBoth(@Header("Authorization") Token: String, @Body data: patch_profile_image_and_aboutme_send_model): Call<profile_see_get_receive_model>
}