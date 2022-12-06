package com.example.myapplication.service

import android.util.Log
import com.example.myapplication.model.learningSpace3GetContent_receive_model
import com.example.myapplication.model.learningSpace3GetDiscussionList_received_data_model
import com.example.myapplication.model.learningSpace3GetDiscussionList_received_model
import com.example.myapplication.model.learningSpace3GetDiscussionList_send_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace3GetDiscussionList_api_call {
    fun getDiscussionList(userData: Int, onResult: (learningSpace3GetDiscussionList_received_data_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace3GetDiscussionList_api::class.java)

        retrofit.getDiscussionList("Token "+ user_token,userData).enqueue(
            object : Callback<learningSpace3GetDiscussionList_received_data_model> {
                override fun onResponse(
                    call: Call<learningSpace3GetDiscussionList_received_data_model>,
                    response: Response<learningSpace3GetDiscussionList_received_data_model>
                ) {
                    Log.d("response code",response.code().toString())
                    Log.d("response body",response.body().toString())
                    Log.d("parameters are",userData.toString())
                    Log.d("getDiscussionList api call resulted successs",response.body().toString())
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace3GetDiscussionList_received_data_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}