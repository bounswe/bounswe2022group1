package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.profile_edit_post_send_model
import com.example.myapplication.model.sign_up_send_model
import com.example.myapplication.service.profile_edit_api_call
import com.example.myapplication.service.sign_up_api_call
import com.google.android.material.textfield.TextInputEditText
import okhttp3.MultipartBody
import okhttp3.RequestBody
import org.w3c.dom.Text
import java.io.File

class ProfileCreateActivity : AppCompatActivity() {
    // change here for api's - post
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profilecreate)
    }

    fun goToProfile() {
        var intent= Intent(applicationContext, ProfilePageActivity::class.java)
        startActivity(intent)
    }

    fun editAboutMe(view: View){

        val filePhoto = File("strPhotoUrl") //For example "/storage path
        val photoBody = filePhoto.asRequestBody("image/*".toMediaTypeOrNull())
        var partPhoto = MultipartBody.Part.createFormData("imageFile", filePhoto.name, photoBody)


        val _about_me = findViewById(R.id.about_me) as EditText
        val apiService = profile_edit_api_call()
        val userInfo = profile_edit_post_send_model(
            about_me = _about_me.text.toString())

        apiService.createProfile(userInfo) {

            val success_message_profile=findViewById(R.id.success_message_profile) as TextView
            success_message_profile.setVisibility(View.VISIBLE)
            success_message_profile.text="Edit is successful!\n You are redirected to profile page"
            success_message_profile.postDelayed({success_message_profile.setVisibility(View.INVISIBLE)},2000)
            success_message_profile.postDelayed({goToProfile()},2000)


        }

    }

}