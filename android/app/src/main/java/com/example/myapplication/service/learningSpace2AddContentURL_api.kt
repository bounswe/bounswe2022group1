package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2AddContentURL_send_model
import com.example.myapplication.model.learningSpace2AddContent_receive_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface learningSpace2AddContentURL_api {
    @POST("content/")
    fun addContent(@Header("Authorization")Token:String, @Body addContentData: learningSpace2AddContentURL_send_model): Call<learningSpace2AddContent_receive_model>
}