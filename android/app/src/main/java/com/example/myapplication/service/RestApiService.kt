package com.example.myapplication.service


import android.util.Log
import com.example.myapplication.model.sign_up_model
import com.example.myapplication.model.sign_up_response_model
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit

class RestApiService {

     fun addUser(userData: sign_up_model, onResult: (sign_up_response_model?) -> Unit){
        val retrofit = ServiceBuilder.buildService(sign_up_api::class.java)
        retrofit.addUser(userData).enqueue(
            object : Callback<sign_up_response_model> {
                override fun onResponse(
                    call: Call<sign_up_response_model>,
                    response: Response<sign_up_response_model>
                ) {
                    println("-----------------------------------------------")
                    println(response.body())
                    println("-----------------------------------------------")
                }

                override fun onFailure(call: Call<sign_up_response_model>, t: Throwable) {
                    println("FAILFAILFAILFAILFAILFAILFAILFAILFAILFAILFAILFAILFAILFAILFAIL")
                    onResult(null)
                }

            }
        )
    }

}