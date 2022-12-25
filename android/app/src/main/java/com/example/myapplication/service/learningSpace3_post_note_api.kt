package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3_post_note_send_model
import com.example.myapplication.model.learningSpace3PostDiscussion_receive_model
import com.example.myapplication.model.learningSpace3_post_note_receive_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface learningSpace3_post_note_api {
    @POST("note/")
    fun postNote(@Header("Authorization") Token:String, @Body data: learningSpace3_post_note_send_model): Call<learningSpace3_post_note_receive_model>
}