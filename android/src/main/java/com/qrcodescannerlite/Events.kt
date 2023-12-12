package com.qrcodescannerlite

import com.facebook.react.bridge.*
import com.facebook.react.uimanager.events.RCTEventEmitter

class Events(private val reactContext: ReactContext, private val id: Int) {

  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, eventName, params)
  }

  fun sendQrCodeScanned(data: WritableMap) {
    sendEvent(QR_CODE_SCANNED, data)
  }

  private fun sendError(params: WritableMap) {
    sendEvent(ERROR, params)
  }

  fun sendInitializationError(message: String?) {
    val params = Arguments.createMap().apply {
      putString("type", INITIALIZATION_ERROR)
      putString("message", message)
    }
    sendError(params)
  }

  fun sendReadError(message: String?) {
    val params = Arguments.createMap().apply {
      putString("type", READ_ERROR)
      putString("message", message)
    }
    sendError(params)
  }


  companion object {
    private const val QR_CODE_SCANNED = "QR_CODE_SCANNED"
    private const val INITIALIZATION_ERROR = "INITIALIZATION_ERROR"
    private const val READ_ERROR = "READ_ERROR"
    private const val ERROR = "ERROR"
  }
}
