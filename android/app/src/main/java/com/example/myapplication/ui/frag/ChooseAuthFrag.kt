package com.example.myapplication.ui.frag

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.myapplication.R
import com.example.myapplication.databinding.ChooseAuthFragBinding
import com.example.myapplication.manager.PrefManager
import com.example.myapplication.view.HomeActivity
import com.example.myapplication.view.SignInActivity
import com.example.myapplication.view.SignUpActivity

class ChooseAuthFrag : Fragment(), View.OnClickListener {

    private lateinit var mBinding: ChooseAuthFragBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        mBinding = ChooseAuthFragBinding.inflate(inflater, container, false)
        return mBinding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        init()
    }

    private fun init() {
        mBinding.signInBtn.setOnClickListener(this)
        mBinding.signUpBtn.setOnClickListener(this)
        mBinding.skipLoginBtn.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.signInBtn -> {
                signIn()
            }

            R.id.signUpBtn -> {
                signUp()
            }

            R.id.skipLoginBtn -> {
                val prefManager = PrefManager(requireContext())
                prefManager.skipLogin = true

                val intent = Intent(requireContext(), HomeActivity::class.java)

                startActivity(intent)
                activity?.finish()
            }
        }
    }

    private fun signUp() {
        val intent = Intent(requireContext(), SignUpActivity::class.java)
        startActivity(intent)
    }

    private fun signIn() {
        val intent = Intent(requireContext(), SignInActivity::class.java)
        startActivity(intent)
    }

}