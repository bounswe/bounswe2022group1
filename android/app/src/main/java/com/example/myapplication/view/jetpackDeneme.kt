package com.example.myapplication.view

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.myapplication.view.ui.theme.MyApplicationTheme

class jetpackDeneme : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApplicationTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Greeting("Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String) {


    Column(
        modifier= Modifier
            .fillMaxSize()
            .background(Color.DarkGray),
        verticalArrangement = Arrangement.Center,
    ){
        omerCustomText(text = "Wow!")
        Spacer(modifier = Modifier.padding(5.dp))
        omerCustomText(text = "Hello World!")
        Spacer(modifier = Modifier.padding(5.dp))

    }


}


@Composable
fun omerCustomText(text:String){
    Text(
        modifier= Modifier
            .background(color = Color.Cyan)
            .padding(top = 10.dp, start = 1.dp, end = 1.dp, bottom = 30.dp)
            .clickable {
                println("Clicked!.")
            }
            .width(250.dp)
            .height(250.dp)
            .fillMaxWidth() //  increase the size until there is widget or cannot increase more.
        ,
        text = text,
        textAlign= TextAlign.Center,
        color= Color.Blue,
        fontSize=25.sp,
        fontWeight = FontWeight.Bold
    )
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    MyApplicationTheme {
        Greeting("Android")
    }
}