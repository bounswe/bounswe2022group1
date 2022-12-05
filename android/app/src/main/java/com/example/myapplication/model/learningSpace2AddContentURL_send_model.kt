package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2AddContentURL_send_model(
    @SerializedName("name")
    val name:String,
    @SerializedName("type")
    val type:String,
    @SerializedName("url")
    val url:String,
    @SerializedName("learningSpace")
    val learningSpace:Int
)
