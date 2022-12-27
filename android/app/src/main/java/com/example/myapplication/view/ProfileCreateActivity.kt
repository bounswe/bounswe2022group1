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
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import com.example.myapplication.R
import com.example.myapplication.model.patch_profile_send_model
import com.example.myapplication.model.profile_edit_post_send_model
import com.example.myapplication.service.patch_profile_api_call
import com.example.myapplication.service.profile_edit_api_call
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