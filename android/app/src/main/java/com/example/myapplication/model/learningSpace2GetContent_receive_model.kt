package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2GetContent_receive_model(
    @SerializedName("id")
    val id: Int,
    @SerializedName("name")
    val name: String,
    @SerializedName("type")
    val type: String,
    @SerializedName("text")
    val text: String,
    @SerializedName("url")
    val url: String,
    @SerializedName("owner")
    val owner: Int,
    @SerializedName("learningSpace")
    val learningSpace: Int,
    @SerializedName("upVoteCount")
    val upVoteCount: Int
)