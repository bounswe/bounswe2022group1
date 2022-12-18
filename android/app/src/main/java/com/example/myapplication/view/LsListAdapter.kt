package com.example.myapplication.view

import android.app.Activity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView
import android.widget.Toast
import com.example.myapplication.R
import com.example.myapplication.model.ls_list_element
import org.w3c.dom.Text

class LsListAdapter(private val context: Activity, private val arrayList: ArrayList<ls_list_element>): ArrayAdapter<ls_list_element>(context, R.layout.ls_list_item, arrayList) {
    override fun getView(position: Int, converView: View?, parent: ViewGroup): View {

        val inflater: LayoutInflater = LayoutInflater.from(context)
        val view: View = inflater.inflate(R.layout.ls_list_item, null)

        val name: TextView = view.findViewById(R.id.lsName)
        val desc: TextView = view.findViewById(R.id.lsDescription)
        val info: TextView = view.findViewById(R.id.createdAt)

        name.text = arrayList[position].name
        desc.text = arrayList[position].desc
        info.text = arrayList[position].createdAt

        return view
    }

}