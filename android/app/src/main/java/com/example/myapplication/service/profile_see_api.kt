package com.example.myapplication.service
import com.example.myapplication.model.profile_see_get_receive_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Headers
import retrofit2.http.Query

interface profile_see_api {
    @Headers("Content-Type: application/json")
    @GET("profile/")
    fun getProfile(@Header("Authorization") Token: String ): Call<profile_see_get_receive_model>
}