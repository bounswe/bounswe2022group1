package com.example.myapplication.service

import com.example.myapplication.model.ls_by_tag_model
import com.example.myapplication.model.ls_create_model
import com.example.myapplication.model.ls_create_response_model
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ls_create_call {

    fun createLSpace(name: ls_create_model, Token: String, onResult: (ls_create_response_model?) -> Unit){
        val retrofit = ServiceBuilder.buildService(ls_create_api::class.java)

        retrofit.createLSpace(name, Token).enqueue(
            object : Callback<ls_create_response_model> {
                override fun onResponse(
                    call: Call<ls_create_response_model>,
                    response: Response<ls_create_response_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<ls_create_response_model>, t: Throwable) {
                    onResult(null)
                }
            }
        )
    }

}