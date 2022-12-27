package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class ls_members(
    @SerializedName("id")
    val id:Int,
    @SerializedName("username")
    val name:String,
    @SerializedName("email")
    val email:String
)
