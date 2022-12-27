
package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.example.myapplication.R
import com.example.myapplication.model.change_password_model
import com.example.myapplication.model.ls_members
import com.example.myapplication.service.changePasswordApiCall
import com.google.android.material.navigation.NavigationView
import com.google.android.material.textfield.TextInputEditText

class ChangePasswordActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_change_password)
        navMenuHandler()
    }

    private lateinit var checkmembers: MutableList<ls_members>

    lateinit var toggle: ActionBarDrawerToggle

    fun goToLearningSpace2() {
        var intent= Intent(applicationContext, LearningSpace2Menu::class.java)
        startActivity(intent)
    }

    fun editProfileButton() {
        var intent= Intent(applicationContext, ProfileCreateActivity::class.java)
        startActivity(intent)
    }

    fun editProfileButton(view: View) {
        var intent= Intent(applicationContext, ProfileCreateActivity::class.java)
        startActivity(intent)
    }

    fun toChangePassword(view: View) {
        var intent = Intent(applicationContext, ChangePasswordActivity::class.java)
        startActivity(intent)
    }

    fun logoffToLanding() {
        user_token=""
        var intent= Intent(applicationContext, LandingActivity::class.java)
        startActivity(intent)
    }
    fun toProfile() {
        var intent= Intent(applicationContext, ProfilePageActivity::class.java)
        startActivity(intent)
    }
    fun goToLearningSpace1() {
        var intent= Intent(applicationContext, LearningSpace1::class.java)
        startActivity(intent)
    }

    fun goToHomePage() {
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(toggle.onOptionsItemSelected(item)) {
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    fun navMenuHandler() {
        val string = findViewById<DrawerLayout>(R.id.drawerLayout)
        toggle = ActionBarDrawerToggle(this, string, R.string.open, R.string.close)

        string.addDrawerListener(toggle)
        toggle.syncState()

        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val string2 = findViewById<NavigationView>(R.id.navView)

        string2.setNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.profileButton -> toProfile()
                R.id.miItem1 -> goToHomePage()
                R.id.miItem2 -> {
                    selectedTAG = "Art"
                    goToLearningSpace1()
                }
                R.id.miItem3 -> {
                    selectedTAG = "Science"
                    goToLearningSpace1()
                }
                R.id.miItem4 -> {
                    selectedTAG = "Math"
                    goToLearningSpace1()
                }
                R.id.miItem5 -> {
                    selectedTAG = "Technology"
                    goToLearningSpace1()
                }
                R.id.miItem6 -> {
                    selectedTAG = "Engineering"
                    goToLearningSpace1()
                }
                R.id.signOut -> {
                    logoffToLanding()
                }
            }
            true
        }
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