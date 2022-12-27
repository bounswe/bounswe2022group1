package com.example.myapplication.ui.widget.onboarding.onboarding.entity

import androidx.annotation.RawRes
import androidx.annotation.StringRes
import com.example.myapplication.R

enum class OnBoardingPage(
    @StringRes val titleResource: Int,
    @StringRes val descriptionResource: Int,
    @RawRes val lottieResource: Int
) {

    FIRST(
        R.string.onboarding_slide1_title,
        R.string.onboarding_slide1_desc,
        R.raw.onboarding1
    ),
    SECOND(
        R.string.onboarding_slide2_title,
        R.string.onboarding_slide2_desc,
        R.raw.onboarding2
    ),
    THIRD(
        R.string.onboarding_slide3_title,
        R.string.onboarding_slide3_desc,
        R.raw.onboarding3
    )

}