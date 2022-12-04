package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2GetContent_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace2GetContent_api_call {

    fun getContent(userData: Int, onResult: (learningSpace2GetContent_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2GetContent_api::class.java)

        retrofit.getContent("Token "+user_token,userData).enqueue(
            object : Callback<learningSpace2GetContent_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace2GetContent_receive_model>,
                    response: Response<learningSpace2GetContent_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace2GetContent_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}