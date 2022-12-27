package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetContent_receive_model
import com.example.myapplication.model.learningSpace3_see_all_note_receive_model
import com.example.myapplication.model.learningSpace3_see_all_note_send_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface learningSpace3_see_all_note_api {
    @GET("note/")
    fun seeAllNotes(@Header("Authorization") Token:String, @Query("content_id")content_id: Int): Call<learningSpace3_see_all_note_receive_model>
}