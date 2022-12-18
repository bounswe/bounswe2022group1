package com.example.myapplication.view

import android.graphics.drawable.Drawable
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.R
import com.example.myapplication.model.learningSpace3PostDiscussion_send_model
import com.example.myapplication.service.learningSpace3GetContent_api_call
import com.example.myapplication.service.learningSpace3GetDiscussionList_api_call
import com.example.myapplication.service.learningSpace3PostDiscussion_api_call
import com.google.android.material.bottomsheet.BottomSheetBehavior


class LearningSpace3 : AppCompatActivity() {

    lateinit var name_of_content:String
    lateinit var owner_of_content:String
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space3)

        val bottomSheetLayout = findViewById<FrameLayout>(R.id.bottom_sheet)
        BottomSheetBehavior.from(bottomSheetLayout).apply{
            peekHeight=100
            this.state=BottomSheetBehavior.STATE_COLLAPSED
        }

        switchToRead()

    }

    fun switchToRead(){
        var resource = findViewById<EditText>(R.id.Resource)
        resource.setEnabled(false)

        var resource_topic=findViewById<TextView>(R.id.resource_topic)
        var owner_text=findViewById<TextView>(R.id.owner_text)


        val apiService = learningSpace3GetContent_api_call()
        apiService.getContent(currentContentID) {
            if(it?.id!=null){
                name_of_content=it.name
                resource_topic.text=it.name
                resource.setText(it.text)


                var nameOfOwner="Eruhlu"
                learningSpaceMEMBERS.forEach{
                        l->
                    if(l.id==it.owner){
                        nameOfOwner=l.name
                    }
                }
                owner_text.text="Owner: "+nameOfOwner
                owner_of_content=nameOfOwner

            }
            else{
                //Log.d("Learning Space 3 Line 67","API Call failed.")
                switchToRead()
            }
        }
        owner_text.setVisibility(View.VISIBLE)

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
        var discussion_text=findViewById<TextView>(R.id.discussion_text)

        if(discussion_text.text.equals("Discussion:")){

            var notes_text=findViewById<TextView>(R.id.notes_text)
            if(notes_text.text.equals("Read:")){
                notes_text.setText("Notes:")
                var notes_image=findViewById<ImageView>(R.id.notes_image)
                notes_image.setImageResource(R.drawable.note)
            }

            discussion_text.setText("Read:")
            var discussion_image=findViewById<ImageView>(R.id.discussion_image)
            discussion_image.setImageResource(R.drawable.book)

            var resource_topic=findViewById<TextView>(R.id.resource_topic)
            resource_topic.setText(name_of_content+" Discussion")

            var owner_text=findViewById<TextView>(R.id.owner_text)
            owner_text.setText("Say Something?")

            owner_text.setOnClickListener{
                if(discussion_text.text.equals("Read:")){
                    postClicked()
                }
            }


            val apiService = learningSpace3GetDiscussionList_api_call()

            apiService.getDiscussionList(currentContentID){
                if(it?.data!=null){
                    var Chatbox = findViewById<TextView>(R.id.Resource)
                    var temp=""
                    for(i in 0..(it.data.size-1)){
                        temp+=it.data[i].owner.username.toString()+":\n"+it.data[i].body+"\n\n"
                    }
                    Chatbox.text=temp

                }
                else{
                    // fail to call update discussion
                }
            }

        }
        else{
            discussion_text.setText("Discussion:")
            var discussion_image=findViewById<ImageView>(R.id.discussion_image)
            discussion_image.setImageResource(R.drawable.discussion)
            switchToRead()

        }

    }

    fun postClicked() {
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
                        // post fail
                    }
                }
            }
            setNegativeButton("Cancel") {dialog, which ->

            }
            setView(dialogLayout)
            show()
        }
    }

    fun updateDiscussion(){
        val apiService = learningSpace3GetDiscussionList_api_call()

        apiService.getDiscussionList(currentContentID){
            if(it?.data!=null){
                val Chatbox = findViewById<TextView>(R.id.Resource)
                var temp=""
                for(i in 0..(it.data.size-1)){
                    temp+=it.data[i].owner.username.toString()+":\n"+it.data[i].body+"\n\n"
                }
                Chatbox.text=temp

            }
            else{

            }
        }

    }

    fun editClicked(view:View){
        var resource = findViewById<EditText>(R.id.Resource)

        if(resource.isEnabled){
            resource.setEnabled(false)
        }
        else{
            resource.setEnabled(true)
        }

    }

    fun notesClicked(view:View){
        var notes_text=findViewById<TextView>(R.id.notes_text)

        if(notes_text.text.equals("Notes:")){
            var discussion_text=findViewById<TextView>(R.id.discussion_text)
            if(discussion_text.text.equals("Read:")){
                discussion_text.setText("Discussion:")
                var discussion_image=findViewById<ImageView>(R.id.discussion_image)
                discussion_image.setImageResource(R.drawable.discussion)
            }

                notes_text.text="Read:"
                var notes_image=findViewById<ImageView>(R.id.notes_image)
                notes_image.setImageResource(R.drawable.book)

                var resource_topic=findViewById<TextView>(R.id.resource_topic)
                resource_topic.setText(name_of_content+" Notes")

                var owner_text=findViewById<TextView>(R.id.owner_text)
                owner_text.setVisibility(View.GONE)


                var resource = findViewById<EditText>(R.id.Resource)
                resource.setText("My notes will be here.") // api call
        }
        else{
            notes_text.text="Notes:"
            var notes_image=findViewById<ImageView>(R.id.notes_image)
            notes_image.setImageResource(R.drawable.note)

            switchToRead()

        }





    }

}