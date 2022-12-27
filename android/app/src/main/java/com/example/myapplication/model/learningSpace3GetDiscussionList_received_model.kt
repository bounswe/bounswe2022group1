package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace3GetDiscussionList_received_model (
    @SerializedName("id")
    val id:Int,
    @SerializedName("content")
    val content:Int,
    @SerializedName("owner")
    val owner:learningSpace3GetDiscussionOwner_model,
    @SerializedName("body")
    val body:String,
    @SerializedName("created_on")
    val created_on:String
    )
