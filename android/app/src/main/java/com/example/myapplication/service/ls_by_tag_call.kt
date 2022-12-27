package com.example.myapplication.service

import com.example.myapplication.model.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ls_by_tag_call {

    fun getLSpaces(query: String, Token: String, onResult: (ls_by_tag_model?) -> Unit){


        val retrofit = ServiceBuilder.buildService(ls_by_tag_api::class.java)

        retrofit.getLSpaces(query, Token).enqueue(
            object : Callback<ls_by_tag_model> {
            override fun onResponse(
                    call: Call<ls_by_tag_model>,
            response: Response<ls_by_tag_model>
                ) {
                onResult(response.body())
            }

            override fun onFailure(call: Call<ls_by_tag_model>, t: Throwable) {
                onResult(null)
            }
        }
        )
    }

}