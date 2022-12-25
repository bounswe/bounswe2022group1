package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class add_favorite_data_model(
    @SerializedName("id")
    val id: Int,
    @SerializedName("user")
    val user: Int,
    @SerializedName("learningSpace")
    val learningSpace: learningSpaceModel
)