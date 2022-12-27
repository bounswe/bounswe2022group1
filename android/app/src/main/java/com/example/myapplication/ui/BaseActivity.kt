package com.example.myapplication.ui

import android.content.Context
import androidx.appcompat.app.AppCompatActivity

open class BaseActivity : AppCompatActivity() {

    override fun attachBaseContext(newBase: Context?) {
        try {
            super.attachBaseContext(newBase)
        } catch (ex: NullPointerException) {
            try {
                super.attachBaseContext(newBase)
            } catch (_: NullPointerException) {
            }
        }
    }
}