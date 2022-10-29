package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.viewpager2.widget.ViewPager2
import com.example.myapplication.R
import me.relex.circleindicator.CircleIndicator3

class LandingActivity : AppCompatActivity() {

    private var titlesList = mutableListOf<String>()
    private var descList = mutableListOf<String>()
    private var imagesList = mutableListOf<Int>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_landing)

        postToList()

        val view_pager2 = findViewById<ViewPager2>(R.id.viewPager2)
        view_pager2.adapter = LandingViewPager(titlesList, descList, imagesList)
        //view_pager2.adapter = ViewPager2.ORIENTATION_HORIZONTAL

        val indicator = findViewById<CircleIndicator3>(R.id.indicator)
        indicator.setViewPager(view_pager2)

    }

    fun go_to_login_page(view: View) {
        var intent = Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }

    fun logged_in(view: View) {
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }

    private fun addToList(title: String, description: String, image: Int) {
        titlesList.add(title)
        descList.add(description)
        imagesList.add(image)
    }

    private fun postToList() {
        addToList("Course Variety", "Enroll in a wide range of courses", R.drawable.variety)
        addToList("Share Your Knowledge", "Create courses and share with others", R.drawable.scholar_hat)
        addToList("Free Courses", "All for free", R.drawable.free)
    }

}