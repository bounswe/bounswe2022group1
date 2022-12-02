package com.example.myapplication.view

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.R

class LearningSpace1 : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.learning_space_1)

        val listView = findViewById<ListView>(R.id.Topics)
        val names = arrayOf("Gitar", "Music", "Art", "Photography", "Dance")

        val arrayAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, names
        )

        listView.adapter = arrayAdapter

        listView.setOnItemClickListener { adapterView, view, i, l ->
            //Toast.makeText(this, "Item selected " + names[i], Toast.LENGTH_LONG).show()
            goToLearningSpace2()
        }
    }


    fun goToLearningSpace2() {
        var intent= Intent(applicationContext, LearningSpace2::class.java)
        startActivity(intent)
    }
}