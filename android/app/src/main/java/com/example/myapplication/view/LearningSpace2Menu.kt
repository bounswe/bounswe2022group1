package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.model.learningspace2Enroll_send_model
import com.example.myapplication.service.learningSpace2Enroll_api_call
import com.example.myapplication.service.learningSpace2GetEnrolledLearningSpaces_api_call
import com.example.myapplication.service.learningSpace2Leave_api_call

class LearningSpace2Menu : AppCompatActivity() {
    private lateinit var resource_button:Button
    private lateinit var resource_image:ImageView

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

}