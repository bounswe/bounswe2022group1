package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageButton
import android.widget.LinearLayout
import com.example.myapplication.R
import java.nio.file.attribute.AttributeView

class ProfilePageActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profilepage)
    }

    fun toChangePassword(view: View) {
        var intent= Intent(applicationContext, ChangePasswordActivity::class.java)
        startActivity(intent)
    }
}