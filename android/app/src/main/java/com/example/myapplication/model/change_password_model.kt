
package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class change_password_model (
    @SerializedName("old_pass")
    val old_pass:String,
    @SerializedName("new_pass")
    val new_pass:String
=======
package com.example.myapplication.model

import com.google.gson.annotations.SerializedName

data class change_password_model (
    @SerializedName("old_pass")
    val old_pass:String,
    @SerializedName("new_pass")
    val new_pass:String

)