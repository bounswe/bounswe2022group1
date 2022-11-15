
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

class HomeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        //println("I am home"+user_token)
        //user token null değil ise buttonları göster log off göster sign in kapat
        // , null ise sign in göster, butonları kapat logoff kapat
        var buttonLayout = findViewById(R.id.buttonLayout) as LinearLayout
        var logoffButton = findViewById(R.id.logoffButton) as ImageButton
        var signinButton = findViewById(R.id.signinButton) as Button
        
        if(user_token != "") {
            buttonLayout.visibility = View.VISIBLE
            logoffButton.visibility = View.VISIBLE
            signinButton.visibility = View.INVISIBLE
        }
        else {
            buttonLayout.visibility = View.INVISIBLE
            logoffButton.visibility = View.INVISIBLE
            signinButton.visibility = View.VISIBLE
        }

        //here check if buttons are pressed and direct them to signIn
        val signInButtonClicked = findViewById<Button>(R.id.signinButton)
        signInButtonClicked.setOnClickListener{
            to_signIn()
        }
        val logoffButtonClicked = findViewById<ImageButton>(R.id.logoffButton)
        logoffButtonClicked.setOnClickListener{
            toLanding()
        }
    }
    fun to_signIn() {
        var intent= Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }
    fun toLanding() {
        user_token=""
        var intent= Intent(applicationContext, LandingActivity::class.java)
        startActivity(intent)
    }
}
