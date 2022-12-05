package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class profile_edit_post_send_model(
    @SerializedName("about_me")
    val about_me:String
)