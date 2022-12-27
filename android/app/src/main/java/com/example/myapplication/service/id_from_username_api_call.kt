package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2_add_favorite_receive_model
import com.example.myapplication.model.learningSpace2_add_favorite_send_model
import com.example.myapplication.model.ls_members
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class id_from_username_api_call {
    fun IDfromUsername(data: String, onResult: (ls_members?) -> Unit){

        val retrofit = ServiceBuilder.buildService(id_from_username_api::class.java)

        retrofit.IDfromUsername("Token "+ user_token,data).enqueue(
            object : Callback<ls_members> {
                override fun onResponse(
                    call: Call<ls_members>,
                    response: Response<ls_members>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<ls_members>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}