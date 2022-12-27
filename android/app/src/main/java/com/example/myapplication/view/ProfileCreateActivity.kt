package com.example.myapplication.view

import android.Manifest.permission.READ_EXTERNAL_STORAGE
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.media.Image
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.util.Base64
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.example.myapplication.R
import com.example.myapplication.model.ls_members
import com.example.myapplication.model.patch_profile_send_model
import com.example.myapplication.model.profile_edit_post_send_model
import com.example.myapplication.service.patch_profile_api_call
import com.example.myapplication.service.profile_edit_api_call
import com.google.android.material.navigation.NavigationView
import java.io.ByteArrayOutputStream


class ProfileCreateActivity : AppCompatActivity() {

    lateinit var pickMedia: ActivityResultLauncher<PickVisualMediaRequest>
    lateinit var imageView: ImageView
    var imageFinal: String=""
    lateinit var about_me: TextView
    // change here for api's - post
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profilecreate)
        imageView = findViewById(R.id.imageView2)
        imageView.setImageResource(R.drawable.blank_profile)
        pickMedia = registerForActivityResult(ActivityResultContracts.PickVisualMedia()) {
            if( it != null){
                var bitmap = MediaStore.Images.Media.getBitmap(contentResolver, it)
                var stream = ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, stream)
                var bytes = stream.toByteArray()
                // Encoded
                imageFinal = Base64.encodeToString(bytes, Base64.DEFAULT)

                var outBytes = Base64.decode(imageFinal, Base64.DEFAULT)
                var bitmap2 = BitmapFactory.decodeByteArray(outBytes,0, outBytes.size)
                imageView.setImageBitmap(bitmap2)
            }
            else {
                Log.d("pgo", "no")
            }
        }

        navMenuHandler()
    }

    private lateinit var checkmembers: MutableList<ls_members>

    lateinit var toggle: ActionBarDrawerToggle

    fun goToLearningSpace2() {
        var intent= Intent(applicationContext, LearningSpace2Menu::class.java)
        startActivity(intent)
    }

    fun editProfileButton() {
        var intent= Intent(applicationContext, ProfileCreateActivity::class.java)
        startActivity(intent)
    }

    fun editProfileButton(view: View) {
        var intent= Intent(applicationContext, ProfileCreateActivity::class.java)
        startActivity(intent)
    }

    fun toChangePassword(view: View) {
        var intent = Intent(applicationContext, ChangePasswordActivity::class.java)
        startActivity(intent)
    }

    fun logoffToLanding() {
        user_token=""
        var intent= Intent(applicationContext, LandingActivity::class.java)
        startActivity(intent)
    }
    fun toProfile() {
        var intent= Intent(applicationContext, ProfilePageActivity::class.java)
        startActivity(intent)
    }
    fun goToLearningSpace1() {
        var intent= Intent(applicationContext, LearningSpace1::class.java)
        startActivity(intent)
    }

    fun goToHomePage() {
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(toggle.onOptionsItemSelected(item)) {
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    fun navMenuHandler() {
        val string = findViewById<DrawerLayout>(R.id.drawerLayout)
        toggle = ActionBarDrawerToggle(this, string, R.string.open, R.string.close)

        string.addDrawerListener(toggle)
        toggle.syncState()

        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val string2 = findViewById<NavigationView>(R.id.navView)

        string2.setNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.profileButton -> toProfile()
                R.id.miItem1 -> goToHomePage()
                R.id.miItem2 -> {
                    selectedTAG = "Art"
                    goToLearningSpace1()
                }
                R.id.miItem3 -> {
                    selectedTAG = "Science"
                    goToLearningSpace1()
                }
                R.id.miItem4 -> {
                    selectedTAG = "Math"
                    goToLearningSpace1()
                }
                R.id.miItem5 -> {
                    selectedTAG = "Technology"
                    goToLearningSpace1()
                }
                R.id.miItem6 -> {
                    selectedTAG = "Engineering"
                    goToLearningSpace1()
                }
                R.id.signOut -> {
                    logoffToLanding()
                }
            }
            true
        }
    }

    fun goToProfile() {
        var intent= Intent(applicationContext, ProfilePageActivity::class.java)
        startActivity(intent)
    }

    fun editAboutMe(view: View){
        about_me = findViewById<TextView>(R.id.about_me)

        if(imageFinal.equals("") && about_me.text.length==0){
                Log.d("call first","update nothing")
        }
        else if(imageFinal.equals("") && about_me.text.length!=0){
            Log.d("call second","update about me")
            var apiService = patch_profile_api_call()
            var data = patch_profile_send_model(
                about_me = about_me.text.toString(),
            )
            apiService.editProfile(data) {
                goToProfile()
            }
        }
        else if(!imageFinal.equals("") && about_me.text.length==0){
            Log.d("call third","update image")
            var apiService = patch_profile_api_call()
            var data = patch_profile_send_model(
                image = imageFinal
            )
            apiService.editProfile(data) {
                goToProfile()
            }
        }
        else{
            Log.d("call fourth","update everything")

            if(hasProfile==false){
                var apiService = profile_edit_api_call()
                var data = profile_edit_post_send_model(
                    about_me = about_me.text.toString(),
                    image = imageFinal
                )
                apiService.createProfile(data) {
                    goToProfile()
                }
            }
            else{ // modify profile
                Log.d("modify profile","yes")
                var apiService = patch_profile_api_call()
                var data = patch_profile_send_model(
                    about_me = about_me.text.toString(),
                    image = imageFinal
                )
                apiService.editProfile(data) {
                    goToProfile()
                }

            }

        }

    }

    fun uploadImg(view: View) {
        pickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
    }
    fun deleteImg(view: View) {
        imageView.setImageResource(R.drawable.blank_profile)
        imageFinal = ""
    }
}