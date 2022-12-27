package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2GetContentList_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace2GetContentList_api_call {
    fun getContentList(userData: Int, onResult: (learningSpace2GetContentList_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2GetContentList_api::class.java)

        retrofit.getContentList("Token "+ user_token,userData).enqueue(
            object : Callback<learningSpace2GetContentList_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace2GetContentList_receive_model>,
                    response: Response<learningSpace2GetContentList_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace2GetContentList_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}