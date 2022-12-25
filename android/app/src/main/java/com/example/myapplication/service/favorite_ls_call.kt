package com.example.myapplication.service

import com.example.myapplication.model.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class favorite_ls_call {

    fun favoriteLSpaces(Token: String, onResult: (favorite_ls?) -> Unit){

        val retrofit = ServiceBuilder.buildService(favorite_ls_api::class.java)

        retrofit.favoriteLSpaces(Token).enqueue(
            object : Callback<favorite_ls> {
                override fun onResponse(
                    call: Call<favorite_ls>,
                    response: Response<favorite_ls>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<favorite_ls>, t: Throwable) {
                    onResult(null)
                }
            }
        )
    }

}