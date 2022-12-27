package com.example.myapplication.service

import com.example.myapplication.model.change_password_model
import com.example.myapplication.model.change_password_response_model
import com.example.myapplication.model.ls_create_model
import com.example.myapplication.model.ls_create_response_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.Headers
import retrofit2.http.POST

interface ls_create_api {

    @Headers("Content-Type: application/json")
    @POST("learning-space/")
    fun createLSpace(@Body data: ls_create_model, @Header("Authorization") Token: String): Call<ls_create_response_model>
}