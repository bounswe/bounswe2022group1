package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpaceModel(
    @SerializedName("id")
    val id:Int,
    @SerializedName("name")
    val name:String,
    @SerializedName("members")
    val members:Array<ls_members>,
    @SerializedName("tag")
    val tag:String,
    @SerializedName("image")
    val image:String,
    @SerializedName("ls_owner")
    val ls_owner:ls_members,
    @SerializedName("description")
    val description:String,
    @SerializedName("created_on")
    val created_on:String
)
