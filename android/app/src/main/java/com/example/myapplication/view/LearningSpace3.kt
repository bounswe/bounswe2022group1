package com.example.myapplication.view

import android.content.Intent
import android.graphics.drawable.Drawable
import android.media.Image
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.webkit.WebView
import android.widget.*
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.marginLeft
import androidx.drawerlayout.widget.DrawerLayout
import com.example.myapplication.R
import com.example.myapplication.model.*
import com.example.myapplication.service.*
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.navigation.NavigationView
import org.markdownj.MarkdownProcessor


class LearningSpace3 : AppCompatActivity() {

    var name_of_content=""
    var owner_of_content=""
    var content_id=-1

    fun makeShorter(){
        val bottomSheetLayout = findViewById<FrameLayout>(R.id.bottom_sheet)
        BottomSheetBehavior.from(bottomSheetLayout).apply{
            peekHeight=100
            this.state=BottomSheetBehavior.STATE_COLLAPSED
        }
    }

    fun updateCount(){
        var Upvote = findViewById<ImageView>(R.id.Upvote)
        var UpCount = findViewById<TextView>(R.id.upCount)
        Upvote.setTag(R.drawable.up_image)

            val apiService = learningSpace3_patch_content_info_api_call()
            val data = learningSpace3_patch_content_info_send_model(
                id=content_id,
                url = "xx"
            )

            apiService.getInfo(data)  {
                if(it?.id!=null){
                    UpCount.setText(it.upVoteCount.toString())
                }
                else{
                    Log.d("Up vote update failed","")
                }
            }
    }


    fun updateUpVote(){
        val apiService = learningSpace3_patch_content_info_api_call()
        val data = learningSpace3_patch_content_info_send_model(
            id=content_id,
            url = "xx"
        )

        apiService.getInfo(data)  {
            Log.d("updateVoteCount",it?.upVoteCount.toString())
            if(it?.id!=null){
                var UpCount = findViewById<TextView>(R.id.upCount)
                UpCount.setText(it.upVoteCount.toString())
            }
            else{
                Log.d("Up vote update failed","")
            }
        }
    }

