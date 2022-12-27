package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class user_from_id_receive_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("username")
    val username:String,
    @SerializedName("email")
    val email:String
)
