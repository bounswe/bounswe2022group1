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
        val apiService = RestApiService()
        val userInfo = sign_up_model(
            username = "quanex1",
            email = "alex@gmail.com",
            password = "asd123asd123")

        apiService.addUser(userInfo) {

            val success_message=findViewById(R.id.success_message) as TextView
            success_message.text=it?.toString()
            println(it?.toString())
        }
    }

}
