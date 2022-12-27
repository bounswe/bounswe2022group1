package com.example.myapplication.service

import com.example.myapplication.model.*
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace3_up_count_api_call {
    fun updateVote(new_content: learningSpace3_up_count_send_model, onResult: (learningSpace3_patch_content_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace3_up_count_api::class.java)

        retrofit.updateVote("Token "+ user_token,new_content).enqueue(
            object : Callback<learningSpace3_patch_content_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace3_patch_content_receive_model>,
                    response: Response<learningSpace3_patch_content_receive_model>
                ) {

                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace3_patch_content_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}