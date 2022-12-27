package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace3_patch_note_receive_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("content")
    val content:Int,
    @SerializedName("members")
    val owner:ls_members,
    @SerializedName("body")
    val body:String,
    @SerializedName("created_on")
    val created_on:String
)
