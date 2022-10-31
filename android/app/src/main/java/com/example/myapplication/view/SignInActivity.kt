package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.sign_in_model
import com.example.myapplication.model.sign_up_model
import com.example.myapplication.service.RestApiService
import com.google.android.material.textfield.TextInputEditText

class SignInActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun goToSignUp(view: View) {
        val intent= Intent(applicationContext, SignUpActivity::class.java)
        startActivity(intent)
    }

    fun logged_in(view: View) {
        val intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }

    fun toLogIn(view: View){
        val userIdView=findViewById(R.id.sign_in_id) as TextInputEditText
        val emailView=findViewById(R.id.sign_in_email) as TextInputEditText
        val passwordView=findViewById(R.id.sign_in_password) as TextInputEditText

        val apiService = RestApiService()
        val userInfo = sign_in_model(
            username = userIdView.text.toString(),
            email = emailView.text.toString(),
            password = passwordView.text.toString())

        apiService.login(userInfo) {

            val success_message=findViewById(R.id.success_message) as TextView
            success_message.setVisibility(View.VISIBLE)
            if(it?.token!=null){
                success_message.text="Login is successful!"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
                logged_in(view);
            }
            else{
                success_message.text="Login is unsuccessful!"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
            }
        }
    }
}