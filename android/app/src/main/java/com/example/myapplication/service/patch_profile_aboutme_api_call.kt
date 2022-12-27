package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3PostDiscussion_receive_model
import com.example.myapplication.model.learningSpace3PostDiscussion_send_model
import com.example.myapplication.model.patch_profile_about_me_send_model
import com.example.myapplication.model.profile_see_get_receive_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class patch_profile_aboutme_api_call {

    fun editAboutMe(userData: patch_profile_about_me_send_model, onResult: (profile_see_get_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(patch_profile_aboutme_api::class.java)

        retrofit.editAboutMe("Token "+ user_token, userData).enqueue(
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