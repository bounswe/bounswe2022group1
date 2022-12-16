package com.example.myapplication.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.service.learningSpace2GetContentList_api_call

class LearningSpace2Members : AppCompatActivity() {


    var contributors=arrayOf("Ömer Özdemir")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2_members)

        var learning_topic = findViewById(R.id.MemberText) as TextView
        learning_topic.text= learningSpaceNAME+" Members"


        ShowContributorsAndTopics()
    }

    fun setContributorsAndTopics(){
        val contributorsListView = findViewById<ListView>(R.id.Owners)

        var contributorsAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, com.example.myapplication.R.layout.adapter_background, contributors
        )

        contributorsListView.adapter=contributorsAdapter
    }

    fun ShowContributorsAndTopics(){
        val apiService = learningSpace2GetContentList_api_call()
        val userInfo = learningSpaceID

        apiService.getContentList(userInfo) {

            if(it?.data!=null){ // success
                var receivedArr=it?.data
                contributors= arrayOf<String>()
                for (i in 0..(learningSpaceMEMBERS.size-1)){
                    contributors+= learningSpaceMEMBERS[i].name
                }

                setContributorsAndTopics()
            }
            else{ // showing contributors is unsucess

            }
        }
    }



}