package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2AddContent_send_model (
    @SerializedName("name")
    val name:String,
    @SerializedName("type")
    val type:String,
    @SerializedName("text")
    val text:String,
    @SerializedName("url")
    val url:String,
    @SerializedName("learningSpace")
    val learningSpace:Int
)