package com.example.myapplication.service

import com.example.myapplication.model.learningSpace2AddContentText_send_model
import com.example.myapplication.model.learningSpace2AddContent_receive_model
import com.example.myapplication.model.learningSpace2_add_favorite_receive_model
import com.example.myapplication.model.learningSpace2_add_favorite_send_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface learningSpace2_add_fav_api {
    @POST("favorite/")
    fun addFavorite(@Header("Authorization")Token:String, @Body add_fav_data: learningSpace2_add_favorite_send_model): Call<learningSpace2_add_favorite_receive_model>
}