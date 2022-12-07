package com.example.myapplication.service


import com.example.myapplication.model.sign_in_model
import com.example.myapplication.model.sign_in_response_model
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignInApiCall {

    fun login(userData: sign_in_model, onResult: (sign_in_response_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(SignInApi::class.java)

        retrofit.login(userData).enqueue(
            object : Callback<sign_in_response_model> {
                override fun onResponse(
                    call: Call<sign_in_response_model>,
                    response: Response<sign_in_response_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<sign_in_response_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }

}