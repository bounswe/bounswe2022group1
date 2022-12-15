package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
import com.example.myapplication.R
import com.example.myapplication.model.learningspace2Enroll_send_model
import com.example.myapplication.service.learningSpace2Enroll_api_call
import com.example.myapplication.service.learningSpace2GetContentList_api_call
import com.example.myapplication.service.learningSpace2GetEnrolledLearningSpaces_api_call
import com.example.myapplication.service.learningSpace2Leave_api_call



var currentContentID=0
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


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2_seecontents)

        var learning_topic = findViewById(R.id.learning_topic) as TextView
        learning_topic.text= learningSpaceNAME

        ShowContributorsAndTopics()

    }



    fun goToLearningSpace3(position:Int) {
            currentContentID = contentID_ContentName[position]!!
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
                    //contributors+=receivedArr[i].owner.toString()
                    names+=receivedArr[i].name.toString()
                    contentID_ContentName.put(i,receivedArr[i].id)
                }

                setContributorsAndTopics()
            }
            else{ // showing contributors is unsucess

            }

        }
    }

}