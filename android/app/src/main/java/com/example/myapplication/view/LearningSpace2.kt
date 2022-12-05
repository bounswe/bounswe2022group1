package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
import com.example.myapplication.R
import com.example.myapplication.model.learningspace2Enroll_send_model
import com.example.myapplication.service.learningSpace2Enroll_api_call
import com.example.myapplication.service.learningSpace2GetContentList_api_call


var currentContentID=0
var contentID_ContentName: HashMap<Int, Int> = HashMap<Int, Int>()

class LearningSpace2 : AppCompatActivity() {
    var names = arrayOf("Yazı", "Video", "Resim", "Tartışma", "Buluşma")
    var contributors=arrayOf("Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt","Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt")

    fun setContributorsAndTopics(){
        val namesListView = findViewById<ListView>(R.id.Topics)
        val contributorsListView = findViewById<ListView>(R.id.Owners)


        var namesAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, names
        )

        var contributorsAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, android.R.layout.simple_list_item_1, contributors
        )

        namesListView.adapter=namesAdapter
        contributorsListView.adapter=contributorsAdapter

        namesListView.setOnItemClickListener { parent, view, position, id ->
            goToLearningSpace3(position)
        }
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space2)

        var join_leave = findViewById(R.id.join_leave) as Button

        Log.d("user token of the user is", user_token)
        if(join_leave.text.equals("ENROLL")){
            names= arrayOf("Hidden")
            contributors= arrayOf("Hidden")
        }
        else{
            ShowContributorsAndTopics()
        }


        var learning_topic = findViewById(R.id.learning_topic) as TextView
        learning_topic.text= learningSpaceNAME


        join_leave.setOnClickListener{
            if(join_leave.text.equals("ENROLL") && !user_token.isEmpty()){

                    val apiService = learningSpace2Enroll_api_call()
                    val userInfo = learningspace2Enroll_send_model(
                        learning_space_id = learningSpaceID
                    )

                    apiService.enrollUser(userInfo) {

                        if(it?.id!=null){ // success
                            join_leave.text="LEAVE"
                            ShowContributorsAndTopics()
                        }
                        else{ // enroll is unsucess
                            Toast.makeText(this,"Unsucessful!.", Toast.LENGTH_LONG).show()
                        }

                    }
                }
            else{
                names= arrayOf("Hidden")
                contributors= arrayOf("Hidden")
                join_leave.text="ENROLL"
            }
        }

    }


    fun addContent(view: View){
        var join_leave = findViewById(R.id.join_leave) as Button
        if(join_leave.text=="LEAVE"){
            var intent= Intent(applicationContext, AddContent::class.java)
            startActivity(intent)
        }
    }

    fun goToLearningSpace3(position:Int) {
        if(names[0].equals("Hidden")){

        }
        else {
            currentContentID = contentID_ContentName[position]!!
            var intent = Intent(applicationContext, LearningSpace3::class.java)
            startActivity(intent)
        }
    }



    fun ShowContributorsAndTopics(){
        val apiService = learningSpace2GetContentList_api_call()
        val userInfo = learningSpaceID

        apiService.getContentList(userInfo) {

            if(it?.data!=null){ // success
                var receivedArr=it?.data

                contributors= arrayOf<String>()
                for (i in 0..(learningSpaceMEMBERS.size-1)){
                    contributors+= learningSpaceMEMBERS[i].name
                }

                names= arrayOf<String>()
                for(i in 0..(receivedArr.size-1)){
                    //contributors+=receivedArr[i].owner.toString()
                    names+=receivedArr[i].name.toString()
                    contentID_ContentName.put(i,receivedArr[i].id)
                }

                setContributorsAndTopics()
            }
            else{ // showing contributors is unsucess

            }

        }



    }

}