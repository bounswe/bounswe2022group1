package com.example.myapplication.view

import android.os.Bundle
import com.example.myapplication.databinding.ActivityLandingBinding
import com.example.myapplication.ui.BaseActivity
import com.example.myapplication.ui.frag.ChooseAuthFrag

class LandingActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding = ActivityLandingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val bundle = Bundle()

        val frag = ChooseAuthFrag()
        frag.arguments = bundle

        supportFragmentManager.beginTransaction().replace(android.R.id.content, frag).commit()
    }
}