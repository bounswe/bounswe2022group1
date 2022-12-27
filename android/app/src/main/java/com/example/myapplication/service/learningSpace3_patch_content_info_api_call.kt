package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3_patch_content_info_send_model
import com.example.myapplication.model.learningSpace3_patch_content_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace3_patch_content_info_api_call {
    fun getInfo(new_content: learningSpace3_patch_content_info_send_model, onResult: (learningSpace3_patch_content_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace3_patch_content_info_api::class.java)

        retrofit.getInfo("Token "+ user_token,new_content).enqueue(
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