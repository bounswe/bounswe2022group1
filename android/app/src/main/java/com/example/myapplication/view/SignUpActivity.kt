package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.sign_up_model
import com.example.myapplication.service.RestApiService
import com.google.android.material.textfield.TextInputEditText


class SignUpActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)
    }

    fun goToLoginPage(view: View) {
        var intent= Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }

     fun toSignUp(view: View){
         val userIdView=findViewById(R.id.sign_up_id) as TextInputEditText
         val emailView=findViewById(R.id.sign_up_email) as TextInputEditText
         val passwordView=findViewById(R.id.sign_up_password) as TextInputEditText

        val apiService = RestApiService()
        val userInfo = sign_up_model(
            username = userIdView.text.toString(),
            email = emailView.text.toString(),
            password = passwordView.text.toString())

        apiService.addUser(userInfo) {

            val success_message=findViewById(R.id.success_message) as TextView
            success_message.setVisibility(View.VISIBLE)
            if(it?.token!=null){
                success_message.text="Registration is successful!"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
            }
            else{
                success_message.text="Registration is unsuccessful!"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
            }
        }
    }

}