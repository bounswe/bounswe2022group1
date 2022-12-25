
package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem

import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.widget.SearchView
import androidx.drawerlayout.widget.DrawerLayout
import androidx.viewpager2.widget.ViewPager2
import com.example.myapplication.R
import com.example.myapplication.model.favorite_ls
import com.example.myapplication.model.ls_list_element
import com.example.myapplication.model.ls_members
import com.example.myapplication.service.favorite_ls_call
import com.example.myapplication.service.learningSpace2ListEveryLearningSpace_api_call
import com.example.myapplication.service.user_from_id_api_call
import com.google.android.material.navigation.NavigationView
import me.relex.circleindicator.CircleIndicator3
import org.w3c.dom.Text

var selectedTAG = ""
var learningSpaceID_Name=mutableMapOf<Int,String>()
var learningSpaceName_ID= mutableMapOf<String,Int>()

class HomeActivity : AppCompatActivity() {

    fun initID_Name(){

        val apiService = learningSpace2ListEveryLearningSpace_api_call()
        apiService.listEverySpace () {

            if (it?.data != null) {
                for (i in 0..(it.data.size - 1)) {
                    learningSpaceName_ID[it.data[i].name]=it.data[i].id
                    learningSpaceID_Name[it.data[i].id]=it.data[i].name
                }
            }
            else{ // error for API

            }
        }
    }

    lateinit var toggle: ActionBarDrawerToggle

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        initID_Name()

        Log.d("user_token", user_token)

        var welcome_text=findViewById<TextView>(R.id.welcome_text)
        welcome_text.setSelected(true)

        val searchView = findViewById<SearchView>(R.id.search)
        searchView.setOnQueryTextFocusChangeListener{ v, b->
            if(b) {
                goToSearch()
            }
            searchView.clearFocus()
        }

        navMenuHandler()

        var names = ArrayList<String>()
        var descs = ArrayList<String>()
        var creators = ArrayList<String>()
        var ids = ArrayList<Int>()
        var members = mutableListOf<ls_members>()
        /*
        names += "Embedded Systems"
        descs += "Hardware Course"
        creators += "24.12.2022 by quanex1"
        names += "omer"
        descs += "ozde"
        creators += "213213"
*/
        val apiService = favorite_ls_call()
        apiService.favoriteLSpaces("Token " + user_token) {
            it?.data?.forEach {
                names += it.learningSpace.name
                descs += it.learningSpace.description
                creators += it.learningSpace.created_on.substring(0, 10) + " by " + it.learningSpace.ls_owner.name
                ids += it.learningSpace.id
                it.learningSpace.members.forEach {
                    members.add(it)
                }
                /*names.put(it.id, it.name)
                ids.add(it.id)
                spaceValues.add(it.name)

                var desc = it.description
                if (it.description == null) {
                    desc = ""
                }
                val element = ls_list_element(
                    it.name,
                    desc,
                    it.created_on.substring(0, 10) + " by ",
                    it.ls_owner.name
                )
                lsArrayList.add(element)

                it.members.forEach { el ->
                    currentMembers.add(el)
                }
                members.add(currentMembers.toMutableList())
                currentMembers.clear()
                */
            }
            val view_pager2 = findViewById<ViewPager2>(R.id.viewPager2)
            val context = applicationContext

            view_pager2.adapter = HomeViewPager(names, descs, creators, ids, members, context)
            //view_pager2.adapter = ViewPager2.ORIENTATION_HORIZONTAL

            val indicator = findViewById<CircleIndicator3>(R.id.indicator)
            indicator.setViewPager(view_pager2)
        }

    }



    fun signInToSignIn() {
        var intent= Intent(applicationContext, SignInActivity::class.java)
        startActivity(intent)
    }
    fun goToSearch() {
        var intent= Intent(applicationContext, LsSearchActivity::class.java)
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
}
