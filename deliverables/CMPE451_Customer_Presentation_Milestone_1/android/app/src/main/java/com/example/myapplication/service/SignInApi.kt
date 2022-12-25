package com.example.myapplication.service


import com.example.myapplication.model.sign_in_model
import com.example.myapplication.model.sign_in_response_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface SignInApi {

    @POST("login/")
    fun login(@Body userData: sign_in_model): Call<sign_in_response_model>
}