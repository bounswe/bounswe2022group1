
package com.example.myapplication.view

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SearchView
import androidx.drawerlayout.widget.DrawerLayout
import androidx.viewpager2.widget.ViewPager2
import com.example.myapplication.R
import com.example.myapplication.model.ls_members
import com.example.myapplication.service.*
import com.google.android.material.navigation.NavigationView
import me.relex.circleindicator.CircleIndicator3

var selectedTAG = ""
var learningSpaceID_Name=mutableMapOf<Int,String>()
var learningSpaceName_ID= mutableMapOf<String,Int>()
var id_of_current_user=-1
var content_id=-1
var votedContents= mutableSetOf<Int>()


class HomeActivity : AppCompatActivity() {

    override fun onRestart() {
        super.onRestart()
        finish()
        startActivity(intent)
    }
    private lateinit var checkmembers: MutableList<ls_members>
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
    private lateinit var names: Array<String>

    fun idInit(){
        val apiService = id_from_username_api_call()
        apiService.IDfromUsername(user_name) {
            if(it!=null)id_of_current_user=it.id
        }
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        idInit()
        initID_Name()
        learningSpaceID = -1
        val context1 = this
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

        names = arrayOf()
        navMenuHandler()

        var names = ArrayList<String>()
        var descs = ArrayList<String>()
        var creators = ArrayList<String>()
        var ids = ArrayList<Int>()
        var members = mutableListOf<ls_members>()
        var membersList = mutableListOf<MutableList<ls_members>>()
        checkmembers = mutableListOf<ls_members>()
        val apiService = favorite_ls_call()
        apiService.favoriteLSpaces("Token " + user_token) {
            it?.data?.forEach {
                names += it.learningSpace.name
                descs += it.learningSpace.description
                creators += it.learningSpace.created_on.substring(0, 10) + " by " + it.learningSpace.ls_owner.name
                ids += it.learningSpace.id
                it.learningSpace.members.forEach {
                    members.add(it)
                    checkmembers.add(it)
                }
                membersList.add(members.toMutableList())
                members.clear()
            }

            val view_pager2 = findViewById<ViewPager2>(R.id.viewPager2)
            val context = applicationContext
            if(names.size == 0) {
                view_pager2.adapter = HomeViewPager(
                    listOf("Empty"),
                    listOf("There are no favourite learning spaces"),
                    listOf(""),
                    listOf(),
                    mutableListOf(),
                    context
                )
                val indicator = findViewById<CircleIndicator3>(R.id.indicator)
                indicator.setViewPager(view_pager2)
                view_pager2.registerOnPageChangeCallback(object: ViewPager2.OnPageChangeCallback() {
                    override fun onPageScrolled(
                        position: Int,
                        positionOffset: Float,
                        positionOffsetPixels: Int
                    ) {
                        super.onPageScrolled(position, positionOffset, positionOffsetPixels)
                    }

                    override fun onPageSelected(position: Int) {
                        super.onPageSelected(position)
                    }

                    override fun onPageScrollStateChanged(state: Int) {
                        super.onPageScrollStateChanged(state)
                    }
                })
                ShowContributorsAndTopics()

            }
            else {
                view_pager2.adapter = HomeViewPager(names, descs, creators, ids, membersList, context)
                //view_pager2.adapter = ViewPager2.ORIENTATION_HORIZONTAL

                val indicator = findViewById<CircleIndicator3>(R.id.indicator)
                indicator.setViewPager(view_pager2)
                view_pager2.registerOnPageChangeCallback(object: ViewPager2.OnPageChangeCallback() {
                    override fun onPageScrolled(
                        position: Int,
                        positionOffset: Float,
                        positionOffsetPixels: Int
                    ) {
                        super.onPageScrolled(position, positionOffset, positionOffsetPixels)
                    }

                    override fun onPageSelected(position: Int) {
                        super.onPageSelected(position)
                        learningSpaceID = ids[position]
                        learningSpaceMEMBERS = checkmembers
                        ShowContributorsAndTopics()
                    }

                    override fun onPageScrollStateChanged(state: Int) {
                        super.onPageScrollStateChanged(state)
                    }
                })
            }

        }



    }

    fun ShowContributorsAndTopics(){


        val apiService = learningSpace2GetContentList_api_call()
        val userInfo = learningSpaceID

        apiService.getContentList(userInfo) {

            if(it?.data!=null){ // success
                var receivedArr=it?.data

                names= arrayOf<String>()
                for(i in 0..(receivedArr.size-1)){

                    var owner_name="Ömer Özdemir"
                    checkmembers.forEach{
                            l->
                        if(l.id==receivedArr[i].owner){
                            owner_name=l.name
                        }
                    }

                    names+="Topic: "+receivedArr[i].name.toString()+"\n"+"Owner:"+owner_name+
                            "   Votes:"+receivedArr[i].upVoteCount+
                            "\n"
                    contentID_ContentName.put(i,receivedArr[i].id)
                }

                setContributorsAndTopics()
            }
            else{ // showing contributors is unsucess
                setContributorsAndTopics()

            }

        }
    }

    fun setContributorsAndTopics(){
        val namesListView = findViewById<ListView>(R.id.resources)
        if(names.size == 0) {
            var namesAdapter: ArrayAdapter<String> = ArrayAdapter(
                this, R.layout.adapter_background, listOf("There are no resource")
            )

            namesListView.adapter=namesAdapter
        }
        else {
            var namesAdapter: ArrayAdapter<String> = ArrayAdapter(
                this, R.layout.adapter_background,names
            )

            namesListView.adapter=namesAdapter

            namesListView.setOnItemClickListener { parent, view, position, id ->
                goToLearningSpace3(position)
            }
        }

    }

    fun goToLearningSpace3(position:Int) {
        learningSpaceMEMBERS = checkmembers
        content_id = contentID_ContentName[position]!!
        var intent = Intent(applicationContext, LearningSpace3::class.java)
        startActivity(intent)
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
