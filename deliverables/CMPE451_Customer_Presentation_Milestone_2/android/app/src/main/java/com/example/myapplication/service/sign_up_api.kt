
package com.example.myapplication.service


import com.example.myapplication.model.sign_up_send_model
import com.example.myapplication.model.sign_up_receive_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface sign_up_api {

    //@Headers("Content-Type: application/json")
    @POST("register/")
    fun addUser(@Body userData: sign_up_send_model): Call<sign_up_receive_model>
}