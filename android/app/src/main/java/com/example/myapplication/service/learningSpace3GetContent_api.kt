package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetContent_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface learningSpace3GetContent_api {

    @GET("content/")
    fun getContent(@Header("Authorization") Token:String,@Query("id")id:Int): Call<learningSpace3GetContent_receive_model>
}