package com.example.myapplication.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
import com.example.myapplication.R

class LearningSpace3 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space3)

        val owners = arrayOf("Ömer Özdemir","At hirsizi")
        val ownersListView = findViewById<ListView>(R.id.Owners)
        val ownersAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, owners
        )
        ownersListView.adapter=ownersAdapter


    }
}