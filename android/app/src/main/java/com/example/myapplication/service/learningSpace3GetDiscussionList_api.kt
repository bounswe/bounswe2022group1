package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2Leave_response_model
import com.example.myapplication.model.learningSpace3GetContent_receive_model
import com.example.myapplication.model.learningSpace3GetDiscussionList_received_model
import com.example.myapplication.model.learningSpace3GetDiscussionList_send_model
import retrofit2.Call
import retrofit2.http.*

interface learningSpace3GetDiscussionList_api {
    @GET("discussion-list/")
    fun getDiscussionList(@Header("Authorization") Token:String,@Query("content_id")content_id: learningSpace3GetDiscussionList_send_model): Call<learningSpace3GetDiscussionList_received_model>
}