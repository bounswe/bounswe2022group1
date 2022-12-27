package com.example.myapplication.service

import com.example.myapplication.model.ls_members
import com.example.myapplication.model.user_from_id_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface id_from_username_api {
    @GET("user_id_from_username/")
    fun IDfromUsername(@Header("Authorization") Token:String, @Query("username")username:String): Call<ls_members>
}