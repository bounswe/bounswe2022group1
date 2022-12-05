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

val enrolledLearningSpaceIds=mutableSetOf<Int>()

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

        if(enrolledLearningSpaceIds.contains(learningSpaceID)){
            join_leave.text="Leave"
        }
        else{
            join_leave.text="Enroll"
            names= arrayOf("Hidden")
            contributors= arrayOf("Hidden")
        }

        var learning_topic = findViewById(R.id.learning_topic) as TextView
        setContributorsAndTopics()
    }



    fun addContent(view: View){
        var intent= Intent(applicationContext, AddContent::class.java)
        startActivity(intent)
    }

    fun enroll(view :View){
            var join_leave = findViewById(R.id.join_leave) as Button

            if(join_leave.text=="Leave"){
                join_leave.text="Enroll"
                names= arrayOf("Hidden")
                contributors= arrayOf("Hidden")
                enrolledLearningSpaceIds.remove(learningSpaceID)
            }

            else if(join_leave.text=="Enroll" && !enrolledLearningSpaceIds.contains(learningSpaceID) ){
                if(!user_token.isEmpty()){
                    join_leave.text="Leave"

                    val apiService = learningSpace2Enroll_api_call()
                    val userInfo = learningspace2Enroll_send_model(
                        learning_space_id = learningSpaceID
                    )

                    apiService.enrollUser(userInfo) {

                        if(it?.id!=null){ // success
                            //enrolledLearningSpaceIds.add(it?.id)

                            ShowContributorsAndTopics()

                            // it?.id id of the learning space
                            // it?.name name of the learning space
                            //it?.members [ {"id": id of the user, "username": "username of the user", "email": "email of the user" } ]
                        }
                        else{ // enroll is unsucess
                            Toast.makeText(this,"Unsucess!.", Toast.LENGTH_LONG).show()
                        }

                    }

                }

            }
        setContributorsAndTopics()
    }


    fun goToLearningSpace3(position:Int) {
        if(names[0].equals("Hidden")){
            Log.d("omer_ababa","selam")
        }
        else {

            currentContentID = contentID_ContentName[position-1]!!
            Log.d("omer_baba_deneme", currentContentID.toString())
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

                //enrolledLearningSpaceIds.add(receivedMap.id)

                contributors= arrayOf("")
                names= arrayOf("")
                for(i in 0..(receivedArr.size-1)){
                    contributors+=receivedArr[i].owner.toString()
                    names+=receivedArr[i].name.toString()
                    contentID_ContentName.put(i,receivedArr[i].id)
                }

                setContributorsAndTopics()

                // it?.id id of the learning space
                // it?.name name of the learning space
                //it?.members [ {"id": id of the user, "username": "username of the user", "email": "email of the user" } ]
            }
            else{ // showing contributors is unsucess

            }

        }



    }

}