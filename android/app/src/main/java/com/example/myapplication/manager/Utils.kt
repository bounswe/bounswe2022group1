package com.example.myapplication.manager

import android.content.*
import android.util.TypedValue


object Utils {

    @JvmStatic
    fun changeDpToPx(context: Context, `val`: Float): Float {
        return TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP,
            `val`,
            context.resources.displayMetrics
        )
    }
}