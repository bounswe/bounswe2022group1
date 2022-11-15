
package com.example.myapplication.service


import com.example.myapplication.model.change_password_model
import com.example.myapplication.model.change_password_response_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.PUT

interface change_password_api {

    @Headers("Content-Type: application/json")
    @PUT("change-password/")
    fun changePassword(@Body passwordInfo: change_password_model): Call<change_password_response_model>

}