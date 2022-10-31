
package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.sign_in_model
import com.example.myapplication.service.SignInApiCall
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

    fun loggedIn(view: View) {
        val intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }

    fun toLogIn(view: View){
        val userIdView= findViewById<TextInputEditText>(R.id.sign_in_id)
        val passwordView= findViewById<TextInputEditText>(R.id.sign_in_password)

        val apiService = SignInApiCall()
        val userInfo = sign_in_model(
            username = userIdView.text.toString(),
            password = passwordView.text.toString())

        apiService.login(userInfo) {

            val successMessage= findViewById<TextView>(R.id.success_message)
            successMessage.visibility = View.VISIBLE
            if(it?.token!=null){
                successMessage.text="Login is successful!"
                user_token = it?.token
                successMessage.postDelayed({ successMessage.visibility = View.INVISIBLE },2000)
                loggedIn(view);
            }
            else{
                successMessage.text="Login is unsuccessful!"
                successMessage.postDelayed({ successMessage.visibility = View.INVISIBLE },2000)
            }
        }
    }
=======
package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.sign_in_model
import com.example.myapplication.service.SignInApiCall
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

    fun loggedIn(view: View) {
        val intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }

    fun toLogIn(view: View){
        val userIdView= findViewById<TextInputEditText>(R.id.sign_in_id)
        val passwordView= findViewById<TextInputEditText>(R.id.sign_in_password)

        val apiService = SignInApiCall()
        val userInfo = sign_in_model(
            username = userIdView.text.toString(),
            password = passwordView.text.toString())

        apiService.login(userInfo) {

            val successMessage= findViewById<TextView>(R.id.success_message)
            successMessage.visibility = View.VISIBLE
            if(it?.token!=null){
                successMessage.text="Login is successful!"
                user_token = it?.token
                successMessage.postDelayed({ successMessage.visibility = View.INVISIBLE },2000)
                loggedIn(view);
            }
            else{
                successMessage.text="Login is unsuccessful!"
                successMessage.postDelayed({ successMessage.visibility = View.INVISIBLE },2000)
            }
        }
    }

}