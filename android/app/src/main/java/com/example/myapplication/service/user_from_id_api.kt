package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetContent_receive_model
import com.example.myapplication.model.user_from_id_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface user_from_id_api {
    @GET("user-from-id/")
    fun userFromID(@Header("Authorization") Token:String, @Query("id")id:Int): Call<user_from_id_receive_model>
}