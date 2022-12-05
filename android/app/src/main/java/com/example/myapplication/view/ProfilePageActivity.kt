package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.example.myapplication.R

class ProfilePageActivity : AppCompatActivity() {
    // change here for api's
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profilepage)

        //here do the buttons
        val profileSeeButtonClicked = findViewById<Button>(R.id.seeProfile)
        profileSeeButtonClicked.setOnClickListener{
            seeProfileButton()
        }

        val profileEditButtonClicked = findViewById<Button>(R.id.editProfile)
        profileEditButtonClicked.setOnClickListener{
            editProfileButton()
        }
    }

    fun seeProfileButton() {
        var intent= Intent(applicationContext, ProfileSeeActivity::class.java)
        startActivity(intent)
    }
    fun editProfileButton() {
        var intent= Intent(applicationContext, ProfileCreateActivity::class.java)
        startActivity(intent)
    }

}