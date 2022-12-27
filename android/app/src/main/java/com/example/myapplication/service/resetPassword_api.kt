package com.example.myapplication.service

import com.example.myapplication.model.ls_create_model
import com.example.myapplication.model.ls_create_response_model
import com.example.myapplication.model.resetPassword_receive_model
import com.example.myapplication.model.resetPassword_send_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface resetPassword_api {
    @POST("forget-password/")
    fun resetPassword(@Body data: resetPassword_send_model): Call<resetPassword_receive_model>
}