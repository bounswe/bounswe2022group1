package com.example.myapplication.view

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.R
import com.example.myapplication.model.ls_members

class HomeViewPager(private var names: List<String>, private var descs: List<String>, private var creators: List<String>, private var ids: List<Int>, private var members: MutableList<ls_members>, private var context: Context) : RecyclerView.Adapter<HomeViewPager.Pager2ViewHolder>() {

    inner class Pager2ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val itemTitle: TextView = itemView.findViewById(R.id.lsName)
        val itemDetails: TextView = itemView.findViewById(R.id.lsDescription)
        val itemImage: TextView = itemView.findViewById(R.id.createdAt)

        init {
            itemView.setOnClickListener{
                val position = adapterPosition
                learningSpaceNAME = names[position].toString()
                learningSpaceID = ids[position]
                learningSpaceMEMBERS = members

                var intent= Intent(context, LearningSpace2Menu::class.java)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Pager2ViewHolder {
        return Pager2ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.favorite_ls_item, parent, false))
    }

    override fun getItemCount(): Int {
        return names.size
    }

    override fun onBindViewHolder(holder: Pager2ViewHolder, position: Int) {
        holder.itemTitle.text = names[position]
        holder.itemDetails.text = descs[position]
        holder.itemImage.text = creators[position]
    }

}