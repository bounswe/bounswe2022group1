package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class favorite_ls_element(
    @SerializedName("id")
    val id: Int,
    @SerializedName("user")
    val user: Int,
    @SerializedName("learningSpace")
    val learningSpace: list_elements
)
