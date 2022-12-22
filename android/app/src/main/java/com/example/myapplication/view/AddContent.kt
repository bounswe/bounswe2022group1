package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
import com.example.myapplication.R
import com.example.myapplication.model.learningSpace2AddContentText_send_model
import com.example.myapplication.model.learningSpace2AddContentURL_send_model
import com.example.myapplication.service.learningSpace2AddContentText_api_call
import com.example.myapplication.service.learningSpace2AddContentURL_api_call

class AddContent : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_content)

    }


    fun submitButtonClicked(view: View){
        var nameEditText = findViewById(R.id.NameEditText) as EditText
        var textEditText = findViewById(R.id.textEditText) as EditText



        var name=nameEditText.text.toString()
        var type="text"
        var text=textEditText.text.toString()

        if(type=="text" || type=="meeting" || type.equals("discussion")){
            val apiService = learningSpace2AddContentText_api_call()
            val userInfo = learningSpace2AddContentText_send_model(
                name = name,
                type=type,
                text=text,
                learningSpace= learningSpaceID
            )

            apiService.addContent(userInfo){
                if(it?.id!=null){ // content successfully added
                    var intent= Intent(applicationContext, LearningSpace2Menu::class.java)
                    startActivity(intent)
                }
                else{// content couldn't be added.
                    Toast.makeText(this,"Unsucess!.", Toast.LENGTH_LONG).show()
                }
            }

        }
        else if(type=="image" || type=="video"){

            val apiService = learningSpace2AddContentURL_api_call()
            val userInfo = learningSpace2AddContentURL_send_model(
                name = name,
                type=type,
                url=text,
                learningSpace=learningSpaceID
            )

            apiService.addContent(userInfo){
                if(it?.id!=null){ // content successfully added
                    var intent= Intent(applicationContext, LearningSpace2Menu::class.java)
                    startActivity(intent)
                }
                else{// content couldn't be added.
                    Toast.makeText(this,"Unsucess!.", Toast.LENGTH_LONG).show()
                }
            }

        }

        else{ // unknown type!
            Toast.makeText(this,"Type can be text,video,image,discussion,meeting", Toast.LENGTH_LONG).show()
        }

    }


}