package com.example.myapplication.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import com.example.myapplication.R
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.RelativeSizeSpan
import android.text.style.SubscriptSpan
import android.view.View
import android.widget.*
import com.example.myapplication.service.profile_see_api_call

class ProfileSeeActivity : AppCompatActivity() {
    // change here for api's
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profilesee)

        val apiService = profile_see_api_call()
        apiService.getProfile("Token " + user_token) {
            var _about_me = findViewById(R.id.seeAboutMe) as TextView
            _about_me.text=it?.about_me
            var _username = findViewById(R.id.seeUsername) as TextView
            _username.text=it?.user?.username
            var _email = findViewById(R.id.seeEmail) as TextView
            _email.text=it?.user?.email
        }

    }


}