package com.example.myapplication.service;

import com.example.myapplication.model.favorite_ls
import com.example.myapplication.model.ls_by_tag_model;

import retrofit2.Call;
import retrofit2.http.*;

interface favorite_ls_api {

    @Headers("Content-Type: application/json")
    @GET("favorite/")
    fun favoriteLSpaces(@Header("Authorization") Token: String): Call<favorite_ls>

}
