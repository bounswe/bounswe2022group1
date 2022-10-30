package com.example.myapplication.service


import com.example.myapplication.model.sign_up_model
import com.example.myapplication.model.sign_up_response_model
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RestApiService {

     fun addUser(userData: sign_up_model, onResult: (sign_up_response_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(sign_up_api::class.java)

        retrofit.addUser(userData).enqueue(
            object : Callback<sign_up_response_model> {
                override fun onResponse(
                    call: Call<sign_up_response_model>,
                    response: Response<sign_up_response_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<sign_up_response_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }

}