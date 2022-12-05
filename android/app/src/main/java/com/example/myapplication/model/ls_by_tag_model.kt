package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class ls_by_tag_model (
    @SerializedName("data")
    val data: Array<list_elements>
)

