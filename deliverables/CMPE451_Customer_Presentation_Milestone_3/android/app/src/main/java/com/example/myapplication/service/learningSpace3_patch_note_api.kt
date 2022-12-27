package com.example.myapplication.service

import com.example.myapplication.model.learningSpace3_patch_note_receive_model
import com.example.myapplication.model.learningSpace3_patch_note_send_model
import com.example.myapplication.model.learningSpace3_post_note_receive_model
import com.example.myapplication.model.learningSpace3_post_note_send_model
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.PATCH
import retrofit2.http.POST

interface learningSpace3_patch_note_api {
    @PATCH("note/")
    fun changeNote(@Header("Authorization") Token:String, @Body data: learningSpace3_patch_note_send_model): Call<learningSpace3_patch_note_receive_model>
}