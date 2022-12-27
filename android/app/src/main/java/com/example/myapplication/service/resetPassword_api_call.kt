package com.example.myapplication.service

import android.util.Log
import com.example.myapplication.model.*
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class resetPassword_api_call {
    fun resetPassword(userData: resetPassword_send_model, onResult: (resetPassword_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(resetPassword_api::class.java)

        retrofit.resetPassword(userData).enqueue(
            object : Callback<resetPassword_receive_model> {
                override fun onResponse(
                    call: Call<resetPassword_receive_model>,
                    response: Response<resetPassword_receive_model>
                ) {
                    Log.d("osman", response.code().toString())
                    onResult(response.body())
                }

                override fun onFailure(call: Call<resetPassword_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}