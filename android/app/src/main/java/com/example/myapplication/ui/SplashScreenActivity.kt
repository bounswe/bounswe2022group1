package com.example.myapplication.ui

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.Window
import android.view.WindowInsets
import android.view.WindowManager
import android.view.animation.AnimationUtils
import androidx.core.content.ContextCompat
import androidx.core.view.isVisible
import com.example.myapplication.R
import com.example.myapplication.databinding.ActivitySplashScreenBinding
import com.example.myapplication.manager.net.observer.NetworkObserverActivity


@SuppressLint("CustomSplashScreen")
class SplashScreenActivity : NetworkObserverActivity(), View.OnClickListener {

    private var mStartTime: Long = 0
    private lateinit var mBinding: ActivitySplashScreenBinding
    private var mSystemUIVisibility = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE)

        mBinding = ActivitySplashScreenBinding.inflate(layoutInflater)
        setContentView(mBinding.root)

        setStatusBarColor(R.color.accent)

        mSystemUIVisibility = window.decorView.systemUiVisibility

        hideEverything()

        mStartTime = System.currentTimeMillis()
        mBinding.splashToolbarBackImg.setOnClickListener(this)

        val rotateAnim = AnimationUtils.loadAnimation(this, R.anim.rotate)
        mBinding.splashScreenImgContainer.animation = rotateAnim

        goToNextPage()
    }

    private fun hideEverything() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.systemBars())
        }
        window.attributes.layoutInDisplayCutoutMode =
            WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
    }


    private fun goToNextPage() {
        if (System.currentTimeMillis() - mStartTime > 1000) {
            checkIfUserLoggedIn()
        } else {
            Handler(Looper.getMainLooper()).postDelayed({
                checkIfUserLoggedIn()
            }, 1000 - System.currentTimeMillis() + mStartTime)
        }
    }

    private fun checkIfUserLoggedIn() {
        val activity = OnboardingActivity::class.java

        startActivity(Intent(this, activity))
        finish()
    }

    fun setStatusBarColor(color: Int) {
        val colorRes = ContextCompat.getColor(this, color)
        window.statusBarColor = colorRes
    }

    fun hideToolbar() {
        setStatusBarColor(R.color.accent)
        mBinding.splashContainer.setBackgroundResource(R.drawable.gradient_splash)
        if (mBinding.splashToolbar.isVisible) {
            mBinding.splashToolbar.visibility = View.GONE
        }
    }

    override fun onClick(v: View?) {
        onBackPressed()
    }

}