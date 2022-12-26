package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace3_patch_note_send_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("body")
    val body:String
)
