package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2GetContentList_receive_model
import com.example.myapplication.model.learningSpace2Leave_response_model
import com.example.myapplication.model.learningspace2Enroll_receive_model
import com.example.myapplication.model.learningspace2Enroll_send_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

class learningSpace2Leave_api_call {

    fun leaveUser(leaveData: Int, onResult: (learningSpace2Leave_response_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2Leave_api::class.java)

        retrofit.leaveUser("Token "+ user_token,leaveData).enqueue(
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