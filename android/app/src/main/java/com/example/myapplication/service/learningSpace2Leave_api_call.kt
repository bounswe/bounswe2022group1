package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2Leave_response_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace2Leave_api_call {

    fun leaveUser(learning_space_id: Int, onResult: (learningSpace2Leave_response_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2Leave_api::class.java)

        retrofit.leaveUser("Token "+ user_token,learning_space_id).enqueue(
            object : Callback<learningSpace2Leave_response_model> {
                override fun onResponse(
                    call: Call<learningSpace2Leave_response_model>,
                    response: Response<learningSpace2Leave_response_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace2Leave_response_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}