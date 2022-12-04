
package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

class change_password_response_model (
    @SerializedName("status")
    val status:String,
    @SerializedName("code")
    val code:Integer,
    @SerializedName("message")
    val message:String
)