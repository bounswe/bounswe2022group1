package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningspace2Enroll_receive_model (
    @SerializedName("id")
    val id:Int,
    @SerializedName("name")
    val name:String,
    @SerializedName("members")
    val members:Array<Map<String,String>>
)