    private lateinit var toggle: ActionBarDrawerToggle
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_learning_space3)

        updateCount()
        switchToRead()
        navMenuHandler()
    }


    //should show WebView - OK.
    //should hide resource - OK.
    //should show topic - OK.
    //should show owner - OK.
    //should show edit(if owner),discussion,notes - OK.
    fun switchToRead(){
        makeShorter()
        //not editable.
        var resource=findViewById<TextView>(R.id.Resource)
        resource.setEnabled(false)

        //Show Discussion
        var discussion_text=findViewById<TextView>(R.id.discussion_text)
        discussion_text.setText("Discussion:")
        var discussion_image=findViewById<ImageView>(R.id.discussion_image)
        discussion_image.setImageResource(R.drawable.discussion)


        //Show Notes
        var notes_text=findViewById<TextView>(R.id.notes_text)
        notes_text.text="Notes:"
        var notes_image=findViewById<ImageView>(R.id.notes_image)
        notes_image.setImageResource(R.drawable.note)


        //Show Edit
        var edit_text=findViewById<TextView>(R.id.edit_text)
        edit_text.setText("Edit:")
        var edit_image=findViewById<ImageView>(R.id.edit_image)
        edit_image.setImageResource(R.drawable.pencil)

        edit_text.setVisibility(View.VISIBLE)
        edit_image.setVisibility(View.VISIBLE)

        val apiService = learningSpace3GetContent_api_call()
        apiService.getContent(currentContentID) {
            if(it?.id!=null){
                content_id=it.id
                var resource = findViewById<EditText>(R.id.Resource)
                var WebView = findViewById<WebView>(R.id.WebView);
                resource.setVisibility(View.GONE) //should hide resource
                WebView.setVisibility(View.VISIBLE) //should show WebView
                var markdownText=it.text
                var html_text= MarkdownProcessor().markdown(markdownText)
                WebView.loadData(html_text, "text/html", "utf-8");

                var nameOfOwner="Eruhlu"
                learningSpaceMEMBERS.forEach{
                        l->
                    if(l.id==it.owner){
                        nameOfOwner=l.name
                    }
                }


                var resource_topic=findViewById<TextView>(R.id.resource_topic)
                var owner_text=findViewById<TextView>(R.id.owner_text)
                name_of_content=it.name
                resource_topic.text=it.name //should show topic
                owner_text.text="Owner: "+nameOfOwner //show owner
                owner_of_content=nameOfOwner
                owner_text.setVisibility(View.VISIBLE)
                if(!nameOfOwner.equals(user_name)){
                    edit_text.setVisibility(View.GONE)
                    edit_image.setVisibility(View.GONE)
                }
            }
            else{
                switchToRead()
            }
        }

    }


    var x=0
    fun upVoteClicked(view: View){
        var Upvote = findViewById<ImageView>(R.id.Upvote)
        var UpCount = findViewById<TextView>(R.id.upCount)
        Log.d("selam",Upvote.getTag().toString()+" "+R.drawable.up_image.toString())

        if(Upvote.getTag()==R.drawable.up_image){

            var resource=findViewById<EditText>(R.id.Resource)
            val apiService = learningSpace3_up_count_api_call()
            val data = learningSpace3_up_count_send_model(
                id=content_id,
                url = "xx" ,
                upVoteCount=UpCount.text.toString().toInt()+1
            )

            apiService.updateVote(data)  {
                if(it?.id!=null){
                    updateUpVote()
                    Upvote.setImageResource(R.drawable.down_image)
                    Upvote.setTag(R.drawable.down_image)
                    Log.d("Up vote success","down image'a gec")
                }
                else{
                    Log.d("Up vote failed","")
                }
            }
        }
        else{
            var resource=findViewById<EditText>(R.id.Resource)
            val apiService = learningSpace3_up_count_api_call()
            val data = learningSpace3_up_count_send_model(
                id=content_id,
                url = "xx" ,
                upVoteCount=UpCount.text.toString().toInt()-1
            )

            apiService.updateVote(data)  {
                if(it?.id!=null){
                    updateUpVote()
                    Upvote.setImageResource(R.drawable.up_image)
                    Upvote.setTag(R.drawable.up_image)
                }
                else{
                    Log.d("Up vote failed","")
                }
            }

        }

    }

    fun discussionClicked(view:View){
        makeShorter()


        var discussion_text=findViewById<TextView>(R.id.discussion_text)

        if(discussion_text.text.equals("Discussion:")){
            //hide WebView
            var WebView=findViewById<WebView>(R.id.WebView)
            WebView.setVisibility(View.GONE)
            //show resource and not editable.
            var resource=findViewById<TextView>(R.id.Resource)
            resource.setVisibility(View.VISIBLE)
            resource.setEnabled(false)

            //hide edit
            var edit_image=findViewById<ImageView>(R.id.edit_image)
            var edit_text=findViewById<TextView>(R.id.edit_text)
            edit_text.setVisibility(View.GONE)
            edit_image.setVisibility(View.GONE)


            var notes_text=findViewById<TextView>(R.id.notes_text)
            if(notes_text.text.equals("Read:")){
                notes_text.setText("Notes:")
                var notes_image=findViewById<ImageView>(R.id.notes_image)
                notes_image.setImageResource(R.drawable.note)
            }

            discussion_text.setText("Read:")
            var discussion_image=findViewById<ImageView>(R.id.discussion_image)
            discussion_image.setImageResource(R.drawable.book)

            var resource_topic=findViewById<TextView>(R.id.resource_topic)
            resource_topic.setText(name_of_content+" Discussion")

            var owner_text=findViewById<TextView>(R.id.owner_text)
            owner_text.setText("Say Something?")
            owner_text.setVisibility(View.VISIBLE)

            owner_text.setOnClickListener{
                if(discussion_text.text.equals("Read:")){
                    postClicked()
                }
            }


            val apiService = learningSpace3GetDiscussionList_api_call()

            apiService.getDiscussionList(currentContentID){
                if(it?.data!=null){
                    var Chatbox = findViewById<TextView>(R.id.Resource)
                    var temp=""
                    for(i in 0..(it.data.size-1)){
                        temp+=it.data[i].owner.username.toString()+":\n"+it.data[i].body+"\n"+"_________________________________"+"\n"
                    }
                    Chatbox.text=temp

                }
                else{
                    // fail to call update discussion
                }
            }

        }
        else{
            switchToRead()

        }

    }

    fun postClicked() {
        val builder = AlertDialog.Builder(this)
        val inflater = layoutInflater
        val dialogLayout = inflater.inflate(R.layout.add_discussion_post, null)
        val editText = dialogLayout.findViewById<EditText>(R.id.discussionPostText)

        with(builder) {
            setTitle("Create Discussion Post")
            setPositiveButton("Send"){ dialog, which ->
                val apiService = learningSpace3PostDiscussion_api_call()

                val userData = learningSpace3PostDiscussion_send_model(
                    content=currentContentID,
                    body = editText.text.toString()
                )

                apiService.postDiscussion(userData)  {
                    if(it?.created_on!=null){
                        updateDiscussion()
                    }
                    else{
                        // post fail
                    }
                }
            }
            setNegativeButton("Cancel") {dialog, which ->

            }
            setView(dialogLayout)
            show()
        }
    }

    fun updateDiscussion(){
        val apiService = learningSpace3GetDiscussionList_api_call()

        apiService.getDiscussionList(currentContentID){
            if(it?.data!=null){
                val Chatbox = findViewById<TextView>(R.id.Resource)
                var temp=""
                for(i in 0..(it.data.size-1)){
                    temp+=it.data[i].owner.username.toString()+":\n"+it.data[i].body+"\n"+"_________________________________"+"\n"
                }
                Chatbox.text=temp

            }
            else{

            }
        }

    }

    fun editClicked(view:View){
        makeShorter()
        var resource = findViewById<EditText>(R.id.Resource)
        var WebView = findViewById<WebView>(R.id.WebView)
        resource.setVisibility(View.VISIBLE)
        WebView.setVisibility(View.GONE)

        var edit_text=findViewById<TextView>(R.id.edit_text)
        var notes_text=findViewById<TextView>(R.id.notes_text)

        if(edit_text.text.equals("Edit:")){
            edit_text.setText("Save:")

            var edit_image=findViewById<ImageView>(R.id.edit_image)
            edit_image.setImageResource(R.drawable.save_text)



            if(notes_text.text.equals("Read:")){

            }
            else{
                //load content
                val apiService = learningSpace3GetContent_api_call()
                apiService.getContent(currentContentID) {
                    if(it?.id!=null){
                        resource.setText(it.text)
                    }
                    else{
                        switchToRead()
                    }
                }
            }
            resource.setEnabled(true)
        }
        else{
            // save the changes then switchToRead()
            if(notes_text.text.equals("Read:")){
                //save the note, then switchToNotes
                val apiServiceX = learningSpace3_post_note_api_call()
                val data = learningSpace3_post_note_send_model(
                    body = resource.text.toString(),
                    content = content_id
                )
                apiServiceX.postNote(data) {
                    if(it?.id!=null){
                        Log.d("edit content"+content_id.toString(),"success")
                        switchToNotes()
                    }
                    else{
                        Log.d("edit content","unsuccess")
                    }
                }
            }
            else{ //save changes for content
                val up_cnt=findViewById<TextView>(R.id.upCount)
                val apiService99 = learningSpace3_patch_content_api_call()
                val data = learningSpace3_patch_content_send_model(
                    id=content_id,
                    text=resource.text.toString(),
                    url = "xx" ,
                    upVoteCount=up_cnt.text.toString().toInt()
                )

                apiService99.changeContent(data)  {
                    if(it?.id!=null){
                        Log.d("edit content"+content_id.toString(),"success")
                        switchToRead()
                    }
                    else{
                        Log.d("edit content","unsuccess")
                    }
                }

            }

        }

    }

    fun switchToNotes(){
        var notes_text=findViewById<TextView>(R.id.notes_text)
        //hide webview
        var WebView=findViewById<WebView>(R.id.WebView)
        WebView.setVisibility(View.GONE)

        //Show Edit
        var edit_text=findViewById<TextView>(R.id.edit_text)
        edit_text.setText("Edit:")
        var edit_image=findViewById<ImageView>(R.id.edit_image)
        edit_image.setImageResource(R.drawable.pencil)
        edit_text.setVisibility(View.VISIBLE)
        edit_image.setVisibility(View.VISIBLE)


        var discussion_text=findViewById<TextView>(R.id.discussion_text)
        if(discussion_text.text.equals("Read:")){
            discussion_text.setText("Discussion:")
            var discussion_image=findViewById<ImageView>(R.id.discussion_image)
            discussion_image.setImageResource(R.drawable.discussion)
        }

        notes_text.text="Read:"
        var notes_image=findViewById<ImageView>(R.id.notes_image)
        notes_image.setImageResource(R.drawable.book)

        var resource_topic=findViewById<TextView>(R.id.resource_topic)
        resource_topic.setText(name_of_content+" Notes")

        var owner_text=findViewById<TextView>(R.id.owner_text)
        owner_text.setVisibility(View.GONE)


        var resource = findViewById<EditText>(R.id.Resource)
        resource.setVisibility(View.VISIBLE)
        //resource.setText("My notes will be here.") // api call will be made here.

        val apiService = learningSpace3_see_all_note_api_call()
        apiService.seeAllNotes(content_id)  {
            if(it!=null){
                Log.d("note get"+content_id.toString(),"success"+it?.toString())



                val data =it.data
                val apiService3 = profile_see_api_call()
                apiService3.getProfile("Token " + user_token) {
                    id_of_current_user = it?.user!!
                    var body = ""
                    data.forEach {
                        if( id_of_current_user==it.owner.id){
                            body = it.body
                        }
                    }
                    var resource=findViewById<EditText>(R.id.Resource)
                    resource.setText(body)
                    if(resource.text.toString().equals("")) {
                        resource.setText("My notes will be here.")
                    }
                }
                /*
                val apiService2 = user_from_id_api_call()
                apiService2.userFromID(user_name) {
                    var _email = findViewById(R.id.seeEmail) as TextView
                    _email.text=it?.email
                }
*/

            }
            else{
                Log.d("note get","unsuccess")
            }

            resource.setEnabled(false)
        }

    }

    fun notesClicked(view:View){
        makeShorter()
        var notes_text=findViewById<TextView>(R.id.notes_text)
        if(notes_text.text.equals("Notes:")){
            val apiService = learningSpace3_see_all_note_api_call()
            apiService.seeAllNotes(content_id)  {
                if(it!=null){
                    Log.d("note get"+content_id.toString(),"success"+it?.toString())
                    val apiService3 = profile_see_api_call()
                    val data = it.data
                    apiService3.getProfile("Token " + user_token) {
                        id_of_current_user = it?.user!!
                        var body = ""
                        data.forEach {
                            if( id_of_current_user==it.owner.id){
                                body = it.body
                            }
                        }
                        var resource=findViewById<EditText>(R.id.Resource)
                        resource.setText(body)
                    }

                }
                else{
                    Log.d("note get","unsuccess")
                }
            }

            switchToNotes()
        }
        else{
            switchToRead()
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