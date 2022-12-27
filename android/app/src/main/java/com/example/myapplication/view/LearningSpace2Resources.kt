package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.example.myapplication.R
import com.example.myapplication.model.learningspace2Enroll_send_model
import com.example.myapplication.service.*
import com.google.android.material.navigation.NavigationView



var contentID_ContentName: HashMap<Int, Int> = HashMap<Int, Int>()

class LearningSpace2Resources : AppCompatActivity() {
    var names = arrayOf("Yazı", "Video", "Resim", "Tartışma", "Buluşma")

    fun setContributorsAndTopics(){
        val namesListView = findViewById<ListView>(R.id.Topics)

        var namesAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, com.example.myapplication.R.layout.adapter_background,names
        )

        namesListView.adapter=namesAdapter

        namesListView.setOnItemClickListener { parent, view, position, id ->
            goToLearningSpace3(position)
        }
    }

    private lateinit var toggle: ActionBarDrawerToggle
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2_seecontents)
        navMenuHandler()
        var learning_topic = findViewById(R.id.learning_topic) as TextView
        learning_topic.text= learningSpaceNAME+" Resources"

        ShowContributorsAndTopics()
    }

    fun goToLearningSpace3(position:Int) {
            content_id = contentID_ContentName[position]!!
            var intent = Intent(applicationContext, LearningSpace3::class.java)
            startActivity(intent)
    }

    fun ShowContributorsAndTopics(){
        val apiService = learningSpace2GetContentList_api_call()
        val userInfo = learningSpaceID

        apiService.getContentList(userInfo) {

            if(it?.data!=null){ // success
                var receivedArr=it?.data

                names= arrayOf<String>()
                for(i in 0..(receivedArr.size-1)){

                    var owner_name="fako"
                    learningSpaceMEMBERS.forEach{
                            l->
                        if(l.id==receivedArr[i].owner){
                            owner_name=l.name
                        }
                    }

                    names+="Topic: "+receivedArr[i].name.toString()+"\n"+"Owner:"+owner_name+
                    "   Votes:"+receivedArr[i].upVoteCount+
                            "\n"
                    contentID_ContentName.put(i,receivedArr[i].id)
                }

                setContributorsAndTopics()
            }
            else{ // showing contributors is unsucess

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