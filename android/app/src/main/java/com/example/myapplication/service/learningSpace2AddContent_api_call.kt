package com.example.myapplication.service

import com.example.myapplication.model.*
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace2AddContent_api_call {
    fun addContent(userData: learningSpace2AddContent_send_model, onResult: (learningSpace2AddContent_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2AddContent_api::class.java)

        retrofit.addContent("Token "+ user_token,userData).enqueue(
            object : Callback<learningSpace2AddContent_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace2AddContent_receive_model>,
                    response: Response<learningSpace2AddContent_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace2AddContent_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}