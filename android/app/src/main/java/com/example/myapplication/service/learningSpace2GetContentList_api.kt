package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2GetContentList_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface learningSpace2GetContentList_api {

    @GET("content-list/")
    fun getContentList(@Header("Authorization") Token:String, @Query("learning_space_id")learning_space_id:Int): Call<learningSpace2GetContentList_receive_model>
}