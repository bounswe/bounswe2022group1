package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetDiscussionList_received_model
import com.example.myapplication.model.learningSpace3GetDiscussionList_send_model
import com.example.myapplication.model.learningSpace3PostDiscussion_receive_model
import com.example.myapplication.model.learningSpace3PostDiscussion_send_model
import retrofit2.Call
import retrofit2.http.*

interface learningSpace3PostDiscussion_api {
    @POST("discussion/")
    fun postDiscussion(@Header("Authorization") Token:String, @Body content_id: learningSpace3PostDiscussion_send_model): Call<learningSpace3PostDiscussion_receive_model>
}