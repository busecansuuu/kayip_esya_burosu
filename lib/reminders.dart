import 'dart:io';

import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest.dart' as tzdata;
import 'package:timezone/timezone.dart' as tz;

/// Oyuncu uygulamadan çıkınca ertesi gün için tek bir hatırlatma kurar,
/// uygulamaya dönünce iptal eder. Bildirim metnini oyun belirler
/// ({"t":"remind","b":"..."} mesajı), yoksa varsayılan metin kullanılır.
class Reminders {
  static const _id = 1;
  static const _delay = Duration(hours: 20);
  final _plugin = FlutterLocalNotificationsPlugin();
  bool _ready = false;
  bool _asked = false;
  String body = 'Kuyrukta müşteriler var, kayıp eşyalar seni bekliyor!';

  Future<void> init() async {
    try {
      tzdata.initializeTimeZones();
      await _plugin.initialize(
        settings: const InitializationSettings(
          android: AndroidInitializationSettings('@mipmap/ic_launcher'),
          iOS: DarwinInitializationSettings(
            requestAlertPermission: false,
            requestBadgePermission: false,
            requestSoundPermission: false,
          ),
        ),
      );
      _ready = true;
    } catch (_) {}
  }

  /// İzin ilk gün bittikten sonra istenir, oyunun ilk açılışında değil.
  Future<void> askPermission() async {
    if (!_ready || _asked) return;
    _asked = true;
    if (Platform.isAndroid) {
      await _plugin
          .resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>()
          ?.requestNotificationsPermission();
    } else if (Platform.isIOS) {
      await _plugin
          .resolvePlatformSpecificImplementation<
              IOSFlutterLocalNotificationsPlugin>()
          ?.requestPermissions(alert: true, sound: true);
    }
  }

  Future<void> schedule() async {
    if (!_ready) return;
    try {
      await _plugin.cancel(id: _id);
      await _plugin.zonedSchedule(
        id: _id,
        title: 'Kayıp Eşya Bürosu',
        body: body,
        scheduledDate: tz.TZDateTime.now(tz.UTC).add(_delay),
        notificationDetails: const NotificationDetails(
          android: AndroidNotificationDetails(
            'hatirlatma',
            'Günlük hatırlatma',
            channelDescription: 'Büroya dönme hatırlatması',
            importance: Importance.defaultImportance,
          ),
          iOS: DarwinNotificationDetails(),
        ),
        androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      );
    } catch (_) {}
  }

  Future<void> cancel() async {
    if (!_ready) return;
    try {
      await _plugin.cancel(id: _id);
    } catch (_) {}
  }
}
