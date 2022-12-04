package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2GetContent_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface learningSpace2GetContent_api {

    @GET("content/")
    fun getContent(@Header("Authorization") Token:String,@Query("id")id:Int): Call<learningSpace2GetContent_receive_model>
}