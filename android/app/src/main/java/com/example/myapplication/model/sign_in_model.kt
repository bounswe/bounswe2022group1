package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class sign_in_model(
    @SerializedName("username")
    val username:String,
    @SerializedName("password")
    val password:String
    )