package com.example.myapplication.view

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import com.example.myapplication.R
import com.google.android.material.bottomsheet.BottomSheetBehavior


class LearningSpace3 : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space3)

        val bottomSheetLayout = findViewById<FrameLayout>(R.id.bottom_sheet)
        BottomSheetBehavior.from(bottomSheetLayout).apply{
            peekHeight=100
            this.state=BottomSheetBehavior.STATE_COLLAPSED
        }

    }


    var x=0
    fun upVoteClicked(view: View){
        var Upvote = findViewById<ImageView>(R.id.Upvote)
        var UpCount = findViewById<TextView>(R.id.upCount)

        if(x%2==0){
            x++
            Upvote.setImageResource(R.drawable.down_image)
        }
        else{
            x--
            Upvote.setImageResource(R.drawable.up_image)
        }

        UpCount.text=x.toString()

    }

    fun discussionClicked(view:View){

    }

    fun editClicked(view:View){

    }

    fun notesClicked(view:View){

    }

}