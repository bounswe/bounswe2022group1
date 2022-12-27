package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace3PostDiscussion_receive_model(
    @SerializedName("id")
    val email:Int,
    @SerializedName("content")
    val content:Int,
    @SerializedName("owner")
    val owner:Int,
    @SerializedName("body")
    val body:String,
    @SerializedName("created_on")
    val created_on:String
)
