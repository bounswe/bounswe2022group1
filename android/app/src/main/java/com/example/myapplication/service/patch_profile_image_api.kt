package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3_up_count_send_model
import com.example.myapplication.model.patch_profile_image_send_model
import com.example.myapplication.model.profile_see_get_receive_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.PATCH

interface patch_profile_image_api {
    @PATCH("profile/")
    fun editImage(@Header("Authorization") Token: String,@Body data: patch_profile_image_send_model): Call<profile_see_get_receive_model>

}