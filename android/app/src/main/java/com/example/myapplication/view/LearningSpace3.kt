package com.example.myapplication.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.RelativeSizeSpan
import android.text.style.SubscriptSpan
import android.view.View
import android.widget.*
import com.example.myapplication.R
import com.example.myapplication.service.learningSpace3GetContent_api_call

class LearningSpace3 : AppCompatActivity() {

    var numberOfUpCount=0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space3)

        val apiService = learningSpace3GetContent_api_call()

        apiService.getContent(currentContentID) {

            //Log.d("current user_token is",user_token)
            if(it?.id !=null){ //content success

                val owners = arrayOf(it?.owner)
                val ownersListView = findViewById<ListView>(R.id.Owners)
                val ownersAdapter: ArrayAdapter<Int> = ArrayAdapter(
                    this, android.R.layout.simple_list_item_1, owners
                )
                ownersListView.adapter=ownersAdapter


                var contentView = findViewById<TextView>(R.id.ContentText)
                contentView.text=it?.text

                var learningTopic = findViewById<TextView>(R.id.learning_topic2)
                learningTopic.text=it?.name?.uppercase()

                var numberOfUp = findViewById<Button>(R.id.UpButton)

                // Creating a string span
                numberOfUpCount=it.upVoteCount
                val mString = "Up +"+numberOfUpCount.toString()
                val mStringSpan = SpannableStringBuilder(mString)

                // Subscripting the string span for "2"
                mStringSpan.setSpan(SubscriptSpan(), 4,mString.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)

                // Setting the text size ratio for "2"
                // with respect to rest of the span
                mStringSpan.setSpan(RelativeSizeSpan(1f),4, mString.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)

                // Setting the string
                // span to TextView
                numberOfUp.text = mStringSpan

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




    fun upClicked(view: View){
        // Creating a string span
        numberOfUpCount++ // should be done via back-end code

        val mString = "Up +"+numberOfUpCount.toString()
        val mStringSpan = SpannableStringBuilder(mString)

        // Subscripting the string span for "2"
        mStringSpan.setSpan(SubscriptSpan(), 4,mString.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)

        // Setting the text size ratio for "2"
        // with respect to rest of the span
        mStringSpan.setSpan(RelativeSizeSpan(1f),4, mString.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)

        // Setting the string
        // span to TextView
        var numberOfUp = findViewById<Button>(R.id.UpButton)
        numberOfUp.text = mStringSpan

    }
}