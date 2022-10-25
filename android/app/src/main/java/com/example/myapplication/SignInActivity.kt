package com.example.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View

class SignInActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun to_sign_up(view: View) {
        var intent= Intent(applicationContext, SignUpActivity::class.java)
        startActivity(intent)
    }

    fun logged_in(view: View) {
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }
}