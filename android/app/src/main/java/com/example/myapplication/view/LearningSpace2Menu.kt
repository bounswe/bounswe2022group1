package com.example.myapplication.view

import android.content.Intent
import android.media.Image
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.example.myapplication.R
import com.example.myapplication.model.learningSpace2AddContentText_send_model
import com.example.myapplication.model.learningSpace2_add_favorite_send_model
import com.example.myapplication.model.learningSpace2_remove_favorite_send_model
import com.example.myapplication.model.learningspace2Enroll_send_model
import com.example.myapplication.service.*
import com.google.android.material.navigation.NavigationView

class LearningSpace2Menu : AppCompatActivity() {
    private lateinit var resource_button:Button
    private lateinit var resource_image:ImageView
    private lateinit var toggle: ActionBarDrawerToggle
    private lateinit var member_button:Button
    private lateinit var member_image:ImageView


    private lateinit var addresource_button:Button
    private lateinit var addresource_image:ImageView

    private lateinit var addfavorite_button:Button
    private lateinit var addfavorite_image:ImageView

    private lateinit var enroll_button:Button
    private lateinit var enroll_image:ImageView

    private var isMember:Boolean=false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2_menu)
        navMenuHandler()
        resource_button= findViewById(R.id.resource_button) as Button
        resource_image = findViewById(R.id.resource_image) as ImageView

        member_button= findViewById(R.id.member_button) as Button
        member_image = findViewById(R.id.member_image) as ImageView

        addresource_button= findViewById(R.id.addresource_button) as Button
        addresource_image = findViewById(R.id.addresource_image) as ImageView

        addfavorite_button= findViewById(R.id.addfavorite_button) as Button
        addfavorite_image = findViewById(R.id.addfavorite_image) as ImageView

        enroll_button = findViewById(R.id.enroll_button) as Button
        enroll_image=findViewById(R.id.enroll_image) as ImageView

        var learning_topic = findViewById(R.id.topic) as TextView
        learning_topic.text= learningSpaceNAME

        resource_image.setVisibility(View.GONE)
        resource_button.setVisibility(View.GONE)

        member_button.setVisibility(View.GONE)
        member_image.setVisibility(View.GONE)

        addresource_button.setVisibility(View.GONE)
        addresource_image.setVisibility(View.GONE)

        addfavorite_button.setVisibility(View.GONE)
        addfavorite_image.setVisibility(View.GONE)

        enroll_image.setImageResource(R.drawable.addmember)

        enroll_button.text = "Enroll"

        initScreen()
    }

    fun goToResources(view: View) {
        var intent= Intent(applicationContext,LearningSpace2Resources::class.java)
        startActivity(intent)
    }

    fun goToMembers(view: View) {
        var intent= Intent(applicationContext,LearningSpace2Members::class.java)
        startActivity(intent)
    }

    fun goToAddResource(view: View) {
        var intent= Intent(applicationContext,AddContent::class.java)
        startActivity(intent)
    }


    fun onClickaddFavorite(view:View){
        var addfavorite_image=findViewById<ImageView>(R.id.addfavorite_image)
        var addfavorite_button=findViewById<Button>(R.id.addfavorite_button)

        if(addfavorite_button.text.equals("Add Favorite")){

            val userInfo = learningSpace2_add_favorite_send_model(
                learningSpace= learningSpaceID
            )

            val apiService = learningSpace2_add_fav_api_call()
            apiService.addFavorite (userInfo) {
                if(it!=null){
                    addfavorite_image.setImageResource(R.drawable.remove_fav)
                    addfavorite_button.setText("Remove Favorite")
                }
            }

        }
        else{

            val userInfo = learningSpace2_add_favorite_send_model(
                learningSpace= learningSpaceID
            )

            val apiService = learningSpace2_remove_fav_api_call()
            apiService.removeFavorite (userInfo) {
                if(it!=null){
                    addfavorite_image.setImageResource(R.drawable.add_fav)
                    addfavorite_button.setText("Add Favorite")
                }
            }

        }


    }


    fun updateScreen(isMember:Boolean){

        if(isMember){
            resource_image.setVisibility(View.VISIBLE)
            resource_button.setVisibility(View.VISIBLE)

            member_button.setVisibility(View.VISIBLE)
            member_image.setVisibility(View.VISIBLE)

            addresource_button.setVisibility(View.VISIBLE)
            addresource_image.setVisibility(View.VISIBLE)

            addfavorite_button.setVisibility(View.VISIBLE)
            addfavorite_image.setVisibility(View.VISIBLE)

            enroll_image.setImageResource(R.drawable.leave)

            enroll_button.text = "Leave"
        }
        else{
            resource_image.setVisibility(View.GONE)
            resource_button.setVisibility(View.GONE)

            member_button.setVisibility(View.GONE)
            member_image.setVisibility(View.GONE)

            addresource_button.setVisibility(View.GONE)
            addresource_image.setVisibility(View.GONE)

            addfavorite_button.setVisibility(View.GONE)
            addfavorite_image.setVisibility(View.GONE)

            enroll_image.setImageResource(R.drawable.addmember)

            enroll_button.text = "Enroll"
        }

    }


    fun initScreen(){
        var isMember:Boolean=false
        val apiService = learningSpace2GetEnrolledLearningSpaces_api_call()
        apiService.getEnrolledSpaces() {
            if (it?.data != null) {
                for (i in 0..(it.data.size - 1)) {

                    if (it.data[i].id == learningSpaceID) {
                        isMember=true
                        break
                    }
                }
                updateScreen(isMember)
            }
            else{
                Log.d("API Call for getIsMember","has failed")
            }
        }

    }


    fun onClickenroll(view:View) {

        isMember=false
        val apiService = learningSpace2GetEnrolledLearningSpaces_api_call()
        apiService.getEnrolledSpaces() {
            if (it?.data != null) {
                for (i in 0..(it.data.size - 1)) {

                    if (it.data[i].id == learningSpaceID) {
                        isMember = true
                        break
                    }
                }

                if (isMember) {

                    val apiService = learningSpace2Leave_api_call()
                    val userInfo = learningspace2Enroll_send_model(
                        learning_space_id = learningSpaceID
                    )
                    apiService.leaveUser(userInfo) {
                        if (it?.id != null) {
                            updateScreen(false)
                        } else { // leave did not work
                            Log.d(
                                "omer",
                                it.toString() + " " + learningSpaceID.toString() + "adam leave edemiyo" + user_token
                            )

                        }
                    }

                }
                else{
                    val apiService = learningSpace2Enroll_api_call()
                    val userInfo = learningspace2Enroll_send_model(
                        learning_space_id = learningSpaceID
                    )

                    apiService.enrollUser(userInfo) {
                        //Log.d("omer enroll",it.toString())
                        if(it?.id!=null){ // success
                            updateScreen(true)
                        }
                        else{ // enroll is unsucess
                            Log.d("unsucess enroll","omer")
                        }

                    }

                }


            }
            else{
                Log.d("API Call for getIsMember","has failed")

            }
        }

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

}