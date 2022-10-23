package com.example.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View

class LandingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_landing)
    }

    fun go_to_login_page(view: View) {
        var intent= Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }

    fun logged_in(view: View) {
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }
}