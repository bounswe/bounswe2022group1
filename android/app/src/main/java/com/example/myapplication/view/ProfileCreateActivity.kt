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
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import com.example.myapplication.R
import java.io.ByteArrayOutputStream


class ProfileCreateActivity : AppCompatActivity() {

    lateinit var pickMedia: ActivityResultLauncher<PickVisualMediaRequest>
    lateinit var imageView: ImageView
    lateinit var imageFinal: String
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

    fun uploadImg(view: View) {
        pickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
    }
    fun deleteImg(view: View) {
        imageView.setImageResource(R.drawable.blank_profile)
        imageFinal = ""
    }

    /*
    fun editAboutMe(view: View){

        val _about_me = findViewById(R.id.about_me) as EditText
        val apiService = profile_edit_api_call()
        val userInfo = profile_edit_post_send_model(
            about_me = _about_me.text.toString())

        apiService.createProfile(userInfo) {

            val success_message_profile=findViewById(R.id.success_message_profile) as TextView
            success_message_profile.setVisibility(View.VISIBLE)
            success_message_profile.text="Edit is successful!\n You are redirected to profile page"
            success_message_profile.postDelayed({success_message_profile.setVisibility(View.INVISIBLE)},2000)
            success_message_profile.postDelayed({goToProfile()},2000)


        }

    }
    */
}