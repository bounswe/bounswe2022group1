package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2AddContentText_send_model (
    @SerializedName("name")
    val name:String,
    @SerializedName("type")
    val type:String,
    @SerializedName("text")
    val text:String,
    @SerializedName("learningSpace")
    val learningSpace:Int
)