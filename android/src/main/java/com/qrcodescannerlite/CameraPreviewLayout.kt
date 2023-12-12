package com.qrcodescannerlite

import android.content.Context
import android.widget.FrameLayout
import androidx.camera.view.PreviewView

class CameraPreviewLayout(context: Context) : FrameLayout(context) {
  val previewView: PreviewView

  init {
    previewView = PreviewView(context)

    addView(previewView)
  }
}
