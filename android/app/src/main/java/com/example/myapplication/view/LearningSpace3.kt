package com.example.myapplication.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import android.widget.Toast
import com.example.myapplication.R
import com.example.myapplication.service.learningSpace2GetContent_api_call

class LearningSpace3 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space3)


        var currentContentId=1
        val apiService = learningSpace2GetContent_api_call()

        apiService.getContent(currentContentId) {

            var contentView = findViewById<TextView>(R.id.ContentText)
            contentView.text=it?.data.toString()
            if(it?.data?.get(0)?.id !=null){ //content success

                val owners = arrayOf(it?.data?.get(0)?.owner)
                val ownersListView = findViewById<ListView>(R.id.Owners)
                val ownersAdapter: ArrayAdapter<Int> = ArrayAdapter(
                    this, android.R.layout.simple_list_item_1, owners
                )
                ownersListView.adapter=ownersAdapter



                contentView.text=it?.data?.get(0)?.text

                var learningTopic = findViewById<TextView>(R.id.learning_topic2)
                learningTopic.text=it?.data?.get(0)?.name

                var numberOfUp = findViewById<TextView>(R.id.numberOfUp)
                numberOfUp.text="+"+it?.data?.get(0)?.upVoteCount

            }
            else{ // content unsuccess
                val owners = arrayOf("given id doesn't exist")
                val ownersListView = findViewById<ListView>(R.id.Owners)
                val ownersAdapter: ArrayAdapter<String> = ArrayAdapter(
                    this, android.R.layout.simple_list_item_1, owners
                )
                ownersListView.adapter=ownersAdapter
            }
        }


    }
}