package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3GetDiscussionList_received_model
import com.example.myapplication.model.learningSpace3PostDiscussion_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace3PostDiscussion_api_call {
    fun postDiscussion(content:Int,Body:String, onResult: (learningSpace3PostDiscussion_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace3PostDiscussion_api::class.java)

        retrofit.postDiscussion("Token "+ user_token,content,Body).enqueue(
            object : Callback<learningSpace3PostDiscussion_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace3PostDiscussion_receive_model>,
                    response: Response<learningSpace3PostDiscussion_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace3PostDiscussion_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}