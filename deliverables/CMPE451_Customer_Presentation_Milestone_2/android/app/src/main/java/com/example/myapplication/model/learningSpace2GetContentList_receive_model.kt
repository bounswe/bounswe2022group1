package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2GetContentList_receive_model(
    @SerializedName("data")
    val data: Array<learningSpace3GetContent_receive_model>
)
