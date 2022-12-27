package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2AddContentText_send_model
import com.example.myapplication.model.learningSpace2AddContent_receive_model
import com.example.myapplication.model.learningSpace2_add_favorite_receive_model
import com.example.myapplication.model.learningSpace2_add_favorite_send_model
import com.example.myapplication.view.user_token
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class learningSpace2_add_fav_api_call {
    fun addFavorite(add_fav_data: learningSpace2_add_favorite_send_model, onResult: (learningSpace2_add_favorite_receive_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(learningSpace2_add_fav_api::class.java)

        retrofit.addFavorite("Token "+ user_token,add_fav_data).enqueue(
            object : Callback<learningSpace2_add_favorite_receive_model> {
                override fun onResponse(
                    call: Call<learningSpace2_add_favorite_receive_model>,
                    response: Response<learningSpace2_add_favorite_receive_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<learningSpace2_add_favorite_receive_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }
}