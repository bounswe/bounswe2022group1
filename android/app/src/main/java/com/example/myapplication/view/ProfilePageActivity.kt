package com.example.myapplication.view

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.widget.*
import com.example.myapplication.R
import com.example.myapplication.model.ls_list_element
import com.example.myapplication.model.ls_members
import com.example.myapplication.service.learningSpace2ListEveryLearningSpace_api_call
import com.example.myapplication.service.ls_by_tag_call
import com.example.myapplication.service.profile_see_api_call
import java.io.File
import java.io.FileOutputStream
import java.util.concurrent.Executors


class ProfilePageActivity : AppCompatActivity() {

    lateinit var imgView: ImageView
    lateinit var imageUri: Uri
    // change here for api's

    lateinit var enroll_list:MutableList<String>

    fun init_image(imageURL:String){
        // Declaring and initializing the ImageView
        val imageView = findViewById<ImageView>(R.id.imageView)

        // Declaring executor to parse the URL
        val executor = Executors.newSingleThreadExecutor()

        // Once the executor parses the URL
        // and receives the image, handler will load it
        // in the ImageView
        val handler = Handler(Looper.getMainLooper())

        // Initializing the image
        var image: Bitmap? = null

        // Only for Background process (can take time depending on the Internet speed)
        executor.execute {

            // Image URL
            //val imageURL = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png"

            // Tries to get the image and post it in the ImageView
            // with the help of Handler
            try {
                val `in` = java.net.URL(imageURL).openStream()
                image = BitmapFactory.decodeStream(`in`)

                // Only for making changes in UI
                handler.post {
                    imageView.setImageBitmap(image)
                }
            }

            // If the URL doesnot point to
            // image or any other kind of failure
            catch (e: Exception) {
                e.printStackTrace()
            }
        }

    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profilepage)




        val apiService = profile_see_api_call()
        apiService.getProfile("Token " + user_token) {
            var _about_me = findViewById(R.id.seeAboutMe) as TextView
            _about_me.text=it?.about_me

            var hello_message = findViewById(R.id.hello_message) as TextView
            hello_message.text="Hello, "+it?.user?.username

            var _email = findViewById(R.id.seeEmail) as TextView
            _email.text=it?.user?.email


            var user_id = findViewById(R.id.seeID) as TextView
            user_id.text=it?.user?.id.toString()

            init_image("http://3.89.218.253:8000/"+it?.image.toString())
            Log.d("omer_baba",it?.image.toString())

                enroll_list= mutableListOf<String>()
                enroll_list.add("Click to see")
                it?.learningspaces?.forEach {
                    enroll_list.add(learningSpaceID_Name[it].toString())
                }


                val enrollListView = findViewById<Spinner>(R.id.enrolled_list)

                var enrollAdapter: ArrayAdapter<String> = ArrayAdapter(
                    this, R.layout.adapter_background, enroll_list
                )

                enrollListView.adapter = enrollAdapter

            enrollListView.setSelection(0)
            enrollListView.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {

                override fun onNothingSelected(parent: AdapterView<*>?) {

                }

                override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {

                    var space_name=enrollListView.selectedItem.toString()
                    if(!space_name.equals(enroll_list.get(0))){
                        learningSpaceID = learningSpaceName_ID[space_name]!!
                        learningSpaceNAME = space_name

                        val apiService =learningSpace2ListEveryLearningSpace_api_call()
                        learningSpaceMEMBERS.clear()
                        apiService.listEverySpace  {
                            it?.data?.forEach{
                                if(it.id== learningSpaceID){
                                    it.members.forEach {
                                        learningSpaceMEMBERS.add(it)
                                    }
                                }
                            }

                        }
                        goToLearningSpace2()
                    }

                }

            }


        }


        val profileEditButtonClicked = findViewById<Button>(R.id.editProfile)
        profileEditButtonClicked.setOnClickListener{
            editProfileButton()
        }
    }

    fun goToLearningSpace2() {
        var intent= Intent(applicationContext, LearningSpace2Menu::class.java)
        startActivity(intent)
    }

    fun editProfileButton() {
        var intent= Intent(applicationContext, ProfileCreateActivity::class.java)
        startActivity(intent)
    }

    fun toChangePassword(view: View) {
        var intent = Intent(applicationContext, ChangePasswordActivity::class.java)
        startActivity(intent)
    }
}