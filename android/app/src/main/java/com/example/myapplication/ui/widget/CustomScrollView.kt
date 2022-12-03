package com.example.myapplication.ui.widget

import android.content.Context
import android.util.AttributeSet
import android.view.MotionEvent
import android.widget.ScrollView

class CustomScrollView : ScrollView {

    private var mTouchPosition = 0f
    private var mReleasePosition = 0f
    private var mScrollChangeListener: ScrollStatusChangeListener? = null
    private var y0 = 0f
    private var y1 = 0f
    private var mScrollY = 0

    companion object {
        private const val TAG = "CustomScrollView"
    }

    enum class ScrollType {
        UP, DOWN
    }

    interface ScrollStatusChangeListener {
        fun onScrollChanged(type: ScrollType)
    }

    constructor(context: Context) : super(context)

    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)

    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )

    fun setOnScrollChangeListener(listner: ScrollStatusChangeListener) {
        mScrollChangeListener = listner
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {

        if (event.action == MotionEvent.ACTION_DOWN) {
            mTouchPosition = event.y
        } else if (event.action == MotionEvent.ACTION_UP) {
            mReleasePosition = event.y

            if (mTouchPosition - mReleasePosition > 0) {
                // user scroll down
                mScrollChangeListener?.onScrollChanged(ScrollType.DOWN)
            } else {
                //user scroll up
                mScrollChangeListener?.onScrollChanged(ScrollType.UP)
            }
        }

        return super.onTouchEvent(event)
    }

}