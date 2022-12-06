package com.example.myapplication.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.ListView
import androidx.appcompat.widget.SearchView

import com.example.myapplication.R
import com.example.myapplication.model.ls_members
import com.example.myapplication.service.ls_search_api_call

class LsSearchActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ls_search)

        val searchView = findViewById<SearchView>(R.id.searchView)
        searchView.requestFocus()
        val listView = findViewById<ListView>(R.id.recyclerView)

        val names: HashMap<Int, String> = HashMap<Int, String>()

        val ids = mutableListOf<Int>()
        val spaceValues = mutableListOf<String>()
        val currentMembers = mutableListOf<ls_members>()
        val members = mutableListOf<MutableList<ls_members>>()
        learningSpaceMEMBERS.clear()

        val apiService = ls_search_api_call()
        val spaceNames = mutableListOf<String>()

        val context = this


        val arrayAdapter: ArrayAdapter<String> = ArrayAdapter(
            context, android.R.layout.simple_list_item_1, spaceNames
        )

        listView.adapter = arrayAdapter
        searchView.setOnQueryTextListener(object: SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                if(query==null) { return false }
                apiService.getLSpacesBySearch(query!!, "Token " + user_token)  {
                    spaceNames.clear()
                    names.clear()
                    ids.clear()
                    spaceValues.clear()
                    members.clear()
                    it?.data?.forEach {
                        names.put(it.id, it.name)
                        ids.add(it.id)
                        spaceValues.add(it.name)
                        it.members.forEach { el ->
                            currentMembers.add(el)
                        }
                        members.add(currentMembers.toMutableList())
                        currentMembers.clear()
                    }
                    Log.d("osman", spaceNames.toString())
                    names.values.forEach{
                        spaceNames.add(it)
                    }

                    val arrayAdapter: ArrayAdapter<String> = ArrayAdapter(
                        context, android.R.layout.simple_list_item_1, spaceNames
                    )

                    listView.adapter = arrayAdapter
                    listView.setOnItemClickListener { adapterView, view, i, l ->
                        learningSpaceID = ids[i]
                        learningSpaceNAME = spaceValues[i]
                        learningSpaceMEMBERS.clear()
                        learningSpaceMEMBERS = members[i].toMutableList()
                        Log.d("lID", learningSpaceID.toString())
                        Log.d("lname", learningSpaceNAME.toString())
                        Log.d("lmem", learningSpaceMEMBERS.toString())
                        toLearningSpace2()
                    }
                }
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {


                return false
            }
        })


    }
    fun toLearningSpace2() {
        var intent= Intent(applicationContext, LearningSpace2::class.java)
        startActivity(intent)
    }
}