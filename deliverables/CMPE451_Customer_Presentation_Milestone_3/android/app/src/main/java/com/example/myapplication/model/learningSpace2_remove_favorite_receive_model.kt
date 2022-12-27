package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class learningSpace2_remove_favorite_receive_model(
    @SerializedName("data")
    val data: Array<add_favorite_data_model>
)
