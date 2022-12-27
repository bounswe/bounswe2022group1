package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2GetEnrolledLearningSpaces_data_model(
    @SerializedName("id")
    val id:Int,
    @SerializedName("name")
    val name:String,
    @SerializedName("members")
    val members:Array<ls_members>,
    @SerializedName("tag")
    val tag:String
)
