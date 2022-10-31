
package com.example.myapplication.service


import com.example.myapplication.model.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class changePasswordApiCall {


    fun changePassword(passwordInfo: change_password_model, onResult: (change_password_response_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(change_password_api::class.java)

        retrofit.changePassword(passwordInfo).enqueue(
            object : Callback<change_password_response_model> {
                override fun onResponse(
                    call: Call<change_password_response_model>,
                    response: Response<change_password_response_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<change_password_response_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }

=======
package com.example.myapplication.service


import com.example.myapplication.model.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class changePasswordApiCall {


    fun changePassword(passwordInfo: change_password_model, onResult: (change_password_response_model?) -> Unit){

        val retrofit = ServiceBuilder.buildService(change_password_api::class.java)

        retrofit.changePassword(passwordInfo).enqueue(
            object : Callback<change_password_response_model> {
                override fun onResponse(
                    call: Call<change_password_response_model>,
                    response: Response<change_password_response_model>
                ) {
                    onResult(response.body())
                }

                override fun onFailure(call: Call<change_password_response_model>, t: Throwable) {
                    onResult(null)
                }

            }
        )
    }


}