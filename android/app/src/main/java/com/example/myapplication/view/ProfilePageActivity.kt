package com.example.myapplication.view

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageView
import com.example.myapplication.R
import java.io.File
import java.io.FileOutputStream

class ProfilePageActivity : AppCompatActivity() {

    lateinit var imgView: ImageView
    lateinit var imageUri: Uri
    // change here for api's
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profilepage)


        val profileEditButtonClicked = findViewById<Button>(R.id.editProfile)
        profileEditButtonClicked.setOnClickListener{
            editProfileButton()
        }
    }

    fun editProfileButton() {
        var intent= Intent(applicationContext, ProfileCreateActivity::class.java)
        startActivity(intent)
    }

    fun toChangePassword(view: View) {
        var intent = Intent(applicationContext, ChangePasswordActivity::class.java)
        startActivity(intent)
    }
}