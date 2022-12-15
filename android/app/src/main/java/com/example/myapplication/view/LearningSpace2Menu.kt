package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import com.example.myapplication.R

class LearningSpace2Menu : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2_menu)

        var learning_topic = findViewById(R.id.topic) as TextView
        learning_topic.text= learningSpaceNAME
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

}