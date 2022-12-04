package com.example.myapplication.service

import com.example.myapplication.model.*
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class learningSpace2Enroll_api_call {


    fun enrollUser(userData: learningspace2Enroll_send_model, onResult: (learningspace2Enroll_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2Enroll_api::class.java)

        retrofit.enrollUser("Token "+user_token,userData).enqueue(
            object : Callback<learningspace2Enroll_receive_model> {
                override fun onResponse(
                    call: Call<learningspace2Enroll_receive_model>,
                    response: Response<learningspace2Enroll_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningspace2Enroll_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}