package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3_patch_content_receive_model
import com.example.myapplication.model.learningSpace3_patch_content_send_model
import com.example.myapplication.model.learningSpace3_up_count_send_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.PATCH

interface learningSpace3_up_count_api {
    @PATCH("content/")
    fun updateVote(@Header("Authorization") Token:String, @Body new_content: learningSpace3_up_count_send_model): Call<learningSpace3_patch_content_receive_model>

}