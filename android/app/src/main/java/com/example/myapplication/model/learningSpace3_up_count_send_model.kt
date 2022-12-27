package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace3_up_count_send_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("url")
    val url:String,
    @SerializedName("upVoteCount")
    val upVoteCount:Int
)
