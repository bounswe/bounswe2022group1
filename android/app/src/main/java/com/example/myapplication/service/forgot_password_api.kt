package com.example.myapplication.service

import com.example.myapplication.model.forgot_password_receive_model
import com.example.myapplication.model.forgot_password_send_model
import com.example.myapplication.model.sign_up_receive_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.PUT

interface forgot_password_api {

    //@Headers("Content-Type: application/json")
    @PUT("change-password/")
    fun addUser(@Body userData: forgot_password_send_model): Call<forgot_password_receive_model>
}