package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class patch_profile_image_and_aboutme_send_model(
    @SerializedName("about_me")
    val about_me:String,
    @SerializedName("image")
    val image:String
)
