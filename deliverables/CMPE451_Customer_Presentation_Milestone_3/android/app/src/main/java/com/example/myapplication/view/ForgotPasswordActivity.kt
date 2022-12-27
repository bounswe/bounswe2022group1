package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import android.widget.Toast
import com.example.myapplication.R
import com.example.myapplication.model.resetPassword_send_model
import com.example.myapplication.service.changePasswordApiCall
import com.example.myapplication.service.resetPassword_api_call
import com.google.android.material.textfield.TextInputEditText

class ForgotPasswordActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_forgot_password)
    }

    fun goToSignIn(view: View){
        var intent= Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }

    fun goToSignIn(){
        var intent= Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }

    fun resetPassword(view: View) {
        val email = findViewById(R.id.email) as TextInputEditText

        val apiService = resetPassword_api_call()
        val mailInfo = resetPassword_send_model(
            email = email.text.toString()
        )

        apiService.resetPassword(mailInfo)  {

            val success_message = findViewById(R.id.success_message) as TextView
            success_message.setVisibility(View.VISIBLE)

            if(it?.message==null){
                success_message.text="There is no user with given email"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
            }
            else{
                success_message.text="Your password is sent to your email"
                //Toast.makeText(this, it?.message, Toast.LENGTH_LONG).show()
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
                success_message.postDelayed({goToSignIn()},2000)
            }

        }
    }
}