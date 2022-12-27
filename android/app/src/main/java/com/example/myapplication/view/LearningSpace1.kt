package com.example.myapplication.view

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.ArrayAdapter
import android.widget.EditText
import android.widget.ListView

import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.example.myapplication.R
import com.example.myapplication.databinding.LearningSpace1Binding
import com.example.myapplication.model.list_elements
import com.example.myapplication.model.ls_create_model
import com.example.myapplication.model.ls_list_element
import com.example.myapplication.model.ls_members
import com.example.myapplication.service.ls_by_tag_call
import com.example.myapplication.service.ls_create_call
import com.google.android.material.navigation.NavigationView

var learningSpaceID = 0
var learningSpaceNAME = ""
var learningSpaceMEMBERS = mutableListOf<ls_members>()

class LearningSpace1 : AppCompatActivity() {

    private lateinit var binding: LearningSpace1Binding
    private lateinit var lsArrayList: ArrayList<ls_list_element>
    lateinit var toggle: ActionBarDrawerToggle

    fun goToLearningSpace2() {
        var intent= Intent(applicationContext, LearningSpace2Menu::class.java)
        startActivity(intent)
    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.learning_space_1)

        binding = LearningSpace1Binding.inflate(layoutInflater)
        setContentView(binding.root)
        navMenuHandler()
        lsArrayList = ArrayList()
        val list = ls_list_element("Osman", "123231", "dasads", "3421")

        val apiService = ls_by_tag_call()

        val names: HashMap<Int, String> = HashMap<Int, String>()

        val ids = mutableListOf<Int>()
        val spaceValues = mutableListOf<String>()
        val currentMembers = mutableListOf<ls_members>()
        val members = mutableListOf<MutableList<ls_members>>()
        learningSpaceMEMBERS.clear()
        apiService.getLSpaces(selectedTAG, "Token " + user_token) {
            it?.data?.forEach {
                names.put(it.id, it.name)
                ids.add(it.id)
                spaceValues.add(it.name)

                var desc = it.description
                if(it.description == null) {
                    desc = ""
                }
                val element = ls_list_element(it.name, desc, it.created_on.substring(0, 10) + " by ", it.ls_owner.name)
                lsArrayList.add(element)

                it.members.forEach { el ->
                    currentMembers.add(el)
                }
                members.add(currentMembers.toMutableList())
                currentMembers.clear()
            }

            val spaceNames: MutableList<String> = ArrayList()
            names.values.forEach {
                spaceNames.add(it)
            }

            binding.Topics.isClickable = true
            binding.Topics.adapter = LsListAdapter(this, lsArrayList)
            binding.Topics.setOnItemClickListener { parent, view, position, id ->
                learningSpaceID = ids[position]
                learningSpaceNAME = spaceValues[position]
                learningSpaceMEMBERS.clear()
                learningSpaceMEMBERS = members[position].toMutableList()
                //Toast.makeText(this, learningSpaceMEMBERS.toString(), Toast.LENGTH_LONG).show()
                goToLearningSpace2()
            }

        }

    }


    fun goToLearningSpace1() {
        var intent= Intent(applicationContext, LearningSpace1::class.java)
        startActivity(intent)
    }

    fun showDialog(view: View) {
        val builder = AlertDialog.Builder(this)
        val inflater = layoutInflater
        val dialogLayout = inflater.inflate(R.layout.add_learning_space, null)
        val editText = dialogLayout.findViewById<EditText>(R.id.ls_editText2)
        val editText2 = dialogLayout.findViewById<EditText>(R.id.ls_editText)
        with(builder) {
            setTitle("Create Learning Space")
            setPositiveButton("Confirm"){ dialog, which ->
                val apiService = ls_create_call()

                val newSpace = ls_create_model(
                    name = editText.text.toString(),
                    description = editText2.text.toString(),
                    tag = selectedTAG
                )

                apiService.createLSpace(newSpace, "Token " + user_token)  {
                    if(it?.tag!=null){
                        finish();
                        startActivity(getIntent());
                    }
                    else{
                    }
                }
            }
            setNegativeButton("Cancel") {dialog, which ->
                Log.d("Main", "osman")
            }
            setView(dialogLayout)
            show()
        }

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


    fun logoffToLanding() {
        user_token=""
        var intent= Intent(applicationContext, LandingActivity::class.java)
        startActivity(intent)
    }
    fun toProfile() {
        var intent= Intent(applicationContext, ProfilePageActivity::class.java)
        startActivity(intent)
    }

    fun goToHomePage() {
        var intent= Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)
    }
}