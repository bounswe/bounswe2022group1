
package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.example.myapplication.R
import com.google.android.material.navigation.NavigationView
import java.nio.file.attribute.AttributeView

var selectedTAG = ""

class HomeActivity : AppCompatActivity() {


    lateinit var toggle: ActionBarDrawerToggle

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)


        val string = findViewById<DrawerLayout>(R.id.drawerLayout)
        toggle = ActionBarDrawerToggle(this, string, R.string.open, R.string.close)

        string.addDrawerListener(toggle)
        toggle.syncState()

        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val string2 = findViewById<NavigationView>(R.id.navView)

        string2.setNavigationItemSelectedListener {
            when(it.itemId) {
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
            }
            true
        }
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
            signInToSignIn()
        }
        val logoffButtonClicked = findViewById<ImageButton>(R.id.logoffButton)
        logoffButtonClicked.setOnClickListener{
            logoffToLanding()
        }
        val profileButtonClicked = findViewById<ImageButton>(R.id.profileButton)
        profileButtonClicked.setOnClickListener{
            toProfile()
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(toggle.onOptionsItemSelected(item)) {
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    fun signInToSignIn() {
        var intent= Intent(applicationContext, SignInActivity::class.java)
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
    fun goToSearch(view: View) {
        var intent= Intent(applicationContext, LsSearchActivity::class.java)
        startActivity(intent)
    }
    fun goToHomePage() {
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }
    fun goToProfilePage(view: View){
        var intent= Intent(applicationContext, ProfilePageActivity::class.java)
        startActivity(intent)
    }
}
