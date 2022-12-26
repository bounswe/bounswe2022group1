package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class profile_see_get_receive_model (
    @SerializedName("id")
    val id:Int,
    @SerializedName("about_me")
    val about_me:String,
    @SerializedName("user")
    val user:Int,
    @SerializedName("image")
    val image:String,
    @SerializedName("learningspaces")
    val learningspaces:Array<Int>,

)