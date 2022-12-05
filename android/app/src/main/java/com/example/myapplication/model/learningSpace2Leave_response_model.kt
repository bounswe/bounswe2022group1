package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2Leave_response_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("name")
    val name:String,
    @SerializedName("members")
    val members:Array<Map<String,String>>
)
