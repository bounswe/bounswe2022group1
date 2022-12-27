package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class favorite_ls(
    @SerializedName("data")
    val data: Array<favorite_ls_element>
)
