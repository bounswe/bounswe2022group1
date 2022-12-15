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
import com.example.myapplication.service.learningSpace2GetEnrolledLearningSpaces_api_call
import com.example.myapplication.service.learningSpace2Leave_api_call



var currentContentID=0
var contentID_ContentName: HashMap<Int, Int> = HashMap<Int, Int>()

class LearningSpace2 : AppCompatActivity() {
    var names = arrayOf("Yazı", "Video", "Resim", "Tartışma", "Buluşma")
    var contributors=arrayOf("Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt","Ömer Özdemir","Osman Fehmi Albayrak","Ahmet Yazıcı","Harun Erkurt")

    fun setContributorsAndTopics(){
        val namesListView = findViewById<ListView>(R.id.Topics)
        val contributorsListView = findViewById<ListView>(R.id.Owners)


        var namesAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, com.example.myapplication.R.layout.adapter_background,names
        )

        var contributorsAdapter: ArrayAdapter<String> = ArrayAdapter(
            this, com.example.myapplication.R.layout.adapter_background, contributors
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

        names= arrayOf("Hidden")
        contributors= arrayOf("Hidden")
        join_leave.text="ENROLL"
        setContributorsAndTopics()

        val apiService = learningSpace2GetEnrolledLearningSpaces_api_call()

        var isEnrolled=false
        apiService.getEnrolledSpaces() {
            if(it?.data!=null){
                for(i in 0..(it.data.size-1)){
                    Log.d("Received:"+ learningSpaceID.toString(),it.data[i].toString())
                    if(it.data[i].id== learningSpaceID){
                        join_leave.text="LEAVE"
                        ShowContributorsAndTopics()
                        break
                    }
                }
            }
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
                        //Log.d("omer enroll",it.toString())
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
                val apiService = learningSpace2Leave_api_call()
                val userInfo = learningspace2Enroll_send_model(
                    learning_space_id = learningSpaceID
                )
                apiService.leaveUser(userInfo){
                    if(it?.id!=null){

                        //update member array
                        names= arrayOf("Hidden")
                        contributors= arrayOf("Hidden")
                        join_leave.text="ENROLL"

                        setContributorsAndTopics()
                    }
                    else{ // leave did not work
                        Log.d("omer", it.toString()+" "+learningSpaceID.toString()+"adam leave edemiyo"+ user_token)

                    }
                }

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
                Log.d("showContributorsCalisiyor",".")
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