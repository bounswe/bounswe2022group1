package com.example.myapplication.service

import com.example.myapplication.model.ls_by_tag_model
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Headers
import retrofit2.http.Query

interface ls_search_api {
    @Headers("Content-Type: application/json")
    @GET("learning-space-search/")
    fun getLSpacesBySearch(@Query("search_parameter") tag: String, @Header("Authorization") Token: String): Call<ls_by_tag_model>
}