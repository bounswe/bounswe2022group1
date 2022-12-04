package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2AddContent_receive_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("name")
    val name:String,
    @SerializedName("type")
    val type:String,
    @SerializedName("text")
    val text:String,
    @SerializedName("owner1")
    val owner1:String,
    @SerializedName("owner2")
    val owner2:String,
    @SerializedName("up_VoteCount")
    val up_VoteCount:String


)
