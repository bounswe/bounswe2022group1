package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.*
import com.example.myapplication.R
import com.example.myapplication.model.learningspace2Enroll_send_model
import com.example.myapplication.service.learningSpace2Enroll_api_call

val enrolledLearningSpaceIds=mutableSetOf<Int>()


class LearningSpace2 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2)


        var learning_topic = findViewById(R.id.learning_topic) as TextView

        val namesListView = findViewById<ListView>(R.id.Topics)
        val contributorsListView = findViewById<ListView>(R.id.Owners)

        val names = arrayOf("Yazı", "Video", "Resim", "Tartışma", "Buluşma")
        val contributors=arrayOf("Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt","Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt")


        var join_leave = findViewById(R.id.join_leave) as Button

        val namesAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, names
        )

        val contributorsAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, contributors
        )

        namesListView.adapter=namesAdapter
        contributorsListView.adapter=contributorsAdapter

        namesListView.setOnItemClickListener { parent, view, position, id ->
            goToLearningSpace3(position,id)
        }

        val currentLearningSpaceId=0
        join_leave.setOnClickListener{
            if(join_leave.text=="Leave"){
                //join_leave.text="Enroll"
            }
            else if(join_leave.text=="Enroll" && !enrolledLearningSpaceIds.contains(currentLearningSpaceId) ){
                if(!user_token.isEmpty()){
                    join_leave.text="Leave"

                    val apiService = learningSpace2Enroll_api_call()
                    val userInfo = learningspace2Enroll_send_model(
                        learning_space_id = currentLearningSpaceId
                    )

                    apiService.enrollUser(userInfo) {

                        if(it?.id!=null){ // success
                            enrolledLearningSpaceIds.add(it?.id)
                            // it?.id id of the learning space
                            // it?.name name of the learning space
                            //it?.members [ {"id": id of the user, "username": "username of the user", "email": "email of the user" } ]
                        }
                        else{ // enroll is unsucess

                        }

                    }

                }
            }
        }




    }


    fun addContent(view: View){

    }


    fun goToLearningSpace3(position:Int,id:Long) {
        var intent= Intent(applicationContext, LearningSpace3::class.java)
        startActivity(intent)
    }
}