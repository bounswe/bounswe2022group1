package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class patch_profile_image_send_model(
    @SerializedName("image")
    val image:String
)
