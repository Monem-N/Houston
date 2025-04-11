package com.example.houstonguide2025

import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)
        val webSettings = webView.settings
        
        // Activer JavaScript et le stockage DOM
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        
        // Permettre l'accès aux fichiers
        webSettings.allowFileAccess = true
        webSettings.allowFileAccessFromFileURLs = true
        webSettings.allowUniversalAccessFromFileURLs = true
        
        // Activer le zoom
        webSettings.builtInZoomControls = true
        webSettings.displayZoomControls = false
        
        // Activer le cache pour une meilleure performance
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT
        
        // Gérer les liens dans l'application
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                // Garder tous les liens dans l'application
                view.loadUrl(url)
                return true
            }
        }
        
        // Charger la page d'accueil
        webView.loadUrl("file:///android_asset/index.html")
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
