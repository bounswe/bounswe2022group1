package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3_patch_content_info_send_model
import com.example.myapplication.model.learningSpace3_patch_content_receive_model
import com.example.myapplication.model.learningSpace3_up_count_send_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.PATCH

interface learningSpace3_patch_content_info_api {
    @PATCH("content/")
    fun getInfo(@Header("Authorization") Token:String, @Body new_content: learningSpace3_patch_content_info_send_model): Call<learningSpace3_patch_content_receive_model>
}