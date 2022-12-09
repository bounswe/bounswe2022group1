package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2GetEnrolledLearningSpaces_receive_model
import com.example.myapplication.model.resetPassword_receive_model
import com.example.myapplication.model.resetPassword_send_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace2GetEnrolledLearningSpaces_api_call {
    fun getEnrolledSpaces( onResult: (learningSpace2GetEnrolledLearningSpaces_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2GetEnrolledLearningSpaces_api::class.java)

        retrofit.getEnrolledSpaces("Token "+ user_token).enqueue(
            object : Callback<learningSpace2GetEnrolledLearningSpaces_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace2GetEnrolledLearningSpaces_receive_model>,
                    response: Response<learningSpace2GetEnrolledLearningSpaces_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace2GetEnrolledLearningSpaces_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}