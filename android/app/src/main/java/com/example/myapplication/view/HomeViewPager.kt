package com.example.myapplication.view

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.R

class HomeViewPager(private var names: List<String>, private var descs: List<String>, private var creators: List<String>) : RecyclerView.Adapter<HomeViewPager.Pager2ViewHolder>() {

    inner class Pager2ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val itemTitle: TextView = itemView.findViewById(R.id.lsName)
        val itemDetails: TextView = itemView.findViewById(R.id.lsDescription)
        val itemImage: TextView = itemView.findViewById(R.id.createdAt)

        init {
            itemImage.setOnClickListener{ v: View ->
                val position = adapterPosition
                Toast.makeText(itemView.context, position.toString(), Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Pager2ViewHolder {
        return Pager2ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.ls_list_item, parent, false))
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