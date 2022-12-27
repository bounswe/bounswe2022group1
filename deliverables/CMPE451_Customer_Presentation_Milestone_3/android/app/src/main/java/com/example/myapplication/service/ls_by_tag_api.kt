package com.example.myapplication.service;

import com.example.myapplication.model.ls_by_tag_model;

import retrofit2.Call;
import retrofit2.http.*;

interface ls_by_tag_api {

    @Headers("Content-Type: application/json")
    @GET("learning-space-tag-search/")
    fun getLSpaces(@Query("tag") tag: String, @Header("Authorization") Token: String): Call<ls_by_tag_model>

}
