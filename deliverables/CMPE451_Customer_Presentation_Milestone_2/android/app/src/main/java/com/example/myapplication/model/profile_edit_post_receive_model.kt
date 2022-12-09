package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class profile_edit_post_receive_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("about_me")
    val about_me:String,
    @SerializedName("user")
    val user:Int,
    @SerializedName("learningspaces")
    val learningspaces:Array<Int>,
    @SerializedName("image")
    val image:String
    )