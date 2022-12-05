package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class resetPassword_receive_model (
    @SerializedName("message")
    val message:String
)