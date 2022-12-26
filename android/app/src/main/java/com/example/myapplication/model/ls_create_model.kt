package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class ls_create_model(
    @SerializedName("name")
    val name:String,
    @SerializedName("description")
    val description:String,
    @SerializedName("tag")
    val tag:String,
)
