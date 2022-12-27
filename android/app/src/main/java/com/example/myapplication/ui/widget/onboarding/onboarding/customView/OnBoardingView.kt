package com.example.myapplication.ui.widget.onboarding.onboarding.customView

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.text.TextUtils
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.widget.FrameLayout
import androidx.core.view.get
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.example.myapplication.R
import com.example.myapplication.databinding.OnboardingViewBinding
import com.example.myapplication.manager.PrefManager
import com.example.myapplication.manager.Utils
import com.example.myapplication.ui.widget.onboarding.onboarding.OnBoardingPagerAdapter
import com.example.myapplication.ui.widget.onboarding.onboarding.entity.OnBoardingPage
import com.tbuonomo.viewpagerdotsindicator.WormDotsIndicator
import com.example.myapplication.ui.widget.onboarding.core.setParallaxTransformation
import com.example.myapplication.view.SignInActivity

import java.util.*


class OnBoardingView @JvmOverloads
constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
    defStyleRes: Int = 0
) :
    FrameLayout(context, attrs, defStyleAttr, defStyleRes) {

    // This property is only valid between onCreateView and onDestroyView.
    private var binding: OnboardingViewBinding = OnboardingViewBinding.inflate(
        LayoutInflater.from(context), this, true
    )
    private val numberOfPages by lazy { OnBoardingPage.values().size }
    private val prefManager: PrefManager

    init {
        setUpSlider(binding.root)
        addingButtonsClickListeners()
        prefManager = PrefManager(context)

        val isRTL =
            TextUtils.getLayoutDirectionFromLocale(Locale.getDefault()) == View.LAYOUT_DIRECTION_RTL
        if (isRTL) {
            val endConstraintSet = binding.onboardingRoot.getConstraintSet(R.id.end)

            val skipConstraint = endConstraintSet.getConstraint(R.id.onboardingPageSkipBtn)
            skipConstraint.transform.translationX = Utils.changeDpToPx(context, 100f)

            val nextConstraint = endConstraintSet.getConstraint(R.id.onboardingPageNextBtn)
            nextConstraint.transform.translationX = Utils.changeDpToPx(context, -100f)
        }
    }

    private fun setUpSlider(view: View) {
        with(binding.onboardingPageViewPager) {
            adapter = OnBoardingPagerAdapter()
            setPageTransformer { page, position ->
                setParallaxTransformation(page, R.id.onboardingItemLottie, position)
            }

            addSlideChangeListener()

            val indicator = view.findViewById<WormDotsIndicator>(R.id.onboardingPageIndicator)
            indicator.setViewPager2(this)
        }
    }

    private fun addSlideChangeListener() {
        binding.onboardingPageViewPager.registerOnPageChangeCallback(object :
            ViewPager2.OnPageChangeCallback() {

            override fun onPageScrolled(
                position: Int,
                positionOffset: Float,
                positionOffsetPixels: Int
            ) {
                if (numberOfPages > 1) {
                    val newProgress = (position + positionOffset) / (numberOfPages - 1)
                    binding.onboardingRoot.progress = newProgress

                    val view =
                        (binding.onboardingPageViewPager[0] as RecyclerView).findViewHolderForAdapterPosition(
                            position
                        )?.itemView
                    view?.alpha = 1 - positionOffset
                }
            }

        })
    }

    private fun addingButtonsClickListeners() {
        binding.onboardingPageNextBtn.setOnClickListener {
            navigateToNextSlide()
        }
        binding.onboardingPageSkipBtn.setOnClickListener {
            setFirstTimeLaunchToFalse()
        }
        binding.onboardingPageStartBtn.setOnClickListener {
            setFirstTimeLaunchToFalse()
        }
    }

    private fun setFirstTimeLaunchToFalse() {
        prefManager.isFirstTimeLaunch = false
        startSignInUpFrag()
    }

    private fun startSignInUpFrag() {
        context.startActivity(Intent(context, SignInActivity::class.java))
        (context as Activity).finish()
    }

    private fun navigateToNextSlide() {
        val nextSlidePos: Int = binding.onboardingPageViewPager.currentItem.plus(1)
        binding.onboardingPageViewPager.setCurrentItem(nextSlidePos, true)
    }
}