import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

import 'game_screen.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Oyun dikey tasarlandı; ekranı dik tut ve sistem çubuklarını gizle.
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  await MobileAds.instance.initialize();
  runApp(const KayipEsyaApp());
}

class KayipEsyaApp extends StatelessWidget {
  const KayipEsyaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kayıp Eşya Bürosu',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFE2543A)),
        scaffoldBackgroundColor: const Color(0xFF2A1F1A),
      ),
      home: const GameScreen(),
    );
  }
}
