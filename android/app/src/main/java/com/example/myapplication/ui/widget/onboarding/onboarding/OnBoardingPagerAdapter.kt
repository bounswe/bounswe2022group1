package com.example.myapplication.ui.widget.onboarding.onboarding

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.databinding.OnboardingPageItemBinding
import com.example.myapplication.ui.widget.onboarding.onboarding.entity.OnBoardingPage


class OnBoardingPagerAdapter(
    private val onBoardingPageList: Array<OnBoardingPage> = OnBoardingPage.values()
) : RecyclerView.Adapter<PagerViewHolder>() {

    // This property is only valid between onCreateView and onDestroyView.
    private lateinit var binding: OnboardingPageItemBinding

    override fun onCreateViewHolder(parent: ViewGroup, p1: Int): PagerViewHolder {
        binding = OnboardingPageItemBinding.inflate(
            LayoutInflater.from(parent.context), parent, false
        )
        return PagerViewHolder(binding.root)
    }

    override fun getItemCount() = onBoardingPageList.size

    override fun onBindViewHolder(holder: PagerViewHolder, position: Int) {
        val onBoardingPage = onBoardingPageList[position]

        val context = holder.itemView.context
        binding.onboardingItemTitleTv.text = context.getString(onBoardingPage.titleResource)
        binding.onboardingItemDescTv.text = context.getString(onBoardingPage.descriptionResource)
//        root.img.setImageResource(onBoardingPage.logoResource)
        binding.onboardingItemLottie.setAnimation(onBoardingPage.lottieResource)
    }
}

class PagerViewHolder(root: View) : RecyclerView.ViewHolder(root)