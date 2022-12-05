package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2GetContentList_receive_model
import com.example.myapplication.model.learningSpace2GetEnrolledLearningSpaces_data_model
import com.example.myapplication.model.learningSpace2GetEnrolledLearningSpaces_receive_model
import com.google.gson.annotations.SerializedName
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface learningSpace2GetEnrolledLearningSpaces_api {
    @GET("enrolled-learning-spaces/")
    fun getEnrolledSpaces(@Header("Authorization") Token:String): Call<learningSpace2GetEnrolledLearningSpaces_receive_model>
}