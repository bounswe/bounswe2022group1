package com.example.myapplication.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.RelativeSizeSpan
import android.text.style.SubscriptSpan
import android.util.Log
import android.view.View
import android.widget.*
import androidx.appcompat.app.AlertDialog
import com.example.myapplication.R
import com.example.myapplication.model.learningSpace3GetDiscussionList_send_model
import com.example.myapplication.model.learningSpace3PostDiscussion_send_model
import com.example.myapplication.model.ls_create_model
import com.example.myapplication.service.learningSpace3GetContent_api_call
import com.example.myapplication.service.learningSpace3GetDiscussionList_api_call
import com.example.myapplication.service.learningSpace3PostDiscussion_api_call
import com.example.myapplication.service.ls_create_call

class LearningSpace3 : AppCompatActivity() {

    var numberOfUpCount=0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space3)

        val apiService = learningSpace3GetContent_api_call()

        apiService.getContent(currentContentID) {


            if(it?.id !=null){ //content success
                updateDiscussion()
                var nameOfOwner=""
                learningSpaceMEMBERS.forEach{
                    l->
                    if(l.id==it.owner){
                        nameOfOwner=l.name
                    }
                }

                val owners = arrayOf<String>(nameOfOwner)
                val ownersListView = findViewById<ListView>(R.id.Owners)
                val ownersAdapter: ArrayAdapter<String> = ArrayAdapter(
                    this, com.example.myapplication.R.layout.adapter_background, owners
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
                    this, com.example.myapplication.R.layout.adapter_background, owners
                )
                ownersListView.adapter=ownersAdapter
            }
        }


    }


    fun updateDiscussion(){
        val apiService = learningSpace3GetDiscussionList_api_call()

        apiService.getDiscussionList(currentContentID){
            if(it?.data!=null){
                val Chatbox = findViewById<TextView>(R.id.Chatbox)
                var temp=""
                for(i in 0..(it.data.size-1)){
                    temp+=it.data[i].owner.username.toString()+":\n"+it.data[i].body+"\n\n"
                }
                Chatbox.text=temp

            }
            else{
                Log.d("updateDiscussion","update fail abi"+ currentContentID.toString())
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

    fun postClicked(view: View) {
        val builder = AlertDialog.Builder(this)
        val inflater = layoutInflater
        val dialogLayout = inflater.inflate(R.layout.add_discussion_post, null)
        val editText = dialogLayout.findViewById<EditText>(R.id.discussionPostText)

        with(builder) {
            setTitle("Create Discussion Post")
            setPositiveButton("Send"){ dialog, which ->
                val apiService = learningSpace3PostDiscussion_api_call()

                val userData = learningSpace3PostDiscussion_send_model(
                    content=currentContentID,
                    body = editText.text.toString()
                )

                apiService.postDiscussion(userData)  {
                    if(it?.created_on!=null){
                        updateDiscussion()
                    }
                    else{
                        Log.d("Post couldn't be created","omer")
                    }
                }
            }
            setNegativeButton("Cancel") {dialog, which ->

            }
            setView(dialogLayout)
            show()
        }
    }
}