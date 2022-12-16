package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class resetPassword_send_model(
    @SerializedName("email")
    val email:String
)
