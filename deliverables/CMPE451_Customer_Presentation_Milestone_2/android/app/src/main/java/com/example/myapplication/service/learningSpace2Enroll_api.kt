package com.example.myapplication.service


import com.example.myapplication.model.*
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.http.*

interface learningSpace2Enroll_api {
    @POST("enroll/")
    fun enrollUser(@Header("Authorization")Token:String , @Body enrollData: learningspace2Enroll_send_model): Call<learningspace2Enroll_receive_model>
}