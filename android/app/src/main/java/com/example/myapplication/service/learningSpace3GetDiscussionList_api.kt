package com.example.myapplication.service

import com.example.myapplication.model.*
import retrofit2.Call
import retrofit2.http.*

interface learningSpace3GetDiscussionList_api {
    @GET("discussion-list/")
    fun getDiscussionList(@Header("Authorization") Token:String,@Query("content_id")content_id: Int): Call<learningSpace3GetDiscussionList_received_data_model>
}