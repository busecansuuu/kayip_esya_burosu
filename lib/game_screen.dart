import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'ads.dart';
import 'reminders.dart';

/// Oyunun kendisi assets/game/index.html içinde, Three.js ile çizilen 3D bir
/// sahne. Bu ekran onu tam ekran bir WebView içinde çalıştırır ve oyunla
/// "AdBridge" adlı bir JavaScript kanalı üzerinden konuşur:
///
///   oyun -> Flutter : {"t":"rewarded","id":3}   ödüllü reklam iste
///                     {"t":"interstitial"}       geçiş reklamı göster
///                     {"t":"haptic","k":"light"} titreşim (light | heavy)
///                     {"t":"ready"}              oyun yüklendi, kaydı iste
///                     {"t":"save","d":"..."}     ilerlemeyi kaydet (null: sil)
///                     {"t":"remind","b":"..."}   hatırlatma bildiriminin metni
///                     {"t":"notifyAsk"}          bildirim izni iste
///   Flutter -> oyun : window.onAdResult(id, true|false)
///                     window.onNativeReady(kayıt | null)
///                     window.onPause() / window.onResume()
///                     window.onBack() -> "ok" | "busy" | "exit"
class GameScreen extends StatefulWidget {
  const GameScreen({super.key});

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> with WidgetsBindingObserver {
  static const _saveKey = 'oyun_kaydi_v2';
  late final WebViewController _controller;
  final AdService _ads = AdService();
  final Reminders _reminders = Reminders();
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _ads.preload();
    _reminders.init();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF2A1F1A))
      ..addJavaScriptChannel('AdBridge', onMessageReceived: _onMessage)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (_) {
            if (mounted) setState(() => _loaded = true);
          },
        ),
      )
      ..loadFlutterAsset('assets/game/index.html');
  }

  Future<void> _onMessage(JavaScriptMessage message) async {
    final Map<String, dynamic> data;
    try {
      data = jsonDecode(message.message) as Map<String, dynamic>;
    } catch (_) {
      return;
    }
    switch (data['t']) {
      case 'rewarded':
        {
          final id = data['id'];
          final ok = await _ads.showRewarded();
          await _controller.runJavaScript('window.onAdResult($id, $ok)');
        }
        break;
      case 'interstitial':
        _ads.showInterstitial();
        break;
      case 'ready':
        {
          final prefs = await SharedPreferences.getInstance();
          final saved = prefs.getString(_saveKey);
          await _controller.runJavaScript(
            'window.onNativeReady(${saved == null ? 'null' : jsonEncode(saved)})',
          );
        }
        break;
      case 'save':
        {
          final prefs = await SharedPreferences.getInstance();
          final value = data['d'];
          if (value is String) {
            await prefs.setString(_saveKey, value);
          } else {
            await prefs.remove(_saveKey);
          }
        }
        break;
      case 'remind':
        if (data['b'] is String) _reminders.body = data['b'] as String;
        break;
      case 'notifyAsk':
        await _reminders.askPermission();
        break;
      case 'haptic':
        if (data['k'] == 'heavy') {
          await HapticFeedback.mediumImpact();
        } else {
          await HapticFeedback.selectionClick();
        }
        break;
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _reminders.cancel();
      _controller.runJavaScript('window.onResume && window.onResume()');
    } else if (state == AppLifecycleState.paused ||
        state == AppLifecycleState.inactive) {
      if (state == AppLifecycleState.paused) _reminders.schedule();
      _controller.runJavaScript('window.onPause && window.onPause()');
    }
  }

  /// Android geri tuşu: önce oyun içindeki masayı kapatır, oyun "exit"
  /// derse uygulamadan çıkar.
  Future<void> _handleBack() async {
    final result = await _controller.runJavaScriptReturningResult(
      'window.onBack ? window.onBack() : "exit"',
    );
    final answer = result.toString().replaceAll('"', '');
    if (answer == 'exit') {
      await SystemNavigator.pop();
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _ads.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop) _handleBack();
      },
      child: Scaffold(
        backgroundColor: const Color(0xFF2A1F1A),
        body: Stack(
          children: [
            Positioned.fill(child: WebViewWidget(controller: _controller)),
            if (!_loaded)
              const Center(
                child: CircularProgressIndicator(color: Color(0xFFE2543A)),
              ),
          ],
        ),
      ),
    );
  }
}
