package com.example.myapplication.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import com.example.myapplication.R
import com.example.myapplication.service.learningSpace2GetContentList_api_call
import com.example.myapplication.service.learningSpace2ListEveryLearningSpace_api_call

class LearningSpace2Members : AppCompatActivity() {


    var contributors=arrayOf("Ömer Özdemir")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2_members)

        var learning_topic = findViewById(R.id.MemberText) as TextView
        learning_topic.text= learningSpaceNAME+" Members"

        val apiService = learningSpace2ListEveryLearningSpace_api_call()
        apiService.listEverySpace () {
            if (it?.data != null) {
                for (i in 0..(it.data.size - 1)) {

                    if (it.data[i].id == learningSpaceID) {
                        contributors= arrayOf<String>()

                        for(j in 0..(it.data[i].members.size-1)){
                            contributors+=it.data[i].members[j].name
                        }
                        setContributorsAndTopics()
                        break
                    }
                }
            }
            else{ // error for API

            }
        }

    }

    fun setContributorsAndTopics(){
        val contributorsListView = findViewById<ListView>(R.id.Owners)

        var contributorsAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, com.example.myapplication.R.layout.adapter_background,contributors
        )

        contributorsListView.adapter=contributorsAdapter

    }

}