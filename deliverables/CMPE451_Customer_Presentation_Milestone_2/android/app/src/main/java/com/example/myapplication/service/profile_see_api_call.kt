package com.example.myapplication.service

import com.example.myapplication.model.profile_see_get_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class profile_see_api_call {

    fun getProfile(Token: String, onResult: (profile_see_get_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(profile_see_api::class.java)

        retrofit.getProfile("Token "+user_token).enqueue(
            object : Callback<profile_see_get_receive_model> {
                override fun onResponse(
                    call: Call<profile_see_get_receive_model>,
                    response: Response<profile_see_get_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<profile_see_get_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}