package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetContent_receive_model
import com.example.myapplication.model.user_from_id_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class user_from_id_api_call {
    fun userFromID(userData: Int, onResult: (user_from_id_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(user_from_id_api::class.java)

        retrofit.userFromID("Token "+ user_token,userData).enqueue(
            object : Callback<user_from_id_receive_model> {
                override fun onResponse(
                    call: Call<user_from_id_receive_model>,
                    response: Response<user_from_id_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<user_from_id_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}