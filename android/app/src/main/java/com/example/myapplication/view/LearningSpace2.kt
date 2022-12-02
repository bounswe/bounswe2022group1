package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.*
import com.example.myapplication.R

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
        if(user_token.isEmpty()){
            join_leave.text="Join";
        }
        else{
            join_leave.text="Leave";
        }

        val namesAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, names
        )

        val contributorsAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, contributors
        )

        namesListView.adapter=namesAdapter
        contributorsListView.adapter=contributorsAdapter

        namesListView.setOnItemClickListener { parent, view, position, id ->
            goToLearningSpace3()
        }


        join_leave.setOnClickListener{
            if(join_leave.text=="Leave"){
                join_leave.text="Join"
            }
            else if(join_leave.text=="Join"){
                if(!user_token.isEmpty()){
                    join_leave.text="Leave"
                }
            }
        }




    }


    fun goToLearningSpace3() {
        var intent= Intent(applicationContext, LearningSpace3::class.java)
        startActivity(intent)
    }
}