package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2Leave_response_model
import com.example.myapplication.model.learningSpace2ListEveryLearningSpace_receive_model
import com.example.myapplication.model.learningSpace3GetContent_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace2ListEveryLearningSpace_api_call {

    fun listEverySpace(userData: Void, onResult: (learningSpace2ListEveryLearningSpace_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2ListEveryLearningSpace_api::class.java)

        retrofit.listEverySpace("Token "+ user_token).enqueue(
            object : Callback<learningSpace2ListEveryLearningSpace_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace2ListEveryLearningSpace_receive_model>,
                    response: Response<learningSpace2ListEveryLearningSpace_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace2ListEveryLearningSpace_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}