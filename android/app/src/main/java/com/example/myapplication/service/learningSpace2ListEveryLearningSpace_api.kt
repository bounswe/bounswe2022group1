package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2ListEveryLearningSpace_data_model
import com.example.myapplication.model.learningSpace2ListEveryLearningSpace_receive_model
import com.example.myapplication.model.learningSpace3GetContent_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface learningSpace2ListEveryLearningSpace_api {
    @GET("learning-space-list/")
    fun listEverySpace(@Header("Authorization") Token:String): Call<learningSpace2ListEveryLearningSpace_receive_model>
}