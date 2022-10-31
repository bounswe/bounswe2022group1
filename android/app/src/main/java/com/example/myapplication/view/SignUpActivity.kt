package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.sign_up_send_model
import com.example.myapplication.service.sign_up_api_call
import com.google.android.material.textfield.TextInputEditText

var user_token=""

class SignUpActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)
    }

    fun goToLoginPage() {
        var intent= Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }

    fun goToHomePage(){
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }

     fun toSignUp(view: View){
         val userIdView=findViewById(R.id.sign_up_id) as TextInputEditText
         val emailView=findViewById(R.id.sign_up_email) as TextInputEditText
         val passwordView=findViewById(R.id.sign_up_password) as TextInputEditText

        val apiService = sign_up_api_call()
        val userInfo = sign_up_send_model(
            username = userIdView.text.toString(),
            email = emailView.text.toString(),
            password = passwordView.text.toString())

        apiService.addUser(userInfo) {

            val success_message=findViewById(R.id.success_message) as TextView
            success_message.setVisibility(View.VISIBLE)
            if(it?.token!=null){
                user_token=it?.token
                success_message.text="Registration is successful!\n You are redirected to Homepage"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
                success_message.postDelayed({goToHomePage()},2000)
            }
            else{
                success_message.text="Registration is unsuccessful!"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
            }
        }
    }

}
