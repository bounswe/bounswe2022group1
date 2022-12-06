
package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.change_password_model
import com.example.myapplication.service.changePasswordApiCall
import com.google.android.material.textfield.TextInputEditText

class ChangePasswordActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_change_password)
        //println("I am home"+user_token)
    }

    fun goToHomePage() {
        var intent = Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }

    fun goToLanding(){
        var intent= Intent(applicationContext, LandingActivity::class.java)
        startActivity(intent)
    }

    fun changePassword(view: View) {
        val oldPassword = findViewById(R.id.newPassword) as TextInputEditText
        val newPassword = findViewById(R.id.email) as TextInputEditText

        val apiService = changePasswordApiCall()
        val passwordInfo = change_password_model(
            old_pass = oldPassword.text.toString(),
            new_pass = newPassword.text.toString()
        )


        apiService.changePassword(passwordInfo, "Token " + user_token)  {

            val success_message = findViewById(R.id.success_message) as TextView
            success_message.setVisibility(View.VISIBLE)

            if(it?.code == Integer(200)){
                success_message.text="Password is changed succesfully\n You are redirected to Homepage"
                user_token = ""
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
                success_message.postDelayed({goToLanding()},2000)


            }
            else{
                success_message.text="Credentials are incorrect"
                success_message.postDelayed({success_message.setVisibility(View.INVISIBLE)},2000)
            }

        }
    }
}