package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class sign_up_response_model(
    @SerializedName("expiry")
    val expiry:String,
    @SerializedName("token")
    val token:String
)