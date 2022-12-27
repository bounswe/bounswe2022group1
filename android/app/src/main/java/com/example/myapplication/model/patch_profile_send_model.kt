package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class patch_profile_send_model(
    @SerializedName("about_me")
    val about_me:String?=null,
    @SerializedName("image")
    val image:String?=null
)
