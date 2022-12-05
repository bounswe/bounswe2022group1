package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetDiscussionList_received_model
import com.example.myapplication.model.learningSpace3PostDiscussion_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Query

interface learningSpace3PostDiscussion_api {
    @POST("discussion/")
    fun postDiscussion(@Header("Authorization") Token:String, @Query("content_id")content_id:Int,@Query("body")body:String): Call<learningSpace3PostDiscussion_receive_model>
}