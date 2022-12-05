package com.example.myapplication.view

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ArrayAdapter
import android.widget.EditText
import android.widget.ListView

import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.R
import com.example.myapplication.model.ls_create_model
import com.example.myapplication.service.ls_by_tag_call
import com.example.myapplication.service.ls_create_call

var learningSpaceID = 0
var learningSpaceNAME = ""

class LearningSpace1 : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.learning_space_1)

        val listView = findViewById<ListView>(R.id.Topics)
        val apiService = ls_by_tag_call()

        val names: HashMap<Int, String> = HashMap<Int, String>()

        val ids = mutableListOf<Int>()
        val spaceValues = mutableListOf<String>()
        apiService.getLSpaces(selectedTAG, "Token " + user_token)  {

            it?.data?.forEach {
                names.put(it.id, it.name)
                ids.add(it.id)
                spaceValues.add(it.name)
            }

            //Toast.makeText(this, names.toString(), Toast.LENGTH_LONG).show()

            val spaceNames: MutableList<String> = ArrayList()
            names.values.forEach{
                spaceNames.add(it)
            }

            val arrayAdapter: ArrayAdapter<String> = ArrayAdapter(
                this, android.R.layout.simple_list_item_1, spaceNames
            )

            listView.adapter = arrayAdapter

            listView.setOnItemClickListener { adapterView, view, i, l ->
                learningSpaceID = ids[i]
                learningSpaceNAME = spaceValues[i]
                goToLearningSpace2()
            }
        }
    }


    fun goToLearningSpace2() {
        var intent= Intent(applicationContext, LearningSpace2::class.java)
        startActivity(intent)
    }

    fun goToLearningSpace1() {
        var intent= Intent(applicationContext, LearningSpace1::class.java)
        startActivity(intent)
    }

    fun showDialog(view: View) {
        val builder = AlertDialog.Builder(this)
        val inflater = layoutInflater
        val dialogLayout = inflater.inflate(R.layout.add_learning_space, null)
        val editText = dialogLayout.findViewById<EditText>(R.id.ls_editText)

        with(builder) {
            setTitle("Create Learning Space")
            setPositiveButton("Confirm"){ dialog, which ->
                val apiService = ls_create_call()

                val newSpace = ls_create_model(
                    name = editText.text.toString(),
                    tag = selectedTAG
                )

                apiService.createLSpace(newSpace, "Token " + user_token)  {
                    if(it?.tag!=null){
                        finish();
                        startActivity(getIntent());
                    }
                    else{
                        //Toast.makeText(this, "An error occured", Toast.LENGTH_LONG).show()
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
}