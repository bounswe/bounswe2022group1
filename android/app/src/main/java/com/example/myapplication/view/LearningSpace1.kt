package com.example.myapplication.view

import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.example.myapplication.R
import me.relex.circleindicator.CircleIndicator3

class LearningSpace1 : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.learning_space_1)

        val listView = findViewById<ListView>(R.id.listView)
        val names = arrayOf("Music", "Art", "Art", "Art", "Art", "Art", "Art", "Art","Art","Art")

        val arrayAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, names
        )

        listView.adapter = arrayAdapter

        listView.setOnItemClickListener { adapterView, view, i, l ->
            Toast.makeText(this, "Item selected " + names[i], Toast.LENGTH_LONG).show()
        }
    }
}