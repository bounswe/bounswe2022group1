package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2GetContent_receive_model(
    @SerializedName("data")
    val data:Array<learningSpace2GetContent_list_received_model>
)