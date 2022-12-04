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
var currentLearningSpaceId=1

class LearningSpace2 : AppCompatActivity() {
    var names = arrayOf("Yazı", "Video", "Resim", "Tartışma", "Buluşma")
    var contributors=arrayOf("Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt","Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt")

    fun setContributorsAndTopics(){
        val namesListView = findViewById<ListView>(R.id.Topics)
        val contributorsListView = findViewById<ListView>(R.id.Owners)


        var namesAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, names
        )

        var contributorsAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, contributors
        )

        namesListView.adapter=namesAdapter
        contributorsListView.adapter=contributorsAdapter

        namesListView.setOnItemClickListener { parent, view, position, id ->
            goToLearningSpace3(position,id)
        }
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2)

        var join_leave = findViewById(R.id.join_leave) as Button

        if(enrolledLearningSpaceIds.contains(currentLearningSpaceId)){
            join_leave.text="Leave"
        }
        else{
            join_leave.text="Enroll"
            names= arrayOf("Hidden")
            contributors= arrayOf("Hidden")
        }



        var learning_topic = findViewById(R.id.learning_topic) as TextView
        setContributorsAndTopics()
    }



    fun addContent(view: View){

    }

    fun enroll(view :View){
            var join_leave = findViewById(R.id.join_leave) as Button

            if(join_leave.text=="Leave"){
                join_leave.text="Enroll"
                names= arrayOf("Hidden")
                contributors= arrayOf("Hidden")
                enrolledLearningSpaceIds.remove(currentLearningSpaceId)
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
                            Toast.makeText(this, it.members[0].toString(), Toast.LENGTH_LONG).show()

                            //contributors=it?.members
                            contributors= arrayOf("")
                            for(i in 0..(it.members.size-1)){
                                contributors+=it.members[i].toString()
                            }

                            names= arrayOf("")
                            for(i in 0..(it.members.size-1)){
                                contributors+=it.members[i].toString()
                            }


                            // it?.id id of the learning space
                            // it?.name name of the learning space
                            //it?.members [ {"id": id of the user, "username": "username of the user", "email": "email of the user" } ]
                        }
                        else{ // enroll is unsucess
                            Toast.makeText(this,"Hata var.", Toast.LENGTH_LONG).show()
                        }

                    }

                }

            }
        setContributorsAndTopics()
    }


    fun goToLearningSpace3(position:Int,id:Long) {
        var intent= Intent(applicationContext, LearningSpace3::class.java)
        startActivity(intent)
    }
}