package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace3_post_note_send_model(
    @SerializedName("body")
    val body:String,
    @SerializedName("content")
    val content:Int
)
