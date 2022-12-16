package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetContent_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace3GetContent_api_call {

    fun getContent(userData: Int, onResult: (learningSpace3GetContent_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace3GetContent_api::class.java)

        retrofit.getContent("Token "+user_token,userData).enqueue(
            object : Callback<learningSpace3GetContent_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace3GetContent_receive_model>,
                    response: Response<learningSpace3GetContent_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace3GetContent_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}